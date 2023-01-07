import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Product from "./Product";
import LoadingSpinner from "../LoadingSpinner";
import { useCart } from "../../context/CartContext";
import myAxios from "../../api";
import {
	BackBtn,
	Details,
	PriceAction,
	ProductImg,
	ProductWrapper,
	BtnAddToCart,
	RelatedContainer,
	TextDetails,
} from "../StyleComponents";
import { AddShoppingCart } from "@mui/icons-material";

function ProductDetail() {
	const { increaseItemQuantity, catalog } = useCart();
	const { id } = useParams();
	const navigate = useNavigate();
	const [productData, setProductData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const sameCategory = catalog
		.filter((p) => p.id !== id && p.category === productData.category)
		.map((p) => <Product key={p.id} product={p} />);

	useEffect(() => {
		setIsLoading(true);
		async function getProductData() {
			try {
				await myAxios.get(`products/${id}`).then((res) => {
					setProductData(res.data.data._doc);
					setIsLoading(false);
				});
			} catch (err) {
				alert(err.message);
				setIsLoading(false);
			}
		}
		getProductData();
	}, [id]);
	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<ProductWrapper>
					<h1>{productData.title}</h1>
					<Details>
						<ProductImg
							src={`/img/products/${productData.image}`}
							alt={productData.title}
						/>
						<TextDetails>
							<h3>Category: {productData.category}</h3>
							<p>{productData.description}</p>
							<PriceAction>
								<span>Price: ${Number(productData.price).toFixed(2)}</span>
								<BtnAddToCart
									variant='contained'
									color='primary'
									onClick={() => {
										increaseItemQuantity(id);
									}}>
									<AddShoppingCart />
								</BtnAddToCart>
								<BackBtn variant='text' onClick={() => navigate(-1)}>
									Back
								</BackBtn>
							</PriceAction>
						</TextDetails>
					</Details>
					<h3>More from this category:</h3>
					<RelatedContainer container spacing={3} xs={{ gap: 3 }}>
						{sameCategory}
					</RelatedContainer>
				</ProductWrapper>
			)}
		</>
	);
}

export default ProductDetail;
