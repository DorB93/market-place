import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";

const NavContainer = styled.nav`
	width: 190px;
	background-color: #dfdfdf8f;
	display: flex;
	flex-direction: column;
	height: 94vh;
	padding-left: 15px;
	gap: 9px;
	position: sticky;
	top: 60px;
	left: 0;
	& h3 {
		margin: 0;
	}
`;
const ProfileLink = styled(NavLink)`
	width: 92%;
	transition: linear all 280ms;
	text-decoration: none;
	color: black;
	background-color: transparent;
	border: 0;
	min-width: 40px;
	padding-left: 15px;
	font-size: large;
	cursor: pointer;
	&:hover {
		/* background-color: rgba(186, 186, 186, 0.835); */
		transform: scale(1.1) translateX(5px);
	}
	&.active {
		/* background-color: rgba(186, 186, 186, 0.835); */
		font-weight: bold;
		text-shadow: 6px 6px 5px rgba(77, 77, 77, 0.64);
		transform: scale(1.1) translateX(5px);
	}
`;

const ProfileNav = ({ user }) => {
	const isSeller = user.role === "seller";
	const isAdmin = user.role === "admin";

	return (
		<NavContainer>
			<h3>User</h3>
			<ProfileLink to='/my-profile/ '>
				{user.username.split(" ")[0]}
			</ProfileLink>
			<ProfileLink to='/my-profile/password-update'>
				Change Password
			</ProfileLink>
			<ProfileLink to='/my-profile/address-update'>MyAddress</ProfileLink>
			<ProfileLink to='/my-profile/my-orders'>My Orders</ProfileLink>
			{isSeller && (
				<>
					<h3>Seller</h3>
					<ProfileLink to='/my-profile/my-dashboard'>My Dashboard</ProfileLink>
					<ProfileLink to='/my-profile/new-product'>
						Add New Product
					</ProfileLink>
					<ProfileLink to='/my-profile/my-products'>My Products</ProfileLink>
				</>
			)}
			{isAdmin && (
				<>
					<h3>Admin</h3>
					<ProfileLink to='/my-profile/my-dashboard'>My Dashboard</ProfileLink>
					<ProfileLink to='/my-profile/new-product'>New Product</ProfileLink>
				</>
			)}
		</NavContainer>
	);
};

export default ProfileNav;
