import { useEffect, useState, useMemo } from "react";

function useFetch(url, options) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url, options);
				const json = await res.json();
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
