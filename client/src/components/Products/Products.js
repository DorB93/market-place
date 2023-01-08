import React from "react";
import Product from "./Product";
import LoadingSpinner from "../LoadingSpinner";
import { useFilter } from "../../context/FilterContext";
import { useCart } from "../../context/CartContext";
import { ProductsContainer } from "../StyleComponents";

function Products() {
	const { catalog } = useCart();
	const { filter } = useFilter();

	const products = catalog
		.filter((product) => {
			if (filter === "All") return product;
			return product.category === filter;
		})
		.map((p) => <Product key={p.id} product={p} />);
	return (
		<>
			<ProductsContainer
				container
				spacing={{ xs: 1, md: 2, lg: 3 }}
				paddingX={{ xs: 0, ms: 10, md: 15, lg: 25 }}
				justifyContent='center'
				alignItems='center'>
				{products.length === 0 ? <LoadingSpinner /> : products}
			</ProductsContainer>
		</>
	);
}

export default Products;
