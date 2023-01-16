import {
	Box,
	Button,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
	Container,
} from "@mui/material";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import myAxios from "../api";
import AddressForm from "../components/Checkout/AddressForm";
import OverView from "../components/Checkout/OverView";
import PaymentForm from "../components/Checkout/PaymentForm";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const steps = ["Shipping address", "Payment details", "Review your order"];

function NewCheckout() {
	const { user } = useUser();
	const { updateCatalog, cart, catalog, removeCart, cartFullPrice } = useCart();
	const [currentStep, setCurrentStep] = useState(0);
	const [address, setAddress] = useState(user.shippingAddress);
	const [paymentAddress, setPaymentAddress] = useState({});
	const [customerName, setCustomerName] = useState(user.username);
	const [paymentInfo, setPaymentInfo] = useState({});
	const [sameAddress, setSameAddress] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [orderID, setOrderID] = useState(null);
	const checkoutItems = Object.entries(cart).map(([id, q]) => {
		const item = catalog.find((p) => p.id === id);
		if (!item) return "";
		return { name: item.name, price: item.getPrice(), quantity: q };
	});

	function nextStep() {
		setCurrentStep(currentStep + 1);
	}

	function stepBack() {
		setCurrentStep(currentStep - 1);
	}

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<AddressForm
						title={"Shipping address"}
						address={address}
						setAddress={setAddress}
						customerName={customerName}
						setCustomerName={setCustomerName}
						setSameAddress={setSameAddress}
						sameAddress={sameAddress}
					/>
				);
			case 1:
				return (
					<PaymentForm
						paymentAddress={paymentAddress}
						setPaymentAddress={setPaymentAddress}
						setPaymentInfo={setPaymentInfo}
						sameAddress={sameAddress}
						address={address}
						paymentInfo={paymentInfo}
					/>
				);
			case 2:
				return (
					<OverView
						paymentInfo={paymentInfo}
						address={address}
						paymentAddress={paymentAddress}
						customerName={customerName}
						items={checkoutItems}
						cartFullPrice={cartFullPrice}
					/>
				);
			default:
				throw new Error("Unknown step");
		}
	}

	const handleOrder = async (e) => {
		e.preventDefault();
		setErrorMessage(null);
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
			const shippingAddress = { ...address };
			const order = await myAxios
				.post("/orders", {
					products,
					shippingAddress,
					totalCost: cartFullPrice,
				})
				.then((res) => res.data.data._doc);
			setOrderID(order._id);
			setIsLoading(false);
			removeCart();
			updateCatalog();
			nextStep();
		} catch (err) {
			setErrorMessage(err.response.data.message);
		}
		setIsLoading(false);
	};
	return (
		<>
			{errorMessage && <ErrorAlert message={errorMessage} />}
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
						<Paper
							variant='outlined'
							sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
							<Typography component='h1' variant='h4' align='center'>
								Checkout
							</Typography>
							<Stepper
								activeStep={currentStep}
								sx={{ pt: 3, pb: 5, display: { xs: "none", sm: "flex" } }}>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
							<Box
								sx={{
									pt: 3,
									pb: 5,
									display: { xs: "flex", sm: "none" },
									justifyContent: "center",
								}}>
								<Typography variant='subtitle1'>
									{steps[currentStep]}
								</Typography>
							</Box>
							{currentStep === steps.length ? (
								<>
									<Typography variant='h5' gutterBottom>
										Thank you for your order.
									</Typography>
									<Typography variant='subtitle1'>
										Your order ID is {orderID}. We have emailed your order
										confirmation, and will send you an update when your order
										has shipped. "My Orders" In the meantime, you can review the
										order in <Link to='/my-profile/my-orders'>"My Orders"</Link>
										at your profile
									</Typography>
								</>
							) : (
								<>
									{getStepContent(currentStep)}
									<Box
										sx={{ display: "flex", justifyContent: "space-between" }}>
										{currentStep !== 0 && (
											<Button onClick={stepBack} sx={{ mt: 3, ml: 1 }}>
												Back
											</Button>
										)}
										{currentStep < steps.length - 1 ? (
											<Button
												variant='contained'
												onClick={nextStep}
												sx={{ mt: 3, ml: 1 }}>
												Next
											</Button>
										) : (
											<Button
												variant='contained'
												onClick={handleOrder}
												sx={{ mt: 3, ml: 1 }}>
												Confirm
											</Button>
										)}
									</Box>
								</>
							)}
						</Paper>
					</Container>
				</>
			)}
		</>
	);
}

export default NewCheckout;
