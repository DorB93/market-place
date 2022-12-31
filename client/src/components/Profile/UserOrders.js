import React, { useEffect, useState } from "react";
import myAxios from "../../api";
import LoadingSpinner from "../LoadingSpinner";
import OrderItem from "./OrderItem";
import { ProductsContainer } from "../Products/Products";
import styled from "styled-components";

const OrdersContainer = styled(ProductsContainer)`
	width: 100%;
`;

export async function getOrders() {
	try {
		const res = await myAxios.get("orders/my-orders");
		console.log({ res });
		return res.data;
	} catch (err) {
		console.error({ err });
		throw new Error(err.message);
	}
}
function UserOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, satLoading] = useState(false);
	useEffect(() => {
		satLoading(true);
		getOrders().then((res) => {
			console.log({ res });
			setOrders(res.data);
			satLoading(false);
		});
	}, []);
	const content = orders.length
		? orders.map((order) => <OrderItem key={order._id} order={order} />)
		: "";
	return (
		<OrdersContainer>{loading ? <LoadingSpinner /> : content}</OrdersContainer>
	);
}

export default UserOrders;
