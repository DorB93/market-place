import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ProductContainer = styled.div`
	display: flex;
	justify-content: space-between;
	border: 1px solid rgb(179, 179, 179);
	box-shadow: 2px 2px 3px 2px rgba(40, 40, 40, 0.34);
	width: 400px;
	height: 250px;
	font-size: 15px;
	margin: 20px;
	border-radius: 10px;
	box-sizing: border-box;
	color: rgb(125, 125, 125);
	overflow: hidden;
	padding: 15px;
	background-color: white;
	transition: all linear 500ms;
	position: relative;

	& img {
		width: 50%;
		object-fit: contain;
		justify-self: center;
	}
`;
export const ProductMinDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;

	& ::-webkit-scrollbar {
		width: 7px;
	}

	& ::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	& ::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 0.5px solid rgba(255, 255, 255, 0.444);
		border-radius: 12px;
	}

	& h3 {
		margin: 0;
		font-size: 12px;
		max-height: 45px;
		width: 90%;
		overflow: auto;
	}
	& a {
		color: rgb(125, 125, 125);
		text-decoration: none;
	}
	& span {
		font-size: larger;
	}
`;
export const BtnAddToCart = styled.button`
	height: 35px;
	font-size: 15px;
	border-radius: 40px;
	color: white;
	background-color: rgb(71, 158, 246);
	transition: all linear 250ms;
	border: 0;
	width: 100px;

	&:hover {
		background-color: white;
		box-shadow: 2px 2px 2px 2px rgba(71, 159, 246, 0.453);
		color: rgb(71, 158, 246);
		border: rgb(71, 158, 246) 1px;
	}
`;

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
				<BtnAddToCart>Add to cart</BtnAddToCart>
			</ProductMinDetails>
		</ProductContainer>
	);
}

export default Product;
