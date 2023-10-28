import React from 'react'
import "./style.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import AiringToday from './airingtoday/Airingtoday';
import New from './latest/New';




const Home = () => {
  return (
    <div className='homePage'>
        <HeroBanner/>
        <Trending />
        <Popular />
        <TopRated />
        < AiringToday />
    < New/>
    
        {/* <div style={{height: 1000}}></div> */}
    </div>
  );
};

export default Home