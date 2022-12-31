import React, { useState, createContext, useContext } from "react";

const FilterContext = createContext({});

export function useFilter() {
	return useContext(FilterContext);
}

export function FilterProvider({ children }) {
	const [filter, setFilter] = useState("All");
	const selectFilter = (filter) => {
		setFilter(filter);
	};
	return (
		<FilterContext.Provider
			value={{
				filter,
				selectFilter,
			}}>
			{children}
		</FilterContext.Provider>
	);
}
/*

const CategoryContext = createContext({});

export function useCategory() {
	return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
	const [category, setCategory] = useState("All");
	const selectCategory = (category) => {
		setCategory(category);
	};
	return (
		<CategoryContext.Provider
			value={{
				category,
				selectCategory,
			}}>
			{children}
		</CategoryContext.Provider>
	);
}
 */
