import React from "react";
import styled from "styled-components";

export const CategorySelector = styled.nav`
	width: 100vw;
	box-sizing: border-box;

	height: 30px;
	background-color: #dfdfdf8f;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;

export const CategoryOption = styled.div`
	color: black;
	background-color: transparent;
	border: 0;
	border-right: 1px solid rgb(186, 186, 186);
	width: fit-content;
	min-width: 40px;
	margin: 10px;
	padding-left: 15px;
	padding-right: 15px;
	box-sizing: border-box;
	font-size: large;
	transition: linear all 250ms;
	cursor: pointer;

	&:hover {
		background-color: rgba(186, 186, 186, 0.835);
	}
`;

function Filter() {
	return (
		<>
			<CategorySelector>
				<CategoryOption>Category</CategoryOption>
				<CategoryOption>Category</CategoryOption>
				<CategoryOption>Category</CategoryOption>
				<CategoryOption>Category</CategoryOption>
			</CategorySelector>
		</>
	);
}

export default Filter;
