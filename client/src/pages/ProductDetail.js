import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import useFetch from "./../hooks/useFetch";
import useProducts from "../hooks/useProducts";
import Product, { BtnAddToCart } from "../components/Product";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";

const ProductWrapper = styled.div`
	background-color: #fbfafa;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 15px;
`;
const Details = styled.section`
	width: 80%;
	display: flex;
	justify-content: space-between;
	gap: 50px;
`;
const ProductImg = styled.img`
	background-color: transparent;
	min-width: 250px;
	object-fit: contain;
	max-height: 500px;
`;
const TextDetails = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;
const RelatedContainer = styled.section`
	display: flex;
	width: 90%;
	flex-wrap: wrap;
	overflow: auto;
	justify-content: center;
`;
const PriceAction = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

function ProductDetail() {
	const { increaseItemQuantity } = useCart();
	const { id } = useParams();
	const productData = useFetch(`https://fakestoreapi.com/products/${id}`);
	const sameCategory = useProducts()
		.filter(
			(p) => p.id !== productData.id && p.category === productData.category
		)
		.map((p) => <Product key={p.id} product={p} />);
	return (
		<>
			{productData.length === 0 ? (
				<LoadingSpinner />
			) : (
				<ProductWrapper>
					<h1>{productData.title}</h1>
					<Details>
						<ProductImg src={productData.image} alt={productData.title} />
						<TextDetails>
							<h3>Category: {productData.category}</h3>
							<p>{productData.description}</p>
							<PriceAction>
								<span>Price: ${Number(productData.price).toFixed(2)}</span>
								<BtnAddToCart
									onClick={() => {
										increaseItemQuantity(productData.id);
									}}>
									Add to cart
								</BtnAddToCart>
							</PriceAction>
						</TextDetails>
					</Details>
					<h3>More from this category:</h3>
					<RelatedContainer>{sameCategory}</RelatedContainer>
				</ProductWrapper>
			)}
		</>
	);
}

export default ProductDetail;
