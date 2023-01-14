import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigator } from "../StyleComponents";

function OrderTableDetail({ order }) {
	const navigate = useNavigate();
	const orderDate = `${order.createAt.split("T")[0]}, ${order.createAt
		.split("T")[1]
		.slice(0, 5)} `;
	const totalCost = `$${order.totalCost.toFixed(2)}`;
	const { totalReceived, totalQuantity } = order.products.reduce(
		(acc, p) => {
			if (p.received) {
				acc.totalReceived += p.quantity;
			}
			acc.totalQuantity += p.quantity;
			return acc;
		},
		{ totalReceived: 0, totalQuantity: 0 }
	);
	return (
		<TableRow key={order._id}>
			<TableCell component='th' scope='row'>
				{orderDate}
			</TableCell>
			<TableCell align='center'>{totalCost}</TableCell>
			<TableCell align='center'>{`${totalReceived}/${totalQuantity}`}</TableCell>
			<TableCell align='center'>
				<Navigator
					onClick={() => {
						navigate(`${order._id}`);
					}}>
					Order Detail
				</Navigator>
			</TableCell>
		</TableRow>
	);
}

export default OrderTableDetail;
