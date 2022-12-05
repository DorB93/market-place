import React from "react";
import {
	BtnCloseCart,
	CartContainer,
	CartBtn,
	CartBtnContainer,
	CartContents,
	CartInfo,
	HeaderBar,
	Nav,
	NavLink,
	UserBar,
} from "./styleComponents";

function NavBar() {
	return (
		<>
			<Nav>
				<NavLink>Home</NavLink>
				<HeaderBar>Welcome Guest</HeaderBar>
				<UserBar>
					<NavLink>Sign In</NavLink>
					<NavLink>Login</NavLink>
					<NavLink>Cart</NavLink>
				</UserBar>
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
			</Nav>
		</>
	);
}

export default NavBar;
