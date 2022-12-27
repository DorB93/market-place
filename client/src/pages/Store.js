import React from "react";
import Filter from "../components/Filter";
import Products from "../components/Products/Products";
import styled from "styled-components";

import { FilterProvider } from "../context/FilterContext";

export const StoreContainer = styled.section`
	background-color: #fbfafa;
	width: 100vw;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	/* padding-top: 5px; */
	padding-bottom: 5px;
	min-height: 60vh;
`;

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
