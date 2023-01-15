import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import myAxios from "../../api";
import LoadingSpinner from "../LoadingSpinner";

import {
	SellerCategoryNav,
	StoreContainer,
	CategoryOption,
} from "../StyleComponents";
import SellerProductRow from "./SellerProductRow";

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
	const [categoryFilter, setCategoryFilter] = useState("All");

	useEffect(() => {
		setIsLoading(true);
		getMyProducts().then((res) => {
			setProducts(res);
			setIsLoading(false);
		});
	}, []);

	const myCategories = [
		"All",
		...Array.from(new Set(products.map((product) => product.category))),
	].map((atr) => (
		<CategoryOption
			onClick={() => {
				setCategoryFilter(atr);
			}}
			key={atr}
			title={atr}>
			{atr}
		</CategoryOption>
	));

	const productsRows = products
		.filter((product) => {
			if (categoryFilter === "All") {
				return product;
			}
			return product.category === categoryFilter;
		})
		.map((product) => <SellerProductRow product={product} />);
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
					<TableContainer component={Container}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align='center'>ID</TableCell>
									<TableCell align='center'>Image</TableCell>
									<TableCell align='center'>Name</TableCell>
									<TableCell align='center'>Price</TableCell>
									<TableCell align='center'>Inventory</TableCell>
									<TableCell align='center'>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>{productsRows}</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</StoreContainer>
	);
}

export default MyProducts;
