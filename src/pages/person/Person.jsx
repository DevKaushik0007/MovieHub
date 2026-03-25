import React from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import avatar from "../../assets/avatar.png";

const Person = () => {
    const { id } = useParams();
    const { data, loading } = useFetch(`/person/${id}`);
    const { data: creditsData } = useFetch(`/person/${id}/combined_credits`);
    const { url } = useSelector((state) => state.home);

    if (loading) return <Spinner initial={true} />;

    return (
        <div className="personPage">
            <ContentWrapper>
                {data && (
                    <div className="personInfo">
                        <div className="left">
                            <Img
                                src={data.profile_path ? url.profile + data.profile_path : avatar}
                                className="profileImg"
                            />
                        </div>
                        <div className="right">
                            <h1 className="name">{data.name}</h1>
                            <div className="bio">
                                <h3>Biography</h3>
                                <p>{data.biography || "No biography available for this actor."}</p>
                            </div>
                            <div className="infoGrid">
                                {data.known_for_department && (
                                    <div className="infoItem">
                                        <span className="bold">Known For: </span>
                                        <span>{data.known_for_department}</span>
                                    </div>
                                )}
                                {data.birthday && (
                                    <div className="infoItem">
                                        <span className="bold">Born: </span>
                                        <span>{dayjs(data.birthday).format("MMM D, YYYY")}</span>
                                    </div>
                                )}
                                {data.place_of_birth && (
                                    <div className="infoItem">
                                        <span className="bold">Place of Birth: </span>
                                        <span>{data.place_of_birth}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {creditsData?.cast?.length > 0 && (
                    <div className="knownFor">
                        <h2>Known For</h2>
                        <div className="moviesGrid">
                            {creditsData.cast
                                .sort((a, b) => b.popularity - a.popularity)
                                .slice(0, 20)
                                .map((item, index) => {
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={item.media_type}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Person;
