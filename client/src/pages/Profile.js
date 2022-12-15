// import styled from "styled-components";
import React from "react";
// import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProfileNav from "../components/ProfileNav";
import { Route, Routes } from "react-router-dom";
import MyInfo from "../components/MyInfo";

function Profile() {
	const { user } = useUser();
	return (
		<>
			{user.isLoggedIn ? (
				<>
					<ProfileNav />
					<Routes>
						<Route index element={<MyInfo />} />
						<Route path='my-orders' element={<MyInfo />} />
						<Route path='password-update' element={<MyInfo />} />
					</Routes>
				</>
			) : (
				<h2>You are not logged in!!</h2>
			)}
		</>
	);
}

export default Profile;
