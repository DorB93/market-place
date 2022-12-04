import { useEffect, useState, useMemo } from "react";

function useFetch(url) {
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log(`Fetching Data`);
		fetch(url)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, [url]);

	return useMemo(() => {
		return data;
	}, [data]);
}

export default useFetch;
