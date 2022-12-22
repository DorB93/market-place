import React from "react";
import styled from "styled-components";
import { IoTrashOutline, IoRemove, IoAdd } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const CartBtn = styled.button`
	display: flex;
	align-items: center;
	border-radius: 50%;
	height: 2rem;
	font-size: 1.5rem;
	transition: all 250ms;
	border: 0;
	width: 2rem;
`;
export const ItemCard = styled.div`
	height: 150px;
	display: grid;
	grid-template-columns: 1fr 3fr 0.5fr;
	color: #000;
	width: 90%;
	border-radius: 15px;
	overflow: hidden;
	padding: 5px;
	margin: 7px;
	background-color: white;
	transition: 200ms all linear;
`;
const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;

	& img {
		max-width: 100%;
		max-height: 70%;
	}
`;
const ItemDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	margin: 5px;

	& h3 {
		max-height: 50px;
		overflow: hidden;
	}
`;
export const ItemQuantity = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 120%;

	& button {
		background-color: rgba(71, 159, 246, 0);
		color: rgb(71, 158, 246);
	}
	& button:hover {
		background-color: rgba(71, 159, 246, 0.403);
		color: black;
		box-shadow: 1px 3px 5px 2px rgba(0, 0, 0, 0.659);
	}
`;
const RemoveItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 10px;

	& button {
		color: rgb(255, 0, 0);
		background: transparent;
	}
	& button:hover {
		color: white;
		background-color: brown;
		box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.659);
	}
`;
function CartItem({ item }) {
	const {
		increaseItemQuantity,
		getItemQuantity,
		decreaseItemQuantity,
		removeItem,
	} = useCart();
	return (
		<ItemCard>
			<ImageContainer>
				<img src={item.image} alt={item.title} />
			</ImageContainer>
			<ItemDetails>
				<h3>{item.title}</h3>
				<ItemQuantity>
					<CartBtn
						onClick={() => {
							increaseItemQuantity(item.id);
						}}
						className='btn btn-qControl'>
						<IoAdd />
					</CartBtn>
					<span>{getItemQuantity(item.id)}</span>
					<CartBtn
						onClick={() => {
							decreaseItemQuantity(item.id);
						}}
						className='btn btn-qControl'>
						<IoRemove />
					</CartBtn>
					<span>Price: ${Number(item.getPrice()).toFixed(2)}</span>
				</ItemQuantity>
			</ItemDetails>
			<RemoveItem>
				<CartBtn
					onClick={() => {
						removeItem(item.id);
					}}>
					<IoTrashOutline />
				</CartBtn>
			</RemoveItem>
		</ItemCard>
	);
}

export default CartItem;
