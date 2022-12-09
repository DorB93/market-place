import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

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
	/* margin-bottom: 3px; */
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
	&:hover {
		color: black;
	}
`;

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
			</Nav>
		</>
	);
}

export default NavBar;
