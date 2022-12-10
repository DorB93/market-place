import React from "react";
import styled from "styled-components";
import useProducts from "../hooks/useProducts";
import Product from "./Product";
import LoadingSpinner from "./LoadingSpinner";
import { useFilter } from "../context/FilterContext";

export const ProductsContainer = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
`;

function Products() {
	const catalog = useProducts();
	const { filter } = useFilter();
	const products = catalog
		.filter((product) => {
			if (filter === "All") return product;
			return product.category === filter;
		})
		.map((p) => <Product key={p.id} product={p} />);
	return (
		<>
			<ProductsContainer>
				{products.length === 0 ? <LoadingSpinner /> : products}
			</ProductsContainer>
		</>
	);
}

export default Products;
