import React from "react";
import styled from "styled-components";

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

	& h3 {
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
`;

function Cart() {
	return (
		<CartContainer>
			<BtnCloseCart>X</BtnCloseCart>
			<h3>Cart</h3>
			<CartContents></CartContents>
			<CartInfo>
				<span>Total quantity: 10</span>
				<span>Total price:1000$</span>
			</CartInfo>
			<CartBtnContainer>
				<CartBtn>Checkout</CartBtn>
				<CartBtn>Reset</CartBtn>
			</CartBtnContainer>
		</CartContainer>
	);
}

export default Cart;
