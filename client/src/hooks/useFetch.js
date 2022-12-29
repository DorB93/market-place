import { useEffect, useState, useMemo } from "react";

function useFetch(url, options) {
	const [data, setData] = useState([]);
	if (options) {
		options.credentials = "include";
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url, options);
				const json = await res.json();
				console.log({ json });
				setData(json);
			} catch (err) {
				return err;
			}
		};
		fetchData();
	}, [url, options]);
	return useMemo(() => {
		return data;
	}, [data]);
}

export default useFetch;
