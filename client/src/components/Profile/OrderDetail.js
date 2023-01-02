import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import myAxios from "../../api";
import { SubmitBtn } from "../../pages/Login";
import { Form, PageContainer } from "../../pages/Signup";
import ErrorAlert from "../ErrorAlert";
import SuccessAlert from "../SuccessAlert";
import LoadingSpinner from "../LoadingSpinner";
import { ProductContainer, ProductMinDetails } from "../Products/Product";

const OrderContainer = styled(Form)`
	width: 700px;
	display: flex;
	flex-direction: column;
	& h3 {
		margin: 0;
	}
`;
const DetailContainer = styled.div`
	display: flex;
	justify-content: space-around;
	background-color: white;
	border-radius: 12px;
	width: 600px;
`;

const ProductOdContainer = styled(ProductContainer)`
	width: 600px;
`;
const ReceivedProduct = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const TimePriceOrder = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	padding: 5px;
	& h3 {
		align-self: center;
		margin: 0;
	}
`;
const BtnGotItems = styled(SubmitBtn)`
	height: fit-content;
`;
const AddressContainer = styled(TimePriceOrder)`
	width: 200px;
`;
const OrdersProducts = styled.section`
	height: 70%;
	overflow: auto;
	flex-shrink: 0;
	max-height: 60vh;
	overflow: auto;
	box-shadow: 5px 3px 22px 11px rgba(0, 0, 0, 0.34) inset;
	-webkit-box-shadow: 5px 3px 22px 11px rgba(0, 0, 0, 0.34) inset;
	-moz-box-shadow: 5px 3px 22px 11px rgba(0, 0, 0, 0.34) inset;
	border-radius: 15px;
	&::-webkit-scrollbar {
		width: 7px;
	}

	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	&::-webkit-scrollbar-thumb {
		overflow: hidden;
		background-color: gray;
		outline: 0.5px solid rgba(255, 255, 255, 0.444);
		border-radius: 12px;
	}
`;

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
	}, []);

	function handleChange(e, i) {
		const val = e.target.checked;
		order.products[i].received = val;
		setOrder({ ...order });
		console.log({ order });
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
			setErrorMessage(err.data.message);
			setLoading(false);
		}
	}
	const productsData = order.products?.map((p, i) => (
		<>
			<ProductOdContainer key={i}>
				<img src={`/img/products/${p.product.image}`} alt={p.product.name} />
				<ProductMinDetails>
					<span>{p.product.name}</span>
					<span>Price: ${p.product.price.toFixed(2)}</span>
					<span>Quantity : {p.quantity}</span>
					<span>Sellers Email: </span>
					<span>{p.product.seller.email}</span>
					<span>
						Received:
						{p.received === true ? (
							<IoCheckmarkCircle style={{ color: "green" }} />
						) : (
							<IoCloseCircleOutline style={{ color: "red" }} />
						)}
					</span>
				</ProductMinDetails>
				<ReceivedProduct>
					<label>Received?</label>
					<input
						name={`${p.product.name}-received`}
						id={`${p.product.name}-received`}
						onChange={(e) => {
							handleChange(e, i);
						}}
						type='checkbox'
					/>
				</ReceivedProduct>
			</ProductOdContainer>
		</>
	));

	return (
		<PageContainer>
			{loading ? (
				<LoadingSpinner />
			) : (
				<OrderContainer onSubmit={handleSubmit}>
					{errorMessage && <ErrorAlert message={errorMessage} />}
					{successMessage && <SuccessAlert message={successMessage} />}
					{order?.products?.length > 1 && <h3>The Products</h3>}
					<OrdersProducts>
						{productsData ? productsData : <LoadingSpinner />}
					</OrdersProducts>
					<DetailContainer>
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
								<strong>ZipCode:</strong> {order.shippingAddress.zipCode}
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
