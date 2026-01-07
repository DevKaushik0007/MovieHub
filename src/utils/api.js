import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,   // MUST be capital Bearer
    "Content-Type": "application/json",
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
   headers,
   params: {
      language: "en-US",
      page: 1,
      ...params,
   },
});

        return data;
    } catch (err) {
        console.error("TMDB API Error:", err.response?.data || err.message);
        throw err; // important
    }
};
