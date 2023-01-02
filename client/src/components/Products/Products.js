import React from "react";
import styled from "styled-components";
import Product from "./Product";
import LoadingSpinner from "../LoadingSpinner";
import { useFilter } from "../../context/FilterContext";
import { useCart } from "../../context/CartContext";

export const ProductsContainer = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
`;

function Products() {
	const { catalog } = useCart();
	const { filter } = useFilter();
	// console.log({ catalog });
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
