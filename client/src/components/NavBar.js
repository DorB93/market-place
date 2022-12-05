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
	Link,
	UserBar,
} from "./styleComponents";
import { NavLink } from "react-router-dom";

function NavBar() {
	return (
		<>
			<Nav>
				<Link>
					<NavLink to='/'>Home</NavLink>
				</Link>
				<HeaderBar>Welcome Guest</HeaderBar>
				<UserBar>
					<Link>
						<NavLink to='/signup'>Sign Up</NavLink>
					</Link>
					<Link>
						<NavLink to='/login'>Login</NavLink>
					</Link>
					<Link>Cart</Link>
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
