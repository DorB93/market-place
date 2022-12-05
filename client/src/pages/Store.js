import React from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import { StoreContainer } from "../components/styleComponents";

function Store() {
	return (
		<StoreContainer>
			<Filter />
			<Products />
		</StoreContainer>
	);
}

export default Store;
