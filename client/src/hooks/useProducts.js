import { useState, useMemo, useEffect } from "react";
import myAxios from "../api";

export class ClProduct {
	#discountFormula = 0.95;
	#price;
	constructor(
		id,
		category,
		price,
		title,
		image,
		description,
		seller,
		inventory
	) {
		this.id = id;
		this.category = category;
		this.category = category;
		this.#price = price;
		this.name = title;
		this.image = image;
		this.description = description;
		this.inventory = inventory;
		this.seller = seller?.id ? seller.id : seller;
	}
	getPrice() {
		return this.category === "electronics"
			? this.#price * this.#discountFormula
			: this.#price;
	}
}

function useProducts() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getProducts() {
			try {
				await myAxios.get("products").then((res) => {
					console.log({ res });
					setProducts(res.data.data);
				});
			} catch (err) {
				return err;
			}
		}
		getProducts();
	}, []);

	const productsList = products.map(
		({ id, category, price, name, image, description, seller, inventory }) =>
			new ClProduct(
				id,
				category,
				price,
				name,
				image,
				description,
				seller,
				inventory
			)
	);
	return useMemo(() => {
		return productsList;
	}, [productsList]);
}

export default useProducts;
