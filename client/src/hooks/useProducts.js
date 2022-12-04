import useFetch from "./useFetch";

export class Product {
	#discountFormula = 0.95;
	#price;
	constructor(id, category, price, title, image, rating, description) {
		this.id = id;
		this.category = category;
		this.#price = price;
		this.title = title;
		this.image = image;
		this.rating = rating;
		this.description = description;
	}
	getPrice() {
		return this.category === "electronics"
			? this.#price * this.#discountFormula
			: this.#price;
	}
}
function useProducts() {
	const productsList = useFetch("https://fakestoreapi.com/products");
	return productsList.map(
		({ id, category, price, title, image, rating, description }) =>
			new Product(id, category, price, title, image, rating, description)
	);
}

export default useProducts;
