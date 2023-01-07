import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useCart } from "../../context/CartContext";
import {
	BtnAddToCart,
	InventoryAlert,
	ProductContainer,
	ProductMinDetails,
	StyledLink,
} from "../StyleComponents";
import { AddShoppingCart } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

function Product({ product }) {
	const { increaseItemQuantity } = useCart();
	const url = `/products/${product.id}`;
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Grid item>
			<ProductContainer disabled={!product.inventory}>
				{product.inventory < 7 && product.inventory > 0 && (
					<InventoryAlert>Only {product.inventory} left...</InventoryAlert>
				)}
				{product.inventory === 0 && (
					<InventoryAlert>Out of stock</InventoryAlert>
				)}
				{isLoading && <LoadingSpinner />}
				<img
					src={`/img/products/${product.image}`}
					alt={product.name}
					onLoad={() => setIsLoading(false)}
					onError={() => setIsLoading(false)}
					loading='lazy'
				/>
				<Box
					paddingX={1}
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}>
					<Typography variant='h6' component='h2'>
						{product.name}
					</Typography>
					<Typography variant='button' component='a'>
						<StyledLink to={url}>More Details...</StyledLink>
					</Typography>
					<span>Price: ${Number(product.getPrice()).toFixed(2)}</span>
					<BtnAddToCart
						variant='contained'
						color='primary'
						onClick={() => {
							increaseItemQuantity(product.id);
						}}
						disabled={!product.inventory}>
						<AddShoppingCart />
					</BtnAddToCart>
				</Box>
			</ProductContainer>
		</Grid>
	);
}

export default Product;
