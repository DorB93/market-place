import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { useUser } from "./../context/UserContext";

export const Nav = styled.nav`
	position: sticky;
	align-self: center;
	margin: 0;
	top: 0;
	display: flex;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	width: 100vw;
	padding: 5px;
	background-color: rgb(255, 255, 255);
	margin-bottom: 3px;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);
	z-index: 1;
	font-size: 20px;
	color: rgb(125, 125, 125);
`;
export const HeaderBar = styled.h1`
	margin: 0;
	font-weight: bold;
	box-sizing: border-box;
`;
export const UserBar = styled.div`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	gap: 15px;
`;
export const Link = styled.a`
	padding: 15px;
	margin-right: 2px;
	border-right: 3px rgb(128, 128, 128);
	box-sizing: border-box;
	text-decoration: none;
	color: rgb(125, 125, 125);

	& a {
		text-decoration: none;
		color: rgb(125, 125, 125);
	}

	& img {
		height: 45px;
		width: 45px;
		border-radius: 50%;
	}
	&:hover {
		color: black;
	}
`;
export const CartIcon = styled.button`
	color: white;
	position: relative;
	padding-top: 7px;
	height: 3rem;
	width: 3rem;
	font-size: 1.5rem;
	border-radius: 50%;
	background-color: rgb(71, 158, 246);
	border: 0;
	box-shadow: 3px 3px 5px 3px rgba(128, 128, 128, 0.193);
	transition: 250ms all linear;

	&:hover {
		background-color: rgba(71, 159, 246, 0.699);
		box-shadow: 1px 3px 3px 3px rgba(0, 0, 0, 0.267);
		color: rgba(105, 105, 105, 0.611);
	}
`;
export const Baj = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 1.3rem;
	width: 1.3rem;
	color: white;
	font-size: small;
	background-color: brown;
	border-radius: 50%;
	right: 0;
	bottom: -3px;
`;

function NavBar() {
	const { user, setLogout } = useUser();
	const { openCart, cartQuantity, removeCart } = useCart();
	const navigate = useNavigate();
	return (
		<>
			<Nav>
				<Link>
					<NavLink to='/'>Home</NavLink>
				</Link>
				<HeaderBar>
					Welcome{" "}
					{user.isLoggedIn ? `Back ${user.username.split(" ")[0]}` : "Guest"}
				</HeaderBar>
				<UserBar>
					{user.isLoggedIn ? (
						<>
							<Link>
								<NavLink
									as='button'
									onClick={() => {
										removeCart();
										setLogout();
										navigate("/");
									}}>
									Log Out
								</NavLink>
							</Link>
							<Link>
								<NavLink to='/my-profile'>
									<img src={`/img/users/${user.userPhoto}`} alt='avatar' />
								</NavLink>
							</Link>
						</>
					) : (
						<>
							<Link>
								<NavLink to='/signup'>Sign Up</NavLink>
							</Link>
							<Link>
								<NavLink to='/login'>Login</NavLink>
							</Link>
						</>
					)}
					{cartQuantity > 0 && (
						<CartIcon onClick={openCart}>
							<HiShoppingCart />
							<Baj>{cartQuantity}</Baj>
						</CartIcon>
					)}
				</UserBar>
			</Nav>
		</>
	);
}

export default NavBar;
