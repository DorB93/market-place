import React, { useEffect, useState } from "react";

import { useFilter } from "../context/FilterContext";
import myAxios from "../api";
import { CategoryOption, CategorySelector } from "./StyleComponents";
import {
	Select,
	InputLabel,
	FormControl,
	Box,
	MenuItem,
	Container,
} from "@mui/material";

function Filter() {
	const [categories, satCategories] = useState(["All"]);
	const { filter, selectFilter } = useFilter();
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
	function handleChange(e) {
		selectFilter(e.target.value);
	}
	const selection = categories.map((atr) => (
		<CategoryOption key={atr} title={atr} onClick={() => selectFilter(atr)}>
			{atr}
		</CategoryOption>
	));
	const options = categories.map((atr) => (
		<MenuItem value={atr}>{atr}</MenuItem>
	));
	return (
		<Container maxWidth='xl'>
			<CategorySelector display={{ xs: "none", md: "flex" }}>
				{selection}
			</CategorySelector>

			<Box sx={{ minWidth: 120, display: { xs: "flex", md: "none" } }}>
				<FormControl fullWidth>
					<InputLabel id='category-filter-label'>Select category...</InputLabel>
					<Select
						id='category-filter-select'
						value={filter === "All" ? null : filter}
						label='Select category...'
						onChange={handleChange}>
						{options}
					</Select>
				</FormControl>
			</Box>
		</Container>
	);
}

export default Filter;
