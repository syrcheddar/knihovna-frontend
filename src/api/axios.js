import axios from "axios";

export default axios.create({
	// baseURL: "http://localhost:8080"
	// baseURL: "http://localhost:9090"
	baseURL: "https://knihovna-backend1.herokuapp.com",
});
