import React,{useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';

import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import "./style.scss"




const Upcoming = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const {data, loading } = useFetch(`/${endpoint}/upcoming    
    `);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

  return(
     <div className='carouselSection'>
    <ContentWrapper>
        <span className="carouselTitle">Upcoming Movies </span>
        <SwitchTabs data={["Movies",]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}
        endpoint={endpoint} />
        </div>
  );
};

export default Upcoming;