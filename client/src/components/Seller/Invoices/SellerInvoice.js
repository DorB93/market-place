import React from "react";
import styled from "styled-components";
import { SubmitBtn } from "../../../pages/Login";
import { AddressContainer } from "../../Profile/OrderDetail";
import ProductInvoice from "./ProductInvoice";

const InvoiceContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: darkgrey;
	border-radius: 15px;
	align-items: center;
	padding: 15px;
	gap: 10px;
	& h3 {
		margin: 0;
	}
`;
const InvoiceProductsContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	height: 400px;
	box-sizing: border-box;

	overflow: auto;
	&::-webkit-scrollbar {
		width: 7px;
	}

	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
		outline: 0.5px solid rgba(255, 255, 255, 0.444);
		border-radius: 12px;
	}
`;
const DeliveryDetails = styled(AddressContainer)`
	background-color: white;
	border-radius: 12px;
`;
function SellerInvoice({ alertBefore, invoice }) {
	const { products, user, shippingAddress, total } = invoice;
	const productsContent = products.map(({ product, quantity, price, sent }) => (
		<ProductInvoice
			key={product._id}
			product={product}
			quantity={quantity}
			price={price}
			sent={sent}
		/>
	));
	return (
		<InvoiceContainer>
			<h3>Products</h3>
			<InvoiceProductsContent>{productsContent}</InvoiceProductsContent>
			<DeliveryDetails>
				<h3>Delivery details</h3>
				<span>
					<strong>Customer Name</strong>: {user.name}
				</span>
				<h3>Sent to:</h3>

				<span>
					<strong>State:</strong> {shippingAddress.state}
				</span>

				<span>
					<strong>City:</strong> {shippingAddress.city}
				</span>

				<span>
					<strong>Street:</strong> {shippingAddress.street},
					{shippingAddress.streetNum}
				</span>

				<span>
					<strong>ZipCode:</strong> {shippingAddress.zipCode}
				</span>
			</DeliveryDetails>
			<h4>Income amount: ${total.toFixed(2)}</h4>
			<SubmitBtn
				type='submit'
				onClick={() => {
					alertBefore(invoice._id);
				}}>
				Send to customer
			</SubmitBtn>
		</InvoiceContainer>
	);
}

export default SellerInvoice;
