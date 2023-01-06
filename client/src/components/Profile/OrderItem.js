import React from "react";
import styled from "styled-components";
import { IoCheckmarkCircle, IoCloseCircleOutline } from "react-icons/io5";
import { ProductContainer } from "../StyleComponents";
import { useNavigate } from "react-router-dom";
const Navigator = styled.span`
	cursor: pointer;
	transition: 250ms all linear;

	&:hover {
		color: rgb(71, 158, 246);
		text-shadow: 3px 5px 7px rgba(8, 61, 64, 0.8);
	}
`;
const OrderContainer = styled(ProductContainer)`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr, 7fr, 2fr;
	height: 500px;
	width: 400px;
	justify-items: center;
	align-content: space-between;
	background-color: rgba(231, 231, 231, 0.777);
	& footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
	}
`;
export const Footer = styled.footer`
	justify-items: end;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	width: 100%;
`;

const ProductsOrder = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	/* flex-direction: column;
	align-items: center; */
	overflow: auto;
	justify-items: center;
	align-items: start;
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

const ProductOrderContainer = styled(ProductContainer)`
	width: 250px;
	height: 150px;
	& div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		& h4 {
			margin: 0;
		}
		& span {
			display: flex;
			align-items: center;
			gap: 5px;
			& svg {
				align-self: flex-end;
			}
		}
	}
`;

function OrderItem({ order }) {
	const navigate = useNavigate();

	const orderAt = `${order.createAt.split("T")[0]}, ${order.createAt
		.split("T")[1]
		.slice(0, 5)} `;
	const products = order.products.map((p) => (
		<ProductOrderContainer key={p.product.id}>
			<img src={`/img/products/${p.product.image}`} alt={p.product.name} />
			<div>
				<h4>{p.product.name}</h4>
				<span>Price: ${p.product.price.toFixed(2)}</span>
				<span>Quantity: {p.quantity}</span>
				<Footer>
					<span>
						Received:
						{p.received ? (
							<IoCheckmarkCircle style={{ color: "green" }} />
						) : (
							<IoCloseCircleOutline style={{ color: "red" }} />
						)}
					</span>
				</Footer>
			</div>
		</ProductOrderContainer>
	));
	return (
		<OrderContainer>
			<Navigator
				onClick={() => {
					navigate(`${order._id}`);
				}}>
				For more information...
			</Navigator>
			<ProductsOrder>{products}</ProductsOrder>
			<footer>
				<span>Total Cost: ${order.totalCost.toFixed(2)}</span>
				<span>Ordered at: {orderAt}</span>
			</footer>
		</OrderContainer>
	);
}

export default OrderItem;
