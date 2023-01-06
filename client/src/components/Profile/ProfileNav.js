import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";
import { NavContainer, ProfileLink } from "../StyleComponents";

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
					<ProfileLink to='/my-profile/manage-orders'>
						Manage Orders
					</ProfileLink>
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
