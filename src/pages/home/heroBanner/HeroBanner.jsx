import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import axios from "axios";

const HeroBanner = () => {
    const [backgrounds, setBackgrounds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Store suggestions
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    const { data, loading } = useFetch("/movie/upcoming");

    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTk5ZDgyZDU2NjA1MTkzM2Q0N2FjOTc5NmVlNjgyMSIsInN1YiI6IjY0ZWIzMzA4YzNjODkxMDBjNjgzOTU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GunimIfQGSOBb4FlIwrUu3QNaJp07d2mq0fEuqpB3no";
    const TMDB_BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        if (!loading && data && data.results) {
            // Shuffle the array to ensure random order
            const shuffledResults = [...data.results].sort(() => Math.random() - 0.5);
            setBackgrounds(shuffledResults.map(item => url.backdrop + item?.backdrop_path));

            // Start the image transition interval
            const intervalId = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % shuffledResults.length);
            }, 7000); // 7 seconds for the image transition

            return () => clearInterval(intervalId); // Cleanup interval on unmount
        }
    }, [data, loading, url.backdrop]);

    useEffect(() => {
        if (backgrounds.length > 0) {
            // To handle transition effect smoothly
            const timer = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
            }, 7000); // Match with the interval time

            return () => clearTimeout(timer);
        }
    }, [currentIndex, backgrounds]);

    // Fetch suggestions based on the search query
    const fetchSuggestions = async (query) => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                },
                params: {
                    query,
                },
            });

            setSuggestions(response.data.results || []);
        } catch (error) {
            console.error("Error fetching search suggestions:", error);
        }
    };

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        } else {
            fetchSuggestions(query); // Fetch suggestions as the user types
        }
    };

    return (
        <div className="heroBanner">
            {!loading && backgrounds.length > 0 && (
                <div className="backdrop-img" style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}>
                    {/* Placeholder for the current background */}
                </div>
            )}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome to MovieHub</span>
                    <span className="subTitle"></span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                        {/* Suggestions dropdown */}
                        {/* {suggestions.length > 0 && (
                            <ul className="suggestionsList">
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.id}
                                        onClick={() => navigate(`/movie/${suggestion.id}`)}
                                    >
                                        {suggestion.title}
                                    </li>
                                ))}
                            </ul>
                        )} */}


{suggestions.length > 0 && (
    <ul className="suggestionsList">
        {suggestions.map((suggestion) => (
            <li
                key={suggestion.id}
                className="suggestionItem"
                onClick={() => navigate(`/movie/${suggestion.id}`)}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w200${suggestion.poster_path}`}
                    alt={suggestion.title}
                    className="suggestionImage"
                />
                <span className="suggestionText">{suggestion.title}</span>
            </li>
        ))}
    </ul>
)}



                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
