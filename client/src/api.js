import axios from "axios";

const myAxios = axios.create({
	withCredentials: true,
	baseURL: `http://127.0.0.1:4000/api/v1`,
});

export default myAxios;
