import React, { useEffect, useState } from "react";

import myAxios from "../../api";
import ErrorAlert from "../ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import {
	ConfirmAction,
	ConfirmActionContainer,
	DashboardContainer,
	InvoicesContainer,
	SubmitBtn,
} from "../StyleComponents";
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
