import React from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import {
	BtnCloseCart,
	CartBtn,
	CartBtnContainer,
	CartContainer,
	CartContents,
	CartInfo,
} from "../StyleComponents";
import CartItem from "./CartItem";

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
		<CartContainer width={{ xs: "100%", sm: "380px" }}>
			<BtnCloseCart variant='outlined' color='error' onClick={closeCart}>
				X
			</BtnCloseCart>
			<h2>Cart</h2>
			<CartContents>{items}</CartContents>
			<CartInfo>
				<span>Total quantity: {cartQuantity}</span>
				<span>Total price: {cartFullPrice.toFixed(2)}$</span>
			</CartInfo>
			<CartBtnContainer>
				<CartBtn variant='contained' color='primary' onClick={checkoutHandle}>
					Checkout
				</CartBtn>
				<CartBtn
					variant='contained'
					onClick={() => {
						removeCart();
						closeCart();
					}}
					color='secondary'>
					Reset
				</CartBtn>
			</CartBtnContainer>
		</CartContainer>
	);
}

export default Cart;
