import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import { useCart } from "../context/CartContext";

export const ProductContainer = styled.div`
	display: flex;
	justify-content: space-between;
	/* box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34); */
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
	transition: all linear 200ms;
	position: relative;

	&:hover {
		box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34);
	}

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

const StyledLink = styled(NavLink)`
	color: rgb(125, 125, 125);
	text-decoration: none;
	transition: 200ms all linear;
	&:hover {
		color: rgb(71, 158, 246);
	}
`;

function Product({ product }) {
	const { increaseItemQuantity } = useCart();
	const url = `/products/${product.id}`;
	const [isLoading, setIsLoading] = useState(true);

	return (
		<ProductContainer>
			{isLoading && <LoadingSpinner />}
			<img
				src={product.image}
				alt={product.title}
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
				loading='lazy'
			/>
			<ProductMinDetails>
				<h3>{product.title}</h3>
				<span>
					<StyledLink to={url}>Click for more..</StyledLink>
				</span>
				<span>Price: ${Number(product.getPrice()).toFixed(2)}</span>
				<BtnAddToCart
					onClick={() => {
						increaseItemQuantity(product.id);
					}}>
					Add to cart
				</BtnAddToCart>
			</ProductMinDetails>
		</ProductContainer>
	);
}

export default Product;
