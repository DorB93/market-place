import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

function OverView({
	paymentInfo,
	address,
	paymentAddress,
	customerName,
	items,
	cartFullPrice,
}) {
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{items.map((product) => (
					<ListItem key={product.name} sx={{ py: 1, px: 0 }}>
						<ListItemText
							primary={product.name}
							secondary={`${product.quantity} ${
								product.quantity === 1 ? "unit" : "units"
							}`}
						/>
						<Typography variant='body2'>${product.price.toFixed(2)}</Typography>
					</ListItem>
				))}

				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary='Total' />
					<Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
						${cartFullPrice.toFixed(2)}
					</Typography>
				</ListItem>
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
						Shipping
					</Typography>
					<Typography gutterBottom>{customerName}</Typography>
					<Typography gutterBottom>
						{Object.values(address).join(", ")}
					</Typography>
				</Grid>
				<Grid item container direction='column' xs={12} sm={6}>
					<Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
						Payment details
					</Typography>
					<Grid container>
						{Object.entries(paymentInfo).map(([name, value]) => (
							<React.Fragment key={name}>
								<Grid item xs={6}>
									<Typography gutterBottom>{name}</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography gutterBottom>
										{name === "cardNumber"
											? `xxxx-xxxx-xxxx-${value.slice(-4)}`
											: value}
									</Typography>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default OverView;
