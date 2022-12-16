// import styled from "styled-components";
import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProfileNav from "../components/ProfileNav";
import { useNavigate, Route, Routes } from "react-router-dom";
import MyInfo from "../components/MyInfo";
import UpdateMyPassword from "../components/UpdateMyPassword";
import UserOrders from "../components/UserOrders";

function Profile() {
	const navigate = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		if (!user.isLoggedIn) {
			navigate("/login");
		}
	}, [user]);
	return (
		<>
			{user.isLoggedIn ? (
				<>
					<ProfileNav />
					<Routes>
						<Route index element={<MyInfo />} />
						<Route path='my-orders' element={<UserOrders />} />
						<Route path='password-update' element={<UpdateMyPassword />} />
					</Routes>
				</>
			) : (
				<h2>You are not logged in!!</h2>
			)}
		</>
	);
}

export default Profile;
