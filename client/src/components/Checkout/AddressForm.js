import {
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";

function AddressForm({
	setAddress,
	address,
	customerName,
	setCustomerName,
	setSameAddress,
	sameAddress,
	title,
}) {
	const { state, city, street, streetNum, postCode } = address;

	function handleChange(e) {
		setAddress({ ...address, [e.target.name]: e.target.value });
	}
	return (
		<>
			<Typography variant='h6' gutterBottom>
				{title}
			</Typography>
			<Grid container spacing={3}>
				{title === "Shipping address" && (
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant='standard'
							required
							id='name'
							name='name'
							label='Full name'
							defaultValue={customerName}
							onChange={(e) => {
								setCustomerName(e.target.value);
							}}
						/>
					</Grid>
				)}

				<Grid item xs={8}>
					<TextField
						onChange={handleChange}
						fullWidth
						variant='standard'
						required
						id='street'
						name='street'
						label='Street'
						defaultValue={street}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						onChange={handleChange}
						type='number'
						fullWidth
						variant='standard'
						required
						id='streetNum'
						name='streetNum'
						label='StreetNum'
						defaultValue={streetNum}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						onChange={handleChange}
						required
						id='city'
						variant='standard'
						name='city'
						label='City'
						fullWidth
						defaultValue={city}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						onChange={handleChange}
						id='state'
						name='state'
						label='State'
						fullWidth
						variant='standard'
						defaultValue={state}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						onChange={handleChange}
						required
						id='postCode'
						name='postCode'
						label='Post code'
						fullWidth
						variant='standard'
						defaultValue={postCode}
					/>
				</Grid>
				{title === "Shipping address" && (
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									color='secondary'
									name='saveAddress'
									onChange={(e) => {
										setSameAddress(e.target.value);
									}}
									defaultValue={sameAddress}
								/>
							}
							label='Use this address for payment details'
						/>
					</Grid>
				)}
			</Grid>
		</>
	);
}

export default AddressForm;
