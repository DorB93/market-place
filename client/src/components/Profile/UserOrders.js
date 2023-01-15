import React, { useEffect, useState } from "react";
import myAxios from "../../api";
import LoadingSpinner from "../LoadingSpinner";
import { OrdersContainer } from "../StyleComponents";
import OrderTableDetail from "./OrderTableDetail";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";

export async function getOrders() {
	try {
		const res = await myAxios.get("orders/my-orders");

		return res.data;
	} catch (err) {
		throw new Error(err.message);
	}
}
function UserOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, satLoading] = useState(false);
	useEffect(() => {
		satLoading(true);
		getOrders().then((res) => {
			setOrders(res.data);
			satLoading(false);
		});
	}, []);

	const tableContent = orders.length ? (
		orders
			.sort((a, b) => {
				return Date.parse(b.createAt) - Date.parse(a.createAt);
			})
			.map((order) => <OrderTableDetail key={order._id} order={order} />)
	) : (
		<TableRow>You haven't made any order yet...</TableRow>
	);
	const table = (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Ordered At</TableCell>
						<TableCell>Total Cost</TableCell>
						<TableCell>
							Received /<br /> Total Quantity
						</TableCell>
						<TableCell>View Order</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{tableContent}</TableBody>
			</Table>
		</TableContainer>
	);
	return (
		<>
			<OrdersContainer>{loading ? <LoadingSpinner /> : table}</OrdersContainer>
		</>
	);
}

export default UserOrders;
