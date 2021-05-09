import axios from "axios";

const instance = axios.create({
	baseURL: "https://eonet.sci.gsfc.nasa.gov/api/v3/events",
});

export default instance;
