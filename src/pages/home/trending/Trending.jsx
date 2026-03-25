import React, { useState } from 'react';
import dayjs from "dayjs";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';

import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const [filter, setFilter] = useState("");

    const onTabChange = (tab) => {
        if (tab === "Day") {
            setEndpoint("day");
            setFilter("");
        } else if (tab === "Week") {
            setEndpoint("week");
            setFilter("");
        } else if (tab === "Month") {
            setEndpoint("week"); // Default fallback for Carousel navigation
            setFilter("month");
        }
    };

    let fetchUrl = `/trending/all/${endpoint}`;
    if (filter === "month") {
        fetchUrl = `/discover/movie?sort_by=popularity.desc&primary_release_date.gte=${dayjs().subtract(1, 'month').format('YYYY-MM-DD')}`;
    }

    const { data, loading } = useFetch(fetchUrl);



  return(
     <div className='carouselSection'>
    <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week", "Month"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
        </div>
  );
};

export default Trending;