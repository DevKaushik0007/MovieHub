import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError("Failed to load data");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
