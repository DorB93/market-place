import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myAxios from "../../api";
import { SubmitBtn } from "../../pages/Login";
import ErrorAlert from "../ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import SuccessAlert from "../SuccessAlert";
import SellerInvoice from "./Invoices/SellerInvoice";

async function getInvoices() {
	try {
		const { data } = await myAxios.get("invoices/my-invoices");
		return data.data;
	} catch (err) {
		throw err;
	}
}
const DashboardContainer = styled.div`
	width: 85vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 20px;
`;
const InvoicesContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
`;

const ConfirmActionContainer = styled.div`
	position: fixed;
	cursor: pointer;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	z-index: 5;
	background-color: rgba(84, 84, 84, 0.585);
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ConfirmAction = styled.div`
	background-color: white;
	height: 250px;
	width: 350px;
	border-radius: 12px;
	box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	gap: 25px;
	z-index: 6;
	cursor: default;
`;
function SellerDashboard() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [display, setDisplay] = useState(false);
	const [invoiceId, setInvoiceId] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [okMessage, setOkMessage] = useState(null);

	function alertBefore(Id) {
		setDisplay(true);
		setInvoiceId(Id);
	}
	async function updateInvoice() {
		setIsLoading(true);
		setErrorMessage(null);
		setOkMessage(null);
		try {
			await myAxios.patch(`invoices/${invoiceId}`, { sent: true });
			setOkMessage("Invoice updated successfully! :)");
			setIsLoading(false);
		} catch (err) {
			setErrorMessage(err.response.data.message);
			setIsLoading(false);
		}
	}
	useEffect(() => {
		setIsLoading(true);
		getInvoices().then(({ invoices }) => {
			setData(invoices);
			setIsLoading(false);
			// console.log({ invoices });
		});
	}, []);
	const myInvoices =
		!isLoading &&
		data
			.filter((invoice) => !invoice.sent)
			.map((invoice) => (
				<SellerInvoice alertBefore={alertBefore} invoice={invoice} />
			));

	return (
		<DashboardContainer>
			{errorMessage && <ErrorAlert message={errorMessage} />}
			{okMessage && <SuccessAlert message={okMessage} />}
			{display && (
				<ConfirmActionContainer onClick={() => setDisplay(false)}>
					<ConfirmAction>
						<h2>Make sure you sent the items</h2>
						<SubmitBtn type='submit' onClick={updateInvoice}>
							Send!
						</SubmitBtn>
					</ConfirmAction>
				</ConfirmActionContainer>
			)}

			{isLoading ? (
				<LoadingSpinner />
			) : (
				<InvoicesContainer>{myInvoices}</InvoicesContainer>
			)}
		</DashboardContainer>
	);
}

export default SellerDashboard;
