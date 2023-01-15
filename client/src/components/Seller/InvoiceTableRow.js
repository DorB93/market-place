import React from "react";
import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
function InvoiceTableRow({ alertBefore, invoice }) {
	const { createAt, _id, products, user, sent, shippingAddress, total } =
		invoice;
	const orderDate = `${createAt.split("T")[0]}, ${createAt
		.split("T")[1]
		.slice(0, 5)} `;
	const totalQuantity = products.reduce(
		(sum, { quantity }) => sum + quantity,
		0
	);
	return (
		<>
			<TableRow>
				<TableCell align='center'>{orderDate}</TableCell>
				<TableCell align='center'>${total.toFixed(2)}</TableCell>
				<TableCell align='center'>{_id}</TableCell>
				<TableCell align='center'>{user.name}</TableCell>
				<TableCell align='center'>{totalQuantity}</TableCell>
				<TableCell align='center'>{!sent ? "pending" : "shipped"}</TableCell>
				<TableCell align='center'>
					{!sent ? (
						<ButtonGroup variant='text'>
							<Button sx={{ fontSize: "10px" }}>Get shipping ticket</Button>
							<Button
								onClick={() => {
									alertBefore(_id);
								}}>
								Send
							</Button>
						</ButtonGroup>
					) : (
						"review Address"
					)}
				</TableCell>
			</TableRow>
		</>
	);
}

export default InvoiceTableRow;
