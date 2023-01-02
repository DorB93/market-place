import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import myAxios from "../api";
import { CartContents, CartInfo } from "../components/Cart/Cart";
import CartItem from "../components/Cart/CartItem";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { SubmitBtn } from "./Login";
import { Form, InputContainer } from "./Signup";

const PageWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
`;
const SectionContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 20px;
	max-height: 82vh;
`;
const ItemsContainer = styled.div`
	height: 88%;
	transition: all 500ms linear;
	display: flex;
	flex-direction: column;

	justify-content: space-evenly;
	background-color: #dfdfdf8f;
	width: 455px;
	border-radius: 10px;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);

	& h2,
	h3 {
		text-align: center;
	}
`;

function Checkout() {
	const { user } = useUser();
	const {
		updateCatalog,
		cart,
		removeCart,
		catalog,
		cartFullPrice,
		cartQuantity,
	} = useCart();
	const [shippingAddress, setShippingAddress] = useState({
		state: "",
		city: "",
		street: "",
		streetNum: "",
		zipCode: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [disable, setDisable] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.shippingAddress) {
			setShippingAddress(user.shippingAddress);
		}
	}, [user]);

	const items = Object.entries(cart).map(([id, q]) => {
		const item = catalog.find((p) => p.id === id);
		if (!item) return "";
		return <CartItem key={item.id} item={item} />;
	});

	const handleOrder = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const products = Object.entries(cart).map(([id, q]) => {
				const item = catalog.find((p) => p.id === id);
				return {
					product: id,
					quantity: q,
					price: item.getPrice(),
					seller: item.seller,
				};
			});

			const order = await myAxios
				.post("/orders", {
					products,
					shippingAddress,
					totalCost: cartFullPrice,
				})
				.then((res) => res.data);
			if (order.status === "success") {
				removeCart();
				updateCatalog();
				navigate("/");
			}
		} catch (err) {
			console.log({ err });
		}
		setIsLoading(false);
	};
	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setShippingAddress({ ...shippingAddress, [name]: value });
	};
	return (
		<PageWrapper>
			<SectionContainer>
				<h2>Cart</h2>
				<ItemsContainer>
					<CartContents>{items}</CartContents>
					<CartInfo>
						<span>Total quantity: {cartQuantity}</span>
						<span>Total price: {cartFullPrice.toFixed(2)}$</span>
					</CartInfo>
				</ItemsContainer>
			</SectionContainer>
			<SectionContainer>
				<h2>Details</h2>
				<Form>
					<h3>Shipping Address</h3>
					<InputContainer>
						<label htmlFor='state' name='state'>
							State:
						</label>
						<input
							disabled={disable}
							placeholder='Israel'
							type='text'
							required
							onChange={handleAddressChange}
							value={shippingAddress.state}
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='city' name='city'>
							City:
						</label>
						<input
							disabled={disable}
							placeholder='Tel-Aviv'
							type='city'
							required
							onChange={handleAddressChange}
							value={shippingAddress.city}
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='street' name='street'>
							Street:
						</label>
						<input
							disabled={disable}
							placeholder='Hertsel'
							type='street'
							required
							onChange={handleAddressChange}
							value={shippingAddress.street}
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='streetNum' name='streetNum'>
							StreetNum:
						</label>
						<input
							disabled={disable}
							placeholder='32'
							type='number'
							required
							onChange={handleAddressChange}
							value={shippingAddress.streetNum}
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='zipCode' name='zipCode'>
							Zip Code:
						</label>
						<input
							disabled={disable}
							placeholder='12345678'
							type='test'
							required
							onChange={handleAddressChange}
							value={shippingAddress.zipCode}
						/>
					</InputContainer>
					<label htmlFor='change-address' name='state'>
						Different shipping Address?
						<input
							id='change-address'
							type='checkbox'
							onChange={(e) => {
								setDisable(!e.target.value);
							}}
							value={disable}
						/>
					</label>
				</Form>
				<Form onSubmit={handleOrder}>
					<h3>Payment</h3>
					<InputContainer>
						<label htmlFor='state' name='state'>
							Card number:
						</label>
						<input
							disabled={true}
							placeholder='XXXX-XXXX-XXXX-XXXX'
							type='text'
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='state' name='state'>
							Exp-Date:
						</label>
						<input disabled={true} placeholder='MM-YY' type='text' />
					</InputContainer>
					<InputContainer>
						<label htmlFor='state' name='state'>
							CVV:
						</label>
						<input disabled={true} placeholder='****' type='text' />
					</InputContainer>
					<SubmitBtn type='submit' disabled={isLoading}>
						Complete Checkout
					</SubmitBtn>
				</Form>
			</SectionContainer>
		</PageWrapper>
	);
}

export default Checkout;
