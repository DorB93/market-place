import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

const NavContainer = styled.nav`
	width: 100%;
	background-color: #dfdfdf8f;
	display: flex;
`;

const ProfileLink = styled.div`
	& a {
		text-decoration: none;
		color: black;
		background-color: transparent;
		border: 0;
		border-right: 1px solid rgb(186, 186, 186);
		width: fit-content;
		min-width: 40px;
		margin: 10px;
		padding-left: 15px;
		padding-right: 15px;
		box-sizing: border-box;
		font-size: large;
		transition: linear all 250ms;
		cursor: pointer;
	}
	& a:hover {
		background-color: rgba(186, 186, 186, 0.835);
	}
`;

const ProfileNav = () => {
	const { user } = useUser();
	const isSeller = user.role === "seller";
	const isAdmin = user.role === "admin";

	return (
		<NavContainer>
			<ProfileLink>
				<NavLink to='/my-profile'>{user.username.split(" ")[0]}</NavLink>
			</ProfileLink>
			<ProfileLink>
				<NavLink to='/my-profile/password-update'>Change Password</NavLink>
			</ProfileLink>
			<ProfileLink>
				<NavLink to='/my-profile/my-orders'>My Orders</NavLink>
			</ProfileLink>
			{isSeller && (
				<>
					<ProfileLink>
						<NavLink to='/my-profile/my-dashboard'>My Dashboard</NavLink>
					</ProfileLink>
					<ProfileLink>
						<NavLink to='/my-profile/new-product'>New Product</NavLink>
					</ProfileLink>
				</>
			)}
			{isAdmin && (
				<>
					<ProfileLink>
						<NavLink to='/my-profile/my-dashboard'>My Dashboard</NavLink>
					</ProfileLink>
					<ProfileLink>
						<NavLink to='/my-profile/new-product'>New Product</NavLink>
					</ProfileLink>
				</>
			)}
		</NavContainer>
	);
};

export default ProfileNav;
