import React,{useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';

import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';




const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const [filter, setFilter] = useState("");

    const onTabChange = (tab) => {
        if (tab === "Movies") {
            setEndpoint("movie");
            setFilter("");
        } else if (tab === "TV Shows") {
            setEndpoint("tv");
            setFilter("");
        } else if (tab === "Cartoons") {
            setEndpoint("tv");
            setFilter("cartoon");
        }
    };

    const fetchUrl = filter === "cartoon" 
        ? `/discover/tv?with_genres=16` 
        : `/${endpoint}/top_rated`;

    const { data, loading } = useFetch(fetchUrl);

  return(
     <div className='carouselSection'>
    <ContentWrapper>
        <span className="carouselTitle">Top Rated </span>
        <SwitchTabs data={["Movies", "TV Shows", "Cartoons"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}
        endpoint={endpoint} />
        </div>
  );
};

export default TopRated;