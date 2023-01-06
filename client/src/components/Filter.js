import React, { useEffect, useState } from "react";

import { useFilter } from "../context/FilterContext";
import myAxios from "../api";
import { CategoryOption, CategorySelector } from "./StyleComponents";

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
