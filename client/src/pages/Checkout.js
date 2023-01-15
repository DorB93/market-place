import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import myAxios from "../api";
import CartItem from "../components/Cart/CartItem";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import { updateUser } from "../components/Profile/MyInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import {
	ItemsContainer,
	PageWrapper,
	SectionContainer,
	CartContents,
	CartInfo,
	Form,
	InputContainer,
	SubmitBtn,
} from "../components/StyleComponents";

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
			stateRef.current = user.shippingAddress.state;
			cityRef.current = user.shippingAddress.city;
			streetRef.current = user.shippingAddress.street;
			streetNumRef.current = user.shippingAddress.streetNum;
			postCodeRef.current = user.shippingAddress.postCode;
		} else {
			setDisable(false);
		}
		setIsLoading(false);
	}, [user]);

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

		// console.log({ stateRef });
		// console.log({ cityRef });
		// console.log({ streetRef });
		// console.log({ streetNumRef });
		// console.log({ postCodeRef });
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
				state: stateRef.current,
				city: cityRef.current,
				street: streetRef.current,
				streetNum: streetNumRef.current,
				zipCode: postCodeRef.current,
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
						<Form
							component='div'
							sx={{
								width: {
									xs: "500px",
								},
							}}>
							<h3>Shipping Address</h3>
							<InputContainer
								disabled={disable}
								size='small'
								id='state'
								label='State:'
								onChange={(e) => (stateRef.current = e.target.value)}
								defaultValue={stateRef.current}
							/>
							<InputContainer
								disabled={disable}
								size='small'
								id='city'
								label='City:'
								onChange={(e) => (cityRef.current = e.target.value)}
								defaultValue={cityRef.current}
								type='text'
							/>
							<InputContainer
								disabled={disable}
								size='small'
								id='street'
								label='Street:'
								onChange={(e) => (streetRef.current = e.target.value)}
								defaultValue={streetRef.current}
							/>
							<InputContainer
								disabled={disable}
								size='small'
								id='streetNum'
								label='StreetNum:'
								type='number'
								onChange={(e) => (streetNumRef.current = e.target.value)}
								defaultValue={streetNumRef.current}
							/>
							<InputContainer
								disabled={disable}
								size='small'
								id='zipCode'
								label='Post Code:'
								onChange={(e) => (postCodeRef.current = e.target.value)}
								defaultValue={postCodeRef.current}
								type='text'
							/>
						</Form>
						<Form
							component='div'
							sx={{
								width: {
									xs: "500px",
								},
							}}>
							<h3>Payment</h3>
							<InputContainer
								disabled
								size='small'
								id='expDate'
								label='Expiry date'
								fullWidth
								autoComplete='cc-exp'
								defaultValue='MM/YY'
							/>
							<InputContainer
								disabled
								size='small'
								id='cardNumber'
								label='Card number'
								fullWidth
								autoComplete='cc-number'
								defaultValue='XXXX-XXXX-XXXX-XXXX'
							/>
							<InputContainer
								disabled
								size='small'
								id='cardName'
								label='Name on card'
								fullWidth
								autoComplete='cc-name'
								defaultValue='Your Name'
							/>
							<InputContainer
								disabled
								size='small'
								id='cvv'
								label='CVV'
								fullWidth
								autoComplete='cc-csc'
								defaultValue='###'
							/>

							<SubmitBtn
								onClick={handleOrder}
								type='submit'
								disabled={isLoading}>
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
