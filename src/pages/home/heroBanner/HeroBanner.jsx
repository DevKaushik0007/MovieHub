import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackfround] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    const {data, loading} = useFetch("/movie/upcoming");
    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackfround(bg);
    }, [data])

    const searchQueryHandler = (event) =>{
        if(event.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`);
        }
    };
  return (
    <div className="heroBanner">
       { !loading && <div className="backdrop-img">
            <Img src={"https://img.freepik.com/free-photo/family-bonding-watching-movie-together-theater-generated-by-ai_188544-32985.jpg?t=st=1696506223~exp=1696509823~hmac=4cb83ef6293d102300c115db71ce68a03dae7b4bcfabfeb4bf0650b600dc7d98&w=1060" }/>
        </div>}

        <div className="opacity-layer"></div>

        <ContentWrapper>
            <div className="heroBannerContent">
              <span className="title">Welcome to Moviz</span>
              <span className="subTitle">
              </span>
              <div className="searchInput">
                <input type="text"
                placeholder="Search for a movie or tv show..." 
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}/>
                <button>Search</button>
              </div>
            </div>
        </ContentWrapper>

    </div>
  )
}

export default HeroBanner;