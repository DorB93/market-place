import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Store from "../pages/Store";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductDetail from "../pages/ProductDetail";
import { CartProvider } from "./../context/CartContext";
import { UserProvider } from "./../context/UserContext";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";

export const AppWrapper = styled.div`
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 320px;
	width: 99vw;
	box-sizing: border-box;
`;

function App() {
	return (
		<UserProvider>
			<CartProvider>
				<AppWrapper>
					<NavBar />
					<>
						<Routes>
							<Route path='/' element={<Store />} />
							<Route path='/about' element={<About />} />
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
							<Route path='/forgot-password' element={<ForgotPassword />} />
							<Route path='/products/:id' element={<ProductDetail />} />
							<Route path='/my-profile/*' element={<Profile />} />
						</Routes>
					</>
				</AppWrapper>
			</CartProvider>
		</UserProvider>
	);
}

export default App;
