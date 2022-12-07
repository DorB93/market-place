import React from "react";
import {
	BtnCloseCart,
	CartContainer,
	CartBtn,
	CartBtnContainer,
	CartContents,
	CartInfo,
} from "./styleComponents";

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
