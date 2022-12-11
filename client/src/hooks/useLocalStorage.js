import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		// Get data from localStorage by key
		const jsonValue = localStorage.getItem(key);
		// If there us a data store in local storage with that key
		if (jsonValue) {
			return JSON.parse(jsonValue);
		}
		// If there is no data Return the initial value
		if (typeof initialValue === "function") {
			return initialValue;
		} else {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}

export default useLocalStorage;
