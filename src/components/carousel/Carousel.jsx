import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    // Navigation for left and right scrolling
    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    // Loading skeleton item (for visual while data is fetching)
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                {/* Left and right navigation arrows */}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")}
                />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.length ? (
                            data.map((item) => {
                                const posterUrl = item.poster_path
                                    ? url.poster + item.poster_path
                                    : PosterFallback;
                                const voteAverage = item.vote_average
                                    ? item.vote_average.toFixed(1)
                                    : "N/A";
                                const genreIds = item.genre_ids?.slice(0, 2) || [];
                                const releaseDate = item.release_date
                                    ? dayjs(item.release_date).format("D MMM, YYYY")
                                    : "Unknown Date";

                                return (
                                    <div
                                        key={item.id}
                                        className="carouselItem"
                                        onClick={() =>
                                            navigate(
                                                `/${item.media_type || endpoint}/${item.id}`
                                            )
                                        }
                                    >
                                        <div className="posterBlock">
                                            <Img src={posterUrl} />
                                            {item.vote_average && (
                                                <CircleRating rating={voteAverage} />
                                            )}
                                            {genreIds.length > 0 && (
                                                <Genres data={genreIds} />
                                            )}
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {item.title || item.name || "Unknown Title"}
                                            </span>
                                            <span className="date">{releaseDate}</span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
