import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import myAxios from "../api";
import { CartContents, CartInfo } from "../components/Cart/Cart";
import CartItem from "../components/Cart/CartItem";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { SubmitBtn } from "./Login";
import { Form, InputContainer } from "./Signup";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import { updateUser } from "../components/Profile/MyInfo";
import LoadingSpinner from "../components/LoadingSpinner";
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
	const [isLoading, setIsLoading] = useState(false);
	const [disable, setDisable] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const navigate = useNavigate();
	const stateRef = useRef("");
	const cityRef = useRef("");
	const streetRef = useRef("");
	const streetNumRef = useRef("");
	const postCodeRef = useRef("");
	useEffect(() => {
		setIsLoading(true);
		if (user.shippingAddress?.state) {
			stateRef.current.value = user.shippingAddress.state;
			cityRef.current.value = user.shippingAddress.city;
			streetRef.current.value = user.shippingAddress.street;
			streetNumRef.current.value = user.shippingAddress.streetNum;
			postCodeRef.current.value = user.shippingAddress.zipCode;
		} else {
			setDisable(false);
		}
		setIsLoading(false);
	}, []);

	const items = Object.entries(cart).map(([id, q]) => {
		const item = catalog.find((p) => p.id === id);
		if (!item) return "";
		return <CartItem key={item.id} item={item} />;
	});

	const handleOrder = async (e) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);
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
			const shippingAddress = {
				state: stateRef.current.value,
				city: cityRef.current.value,
				street: streetRef.current.value,
				streetNum: streetNumRef.current.value,
				zipCode: postCodeRef.current.value,
			};

			await updateUser(shippingAddress);
			const order = await myAxios
				.post("/orders", {
					products,
					shippingAddress,
					totalCost: cartFullPrice,
				})
				.then((res) => res.data);
			setSuccessMessage("Order completed successfully! :)");
			setIsLoading(false);
			if (order.status === "success") {
				removeCart();
				updateCatalog();
				navigate("/");
			}
		} catch (err) {
			setErrorMessage(err.response.data.message);
		}
		setIsLoading(false);
	};

	return (
		<PageWrapper>
			{errorMessage && <ErrorAlert message={errorMessage} />}
			{successMessage && <SuccessAlert message={successMessage} />}
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
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
									ref={stateRef}
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
									ref={cityRef}
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
									ref={streetRef}
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
									ref={streetNumRef}
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
									ref={postCodeRef}
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
				</>
			)}
		</PageWrapper>
	);
}

export default Checkout;
