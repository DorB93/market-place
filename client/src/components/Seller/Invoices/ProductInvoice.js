import React from "react";
import { ProductContainer, ProductMinDetails } from "../../StyleComponents";
function ProductInvoice({ product, quantity, price, sent }) {
	return (
		<>
			<ProductContainer>
				<img
					src={`/img/products/${product.image}`}
					alt={product.title}
					loading='lazy'
				/>
				<ProductMinDetails>
					<h3>{product.name}</h3>
					<span>Quantity: {quantity}</span>
					<span>Price: ${price.toFixed(2)}</span>
				</ProductMinDetails>
			</ProductContainer>
		</>
	);
}

export default ProductInvoice;
