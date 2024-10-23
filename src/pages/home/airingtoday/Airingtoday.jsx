import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch'; // Assuming you have a custom hook
import Carousel from '../../../components/carousel/Carousel';
import "./style.scss";

const AiringToday = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading, error } = useFetch(`/${endpoint}/airing_today`);

    useEffect(() => {
        // Fetch data when the component mounts or endpoint changes
        if (!loading && !error && data) {
            console.log('Data fetched:', data); // Debugging information
        }
    }, [loading, error, data]);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    };

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Airing Today</span>
                <SwitchTabs data={["Movie", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results || []} loading={loading} endpoint={endpoint} />
            {error && <p className="error">Error fetching data: {error.message}</p>}
        </div>
    );
};

export default AiringToday;
