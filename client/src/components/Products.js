import React from "react";
import { ProductsContainer } from "./styleComponents";

import useProducts from "../hooks/useProducts";
import Product from "./Product";

function Products() {
	const catalog = useProducts();

	const products = catalog
		// .filter((product) => {
		// 	if (category === "All") return product;
		// 	return product.category === category;
		// })
		.map((p) => <Product key={p.id} product={p} />);
	return (
		<>
			<ProductsContainer>{products}</ProductsContainer>
		</>
	);
}

export default Products;
