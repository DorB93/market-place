import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import CartItem from "./CartItem";

// Styled Components
export const CartContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;

	color: white;
	transition: all 500ms linear;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: rgba(179, 179, 179, 0.987);
	z-index: 3;
	width: 380px;
	border-radius: 10px;
	box-shadow: 3px 3px 5px 2px rgba(110, 110, 110, 0.868);
	transition: all 500ms linear;
	height: 85vh;

	& h2,
	h3 {
		text-align: center;
	}
`;
export const BtnCloseCart = styled.button`
	position: absolute;
	right: 5px;
	top: 5px;
	border: 0;
	border-radius: 50%;
	height: 1.5rem;
	font-weight: 900;
	color: white;
	background: none;
	transition: 200ms all linear;

	&:hover {
		background-color: white;
		box-shadow: 1px 1px 5px 2px rgba(135, 135, 135, 0.854);
		color: gray;
	}
`;
export const CartContents = styled.div`
	height: 70%;
	overflow: auto;
	margin-left: 12px;

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
export const CartInfo = styled.div`
	font-size: large;
	display: flex;
	justify-content: space-around;
	margin: 20px;
`;
export const CartBtnContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin: 10px;
`;
export const CartBtn = styled.button`
	height: 3rem;
	width: 5rem;
	border-radius: 5px;
	border: 0;

	&:hover {
		box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.586);
	}
	&.primary {
		background-color: rgb(71, 158, 246);
	}

	&.secondary {
		background-color: red;
	}
`;

// Handlers

function Cart() {
	const { user } = useUser();
	const { cart, cartFullPrice, cartQuantity, closeCart, removeCart, catalog } =
		useCart();
	const navigate = useNavigate();

	const items = Object.entries(cart).map(([id, q]) => {
		const item = catalog.find((p) => p.id === id);
		if (!item) return "";
		return <CartItem key={item.id} item={item} />;
	});

	function checkoutHandle() {
		closeCart();
		if (!user.isLoggedIn) {
			navigate("/signup");
		} else {
			navigate("/checkout");
		}
	}
	return (
		<CartContainer>
			<BtnCloseCart onClick={closeCart}>X</BtnCloseCart>
			<h2>Cart</h2>
			<CartContents>{items}</CartContents>
			<CartInfo>
				<span>Total quantity: {cartQuantity}</span>
				<span>Total price: {cartFullPrice.toFixed(2)}$</span>
			</CartInfo>
			<CartBtnContainer>
				<CartBtn className='primary' onClick={checkoutHandle}>
					Checkout
				</CartBtn>
				<CartBtn
					onClick={() => {
						removeCart();
						closeCart();
					}}
					className='secondary'>
					Reset
				</CartBtn>
			</CartBtnContainer>
		</CartContainer>
	);
}

export default Cart;
