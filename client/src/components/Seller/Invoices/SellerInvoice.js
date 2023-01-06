import React from "react";

import {
	DeliveryDetails,
	SubmitBtn,
	InvoiceContainer,
	InvoiceProductsContent,
} from "../../StyleComponents";
import ProductInvoice from "./ProductInvoice";

function SellerInvoice({ alertBefore, invoice }) {
	const { products, user, shippingAddress, total } = invoice;
	const productsContent = products.map(({ product, quantity, price, sent }) => (
		<ProductInvoice
			key={product._id}
			product={product}
			quantity={quantity}
			price={price}
			sent={sent}
		/>
	));
	return (
		<InvoiceContainer>
			<h3>Products</h3>
			<InvoiceProductsContent>{productsContent}</InvoiceProductsContent>
			<DeliveryDetails>
				<h3>Delivery details</h3>
				<span>
					<strong>Customer Name</strong>: {user.name}
				</span>
				<h3>Sent to:</h3>

				<span>
					<strong>State:</strong> {shippingAddress.state}
				</span>

				<span>
					<strong>City:</strong> {shippingAddress.city}
				</span>

				<span>
					<strong>Street:</strong> {shippingAddress.street},
					{shippingAddress.streetNum}
				</span>

				<span>
					<strong>ZipCode:</strong> {shippingAddress.zipCode}
				</span>
			</DeliveryDetails>
			<h4>Income amount: ${total.toFixed(2)}</h4>
			<SubmitBtn
				type='submit'
				onClick={() => {
					alertBefore(invoice._id);
				}}>
				Send to customer
			</SubmitBtn>
		</InvoiceContainer>
	);
}

export default SellerInvoice;
