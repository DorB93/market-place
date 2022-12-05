import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import { AppWrapper } from "./styleComponents";
import Store from "../pages/Store";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductDetail from "../pages/ProductDetail";

function App() {
	return (
		<AppWrapper>
			<NavBar />
			<>
				<Routes>
					<Route path='/' element={<Store />}></Route>
					<Route path='/about' element={<About />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/signup' element={<Signup />}></Route>
					<Route path='/products/:id' element={<ProductDetail />}></Route>
				</Routes>
			</>
		</AppWrapper>
	);
}

export default App;
