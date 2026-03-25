import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import axios from "axios";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import ReactPlayer from "react-player/youtube";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { url } = useSelector((state) => state.home);
    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");

    const VITE_APP_TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTk5ZDgyZDU2NjA1MTkzM2Q0N2FjOTc5NmVlNjgyMSIsInN1YiI6IjY0ZWIzMzA4YzNjODkxMDBjNjgzOTU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GunimIfQGSOBb4FlIwrUu3QNaJp07d2mq0fEuqpB3no";

    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/images`, {
                    headers: {
                        Authorization: `Bearer ${VITE_APP_TMDB_TOKEN}`,
                    },
                });
                setScreenshots(response.data.backdrops.slice(0, 10)); // Fetch up to 10 diverse backdrops
            } catch (error) {
                console.error("Error fetching screenshots:", error);
            }
        };

        if (mediaType && id) {
            fetchScreenshots();
        }
    }, [id, mediaType]);

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem(`reviews_${mediaType}_${id}`)) || [];
        setReviews(storedReviews);
    }, [mediaType, id]);

    useEffect(() => {
        localStorage.setItem(`reviews_${mediaType}_${id}`, JSON.stringify(reviews));
    }, [reviews, mediaType, id]);

    const handleReviewSubmit = () => {
        if (newReview.trim() !== "") {
            setReviews([...reviews, newReview]);
            setNewReview("");
        }
    };

    const handleReviewDelete = (index) => {
        const updatedReviews = reviews.filter((_, i) => i !== index);
        setReviews(updatedReviews);
    };

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const watchLink = data?.homepage || `https://www.google.com/search?q=${encodeURIComponent((data?.title || data?.name) + " official website")}`;
    const hdhubLink = `https://new5.hdhub4u.fo/?s=${encodeURIComponent((data?.title || data?.name) + " " + dayjs(data?.release_date || data?.first_air_date).format("YYYY"))}&utm=mn`;

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img" style={{ overflow: "hidden", opacity: 1 }}>
                                <div style={{ 
                                    width: "100%", height: "100%", 
                                    opacity: isVideoPlaying ? 0 : 1, 
                                    transition: "opacity 1s ease-in-out" 
                                }}>
                                    <Img src={url.backdrop + data?.backdrop_path} />
                                </div>
                                {video?.key && (
                                    <div style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        opacity: isVideoPlaying ? 1 : 0,
                                        transition: "opacity 1s ease",
                                        pointerEvents: "none"
                                    }}>
                                            <ReactPlayer
                                                url={`https://www.youtube.com/watch?v=${video.key}?autoplay=1&mute=1&controls=0&playsinline=1`}
                                                playing={true}
                                                muted={true}
                                                controls={false}
                                                loop={true}
                                                width="100%"
                                                height="100%"
                                                onPlay={() => setIsVideoPlaying(true)}
                                                className="react-player-custom"
                                            config={{
                                                youtube: {
                                                    playerVars: {
                                                        autoplay: 1,
                                                        mute: 1,
                                                        controls: 0,
                                                        playsinline: 1,
                                                        loop: 1,
                                                        playlist: video.key,
                                                        modestbranding: 1
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className="posterImg" src={url.backdrop + data.poster_path} />
                                        ) : (
                                            <Img className="posterImg" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data?.name || data?.title} (${dayjs(data?.release_date || data?.first_air_date || new Date()).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">{data.tagline}</div>
                                        <Genres data={_genres} />
                                        <div className="row">
                                            <CircleRating rating={data?.vote_average?.toFixed(1) || "N/A"} />
                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{data.overview}</div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">Status: </span>
                                                    <span className="text">{data.status}</span>
                                                </div>
                                            )}
                                            {(data?.release_date || data?.first_air_date) && (
                                                <div className="infoItem">
                                                    <span className="text bold">Release Date: </span>
                                                    <span className="text">{dayjs(data?.release_date || data?.first_air_date).format("MMM D, YYYY")}</span>
                                                </div>
                                            )}
                                            {(data?.runtime || data?.episode_run_time?.[0]) && (
                                                <div className="infoItem">
                                                    <span className="text bold">Runtime: </span>
                                                    <span className="text">{toHoursAndMinutes(data?.runtime || data?.episode_run_time?.[0])}</span>
                                                </div>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Director: </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name} {director.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Writer: </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name} {writer.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Creator: </span>
                                                <span className="text">
                                                    {data?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name} {data?.created_by?.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Download Section */}
                                <div className="watchNowSection">
                                    <a
                                        className="watchNowButton"
                                        href={watchLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Watch Now
                                    </a>
                                    <a
                                        className="watchNowButton downloadBtn"
                                        href={hdhubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download [HDHub4U]
                                    </a>
                                </div>

                                {/* Screenshots Section */}
                                <div className="screenshotsSection">
                                    <h2 className="sectionTitle">Movie Gallery</h2>
                                    <div className="screenshotsWrapper">
                                        {screenshots.map((screenshot, index) => (
                                            <div key={index} className="screenshotItem">
                                                <Img src={url.backdrop + screenshot.file_path} alt={`Screenshot ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Review Section */}
                                <div className="reviewSection">
                                    <h2 className="sectionTitle">Leave a Review</h2>
                                    <textarea
                                        value={newReview}
                                        onChange={(e) => setNewReview(e.target.value)}
                                        placeholder="Write your review here..."
                                    ></textarea>
                                    <button onClick={handleReviewSubmit}>Submit Review</button>

                                    <div className="reviewList">
                                        {reviews.map((review, index) => (
                                            <div key={index} className="reviewItem">
                                                <span>{review}</span>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleReviewDelete(index)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                    <VideoPopup show={show} setShow={setShow} videoId={videoId} />
                </>
            ) : (
                <div className="loading">Loading...</div>
            )}
        </div>
    );
};

export default DetailsBanner;
