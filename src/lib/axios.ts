import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
//https://netherops.orchfr.duckdns.org/api/
//http://localhost:3000/api/
export default api;
