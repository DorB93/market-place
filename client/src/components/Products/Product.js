import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useCart } from "../../context/CartContext";
import {
	BtnAddToCart,
	InventoryAlert,
	ProductContainer,
	ProductMinDetails,
	StyledLink,
} from "../StyleComponents";

function Product({ product }) {
	const { increaseItemQuantity } = useCart();
	const url = `/products/${product.id}`;
	const [isLoading, setIsLoading] = useState(true);

	return (
		<ProductContainer disabled={!product.inventory}>
			{product.inventory < 7 && product.inventory > 0 && (
				<InventoryAlert>Only {product.inventory} left...</InventoryAlert>
			)}
			{product.inventory === 0 && <InventoryAlert>Out of stock</InventoryAlert>}
			{isLoading && <LoadingSpinner />}
			<img
				src={`/img/products/${product.image}`}
				alt={product.name}
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
				loading='lazy'
			/>
			<ProductMinDetails>
				<h3>{product.name}</h3>
				<span>
					<StyledLink to={url}>Click for more..</StyledLink>
				</span>
				<span>Price: ${Number(product.getPrice()).toFixed(2)}</span>
				<BtnAddToCart
					onClick={() => {
						increaseItemQuantity(product.id);
					}}
					disabled={!product.inventory}>
					Add to cart
				</BtnAddToCart>
			</ProductMinDetails>
		</ProductContainer>
	);
}

export default Product;
