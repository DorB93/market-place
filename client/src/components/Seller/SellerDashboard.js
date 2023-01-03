import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myAxios from "../../api";
import LoadingSpinner from "../LoadingSpinner";

// async function getInvoices() {
// 	const res = await myAxios.get("invoices/my-invoices");
// 	return res;
// }
const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
function SellerDashboard() {
	// const [invoices, setInvoices] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	getInvoices().then((res) => {
	// 		console.log(res);
	// 		setInvoices(res);
	// 		setIsLoading(false);
	// 	});
	// }, []);
	return (
		<DashboardContainer>
			{/* {isLoading ? (
				<LoadingSpinner />
			) : (
				<> */}
			<h1>Sorry... Not Implement yet.... </h1>
			{/* </>
			)} */}
		</DashboardContainer>
	);
}

export default SellerDashboard;
