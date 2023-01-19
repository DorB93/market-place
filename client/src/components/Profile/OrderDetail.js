import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircleOutline } from "react-icons/io5";

import { useParams } from "react-router-dom";
import myAxios from "../../api";
import ErrorAlert from "../ErrorAlert";
import SuccessAlert from "../SuccessAlert";
import LoadingSpinner from "../LoadingSpinner";
import {
	PageContainer,
	ProductMinDetails,
	AddressContainer,
	BtnGotItems,
	DetailContainer,
	OrderContainer,
	OrdersProducts,
	ProductOdContainer,
	TimePriceOrder,
} from "../StyleComponents";
import { Box, Checkbox, Divider } from "@mui/material";

async function getOrderData(id) {
	try {
		const res = await myAxios.get(`orders/${id}`);
		return res.data.data._doc;
	} catch (err) {
		throw new Error(err.message);
	}
}

function OrderDetail() {
	const { orderId } = useParams();
	const [order, setOrder] = useState({});
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		getOrderData(orderId).then((res) => {
			setOrder(res);
			setLoading(false);
		});
	}, [orderId]);

	function handleChange(e, i) {
		const val = e.target.checked;
		order.products[i].received = val;
		setOrder({ ...order });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);
		setLoading(true);
		try {
			await myAxios
				.patch(`orders/${orderId}`, order)
				.then((res) => res.data.data._doc)
				.then((order) => {
					setOrder(order);
					setSuccessMessage("Order updated successfully! :)");
					setLoading(false);
				});
		} catch (err) {
			setErrorMessage(err.response.data.message);
			setLoading(false);
		}
	}
	const productsData = order.products?.map((p, i) => (
		<>
			<ProductOdContainer
				key={p.product.name}
				sx={{ flexDirection: { xs: "column", md: "row" } }}>
				<Box>
					<h4>{p.product.name}</h4>
					<img src={`/img/products/${p.product.image}`} alt={p.product.name} />
				</Box>
				<ProductMinDetails sx={{ fontSize: { xs: "small", md: "larger" } }}>
					<span>
						<strong>Price:</strong> ${p.product.price.toFixed(2)}
					</span>
					<span>
						<strong>Quantity:</strong> {p.quantity}
					</span>
					<span>
						<strong>Sellers Email:</strong> {p.product.seller.email}
					</span>
					<span>
						Received:
						{p.received === true ? (
							<IoCheckmarkCircle style={{ color: "green" }} />
						) : (
							<IoCloseCircleOutline style={{ color: "red" }} />
						)}
						<Checkbox
							onChange={(e) => {
								handleChange(e, i);
							}}
						/>
					</span>
				</ProductMinDetails>
			</ProductOdContainer>
			<Divider />
		</>
	));

	return (
		<PageContainer>
			{loading ? (
				<LoadingSpinner />
			) : (
				<OrderContainer
					width={{ xs: "100%", md: "650px" }}
					component='form'
					onSubmit={handleSubmit}>
					<h3>Order summary</h3>
					{errorMessage && <ErrorAlert message={errorMessage} />}
					{successMessage && <SuccessAlert message={successMessage} />}
					<OrdersProducts>
						{productsData ? productsData : <LoadingSpinner />}
					</OrdersProducts>
					<DetailContainer flexDirection={{ xs: "column", md: "row" }}>
						<TimePriceOrder>
							<h3>Order details:</h3>

							<span>
								<strong>Ordered At:</strong> {order.createAt.split("T")[0]} ,
								{order.createAt.split("T")[1].slice(0, 5)}
							</span>

							<span>
								<strong>Order Total Price:</strong> $
								{order.totalCost.toFixed(2)}
							</span>
						</TimePriceOrder>
						<AddressContainer>
							<h3>Sent to:</h3>

							<span>
								<strong>State:</strong> {order.shippingAddress.state}
							</span>

							<span>
								<strong>City:</strong> {order.shippingAddress.city}
							</span>

							<span>
								<strong>Street:</strong> {order.shippingAddress.street},
								{order.shippingAddress.streetNum}
							</span>

							<span>
								<strong>Post Code:</strong> {order.shippingAddress.postCode}
							</span>
						</AddressContainer>
					</DetailContainer>
					<BtnGotItems type='submit'>Confirm received items</BtnGotItems>
				</OrderContainer>
			)}
		</PageContainer>
	);
}

export default OrderDetail;
