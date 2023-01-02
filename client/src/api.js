import axios from "axios";
import { API_URL } from "./helper";

const myAxios = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}`,
});

export default myAxios;
