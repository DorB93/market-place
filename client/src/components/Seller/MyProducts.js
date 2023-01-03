import React, { useState, useEffect } from "react";
import styled from "styled-components";

import myAxios from "../../api";
import { StoreContainer } from "../../pages/Store";
import { CategoryOption, CategorySelector } from "../Filter";
import LoadingSpinner from "../LoadingSpinner";
import {
	ProductContainer,
	ProductMinDetails,
	StyledLink,
} from "../Products/Product";
import { ProductsContainer } from "../Products/Products";

const SellerCategoryNav = styled(CategorySelector)`
	position: sticky;
	top: 60px;
	left: 190px;
	z-index: 3;
`;
async function getMyProducts() {
	try {
		const res = await myAxios
			.get("products/my-products")
			.then((res) => res.data.data);

		return Object.values(res);
	} catch (err) {
		window.alert(err.message);
	}
}

function MyProducts() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getMyProducts().then((res) => {
			setProducts(res);
			setIsLoading(false);
		});
	}, []);

	const myCategories = Array.from(
		new Set(products.map((product) => product.category))
	).map((atr) => (
		<CategoryOption key={atr} title={atr}>
			{atr}
		</CategoryOption>
	));
	const myProducts = products.map((product) => (
		<ProductContainer>
			{isLoading && <LoadingSpinner />}
			<img
				src={`/img/products/${product.image}`}
				alt={product.title}
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
				loading='lazy'
			/>
			<ProductMinDetails>
				<h3>{product.name}</h3>
				<span>
					<StyledLink to={`${product._id}`}>Click for more..</StyledLink>
				</span>
				<span>Price: ${Number(product.price).toFixed(2)}</span>
			</ProductMinDetails>
		</ProductContainer>
	));
	return (
		<StoreContainer>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<SellerCategoryNav>
						<h4>My Categories:</h4>
						{myCategories}
					</SellerCategoryNav>
					<ProductsContainer>{myProducts}</ProductsContainer>
				</>
			)}
		</StoreContainer>
	);
}

export default MyProducts;
