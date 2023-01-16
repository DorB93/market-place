import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import AddressForm from "./AddressForm";

function PaymentForm({
	setPaymentAddress,
	paymentAddress,
	setPaymentInfo,
	sameAddress,
	address,
	paymentInfo,
}) {
	if (sameAddress) {
		setPaymentAddress(address);
	}
	function handleChange(e) {
		setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
	}
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Payment Information
			</Typography>
			<Grid container spacing={3}>
				{
					<Grid item xs={12} md={6}>
						<TextField
							required
							id='cardName'
							name='cardName'
							label='Name on card'
							fullWidth
							autoComplete='cc-name'
							variant='standard'
							onChange={handleChange}
							defaultValue={paymentInfo.cardName}
						/>
					</Grid>
				}
				<Grid item xs={12} md={6}>
					<TextField
						required
						id='cardNumber'
						name='cardNumber'
						label='Card number'
						fullWidth
						autoComplete='cc-number'
						variant='standard'
						onChange={handleChange}
						defaultValue={paymentInfo.cardNumber}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id='expDate'
						name='expDate'
						label='Expiry date'
						fullWidth
						autoComplete='cc-exp'
						variant='standard'
						helperText='MM/YYYY'
						onChange={handleChange}
						defaultValue={paymentInfo.expDate}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id='cvv'
						name='cvv'
						label='CVV'
						helperText='Last three digits on signature strip'
						fullWidth
						autoComplete='cc-csc'
						variant='standard'
						onChange={handleChange}
						defaultValue={paymentInfo.cvv}
					/>
				</Grid>
			</Grid>
			{!sameAddress && (
				<AddressForm
					title={"Payment address"}
					address={paymentAddress}
					setAddress={setPaymentAddress}
					customerName={setPaymentInfo.cardName}
				/>
			)}
		</>
	);
}

export default PaymentForm;
