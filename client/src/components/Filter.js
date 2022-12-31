import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilter } from "../context/FilterContext";
import myAxios from "../api";

export const CategorySelector = styled.nav`
	width: 100%;
	box-sizing: border-box;
	box-shadow: 2px 2px 5px 1px rgba(128, 128, 128, 0.193);
	height: 30px;
	background-color: #dfdfdf8f;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	justify-self: center;
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
	const [categories, satCategories] = useState(["All"]);
	useEffect(() => {
		async function getData() {
			try {
				await myAxios.get("categories").then((res) => {
					const { data } = res.data.data;
					satCategories(["All", ...data]);
				});
			} catch (err) {
				alert(err.message);
			}
		}
		getData();
	}, []);
	const { selectFilter } = useFilter();
	const selection = categories.map((atr) => (
		<CategoryOption key={atr} title={atr} onClick={() => selectFilter(atr)}>
			{atr}
		</CategoryOption>
	));
	return (
		<>
			<CategorySelector>{selection}</CategorySelector>
		</>
	);
}

export default Filter;
