import React from "react";
import Filter from "../components/Filter";
import Products from "../components/Products/Products";
import { StoreContainer } from "../components/StyleComponents";

import { FilterProvider } from "../context/FilterContext";

function Store() {
	return (
		<FilterProvider>
			<StoreContainer>
				<Filter />
				<Products />
			</StoreContainer>
		</FilterProvider>
	);
}

export default Store;
