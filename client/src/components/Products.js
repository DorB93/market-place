import React from "react";
import styled from "styled-components";
import useProducts from "../hooks/useProducts";
import Product from "./Product";

export const ProductsContainer = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
`;

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
