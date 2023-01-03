import { useEffect, useState, useMemo, useCallback } from "react";
import myAxios from "../api";

function useAxiosFetch(url, options) {
	const [data, setData] = useState([]);

	const fetchData = useCallback(async () => {
		try {
			const res = await myAxios(url, options);
			const json = res.data.data;

			setData(json);
		} catch (err) {
			return err;
		}
	}, [url, options]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return useMemo(() => {
		return data;
	}, [data]);
}

export default useAxiosFetch;
