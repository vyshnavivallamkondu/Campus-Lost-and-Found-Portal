import axios from "axios";

const BASE_URL = "http://localhost:9999";
const SEARCH_BASE = `${BASE_URL}/lost-found/api/search`;

export const searchLostItems = (query) => {
  return axios.get(`${SEARCH_BASE}/lost`, { params: { q: query } });
};

export const searchFoundItems = (query) => {
  return axios.get(`${SEARCH_BASE}/found`, { params: { q: query } });
};
