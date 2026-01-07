import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const mapEndpoint = (url) => {
    const clean = url.trim();

    if (clean === "upcoming") return "/movie/upcoming";
    if (clean === "popular") return "/movie/popular";
    if (clean === "top_rated") return "/movie/top_rated";
    if (clean === "day") return "/trending/movie/day";
    if (clean === "week") return "/trending/movie/week";

    return clean.startsWith("/") ? clean : "/" + clean;
};

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const finalUrl = mapEndpoint(url);

        fetchDataFromApi(finalUrl)
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load data");
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
