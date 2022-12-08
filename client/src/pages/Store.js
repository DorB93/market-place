import React from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import styled from "styled-components";

export const StoreContainer = styled.section`
	background-color: #fbfafa;
	width: 100vw;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	padding-top: 5px;
	padding-bottom: 5px;
	min-height: 60vh;
`;

function Store() {
	return (
		<StoreContainer>
			<Filter />
			<Products />
		</StoreContainer>
	);
}

export default Store;
