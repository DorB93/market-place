import React from "react";
import { NavLink } from "react-router-dom";
import { ProductContainer, ProductMinDetails } from "./styleComponents";
function Product({ product }) {
	const url = `/products/${product.id}`;

	return (
		<ProductContainer>
			<img src={product.image} alt={product.title} />
			<ProductMinDetails>
				<h3>{product.title}</h3>
				<span>
					<NavLink to={url}>Click for more..</NavLink>
				</span>
				<span>Price: ${Number(product.getPrice()).toFixed(2)}</span>
				<button>Add to cart</button>
			</ProductMinDetails>
		</ProductContainer>
	);
}

export default Product;
