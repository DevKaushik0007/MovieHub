import React,{useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';

import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import "./style.scss"




const AiringToday = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const {data, loading } = useFetch(`/${endpoint}/airing_today
    `);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    };

  return(
     <div className='carouselSection'>
    <ContentWrapper>
        <span className="carouselTitle">Ariring Today </span>
        <SwitchTabs data={["TV Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}
        endpoint={endpoint} />
        </div>
  );
};

export default AiringToday;