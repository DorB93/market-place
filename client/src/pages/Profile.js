import styled from "styled-components";
import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProfileNav from "../components/Profile/ProfileNav";
import { useNavigate, Route, Routes } from "react-router-dom";
import MyInfo from "../components/Profile/MyInfo";
import UpdateMyPassword from "../components/Profile/UpdateMyPassword";
import UserOrders from "../components/Profile/UserOrders";
import SellerDashboard from "../components/Seller/SellerDashboard";
import AddProduct from "../components/Seller/AddProduct";
import MyAddress from "../components/Profile/MyAddress";
import MyProducts from "../components/Seller/MyProducts";
import UploadProductPhoto from "../components/Seller/UploadProductPhoto";
import SellerProductDetail from "../components/Seller/SellerProductDetail";

const ProfileWrapper = styled.section`
	display: flex;
	justify-content: start;
	width: 100%;
	position: relative;
`;

function Profile() {
	const navigate = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		if (!user.isLoggedIn) {
			navigate("/login");
		}
	}, [user.isLoggedIn, navigate]);
	return (
		<>
			{user.isLoggedIn ? (
				<ProfileWrapper>
					<ProfileNav user={user} />
					<Routes>
						<Route index element={<MyInfo user={user} />} />
						<Route path='my-orders' element={<UserOrders user={user} />} />
						<Route
							path='password-update'
							element={<UpdateMyPassword user={user} />}
						/>
						<Route path='address-update' element={<MyAddress user={user} />} />
						<Route
							path='my-dashboard'
							element={<SellerDashboard user={user} />}
						/>
						<Route path='new-product' element={<AddProduct user={user} />} />
						<Route path='my-products' element={<MyProducts user={user} />} />
						<Route
							path='my-products/:productId'
							element={<SellerProductDetail user={user} />}
						/>
						<Route
							path='upload-product-photo/:productId'
							element={<UploadProductPhoto user={user} />}
						/>
					</Routes>
				</ProfileWrapper>
			) : (
				<h2>You are not logged in!!</h2>
			)}
		</>
	);
}

export default Profile;
