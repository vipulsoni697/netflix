import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      let request = await axios.get(requests.fetchTrending);
      let bannerMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ];
      setMovie(bannerMovie);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    if (undefined !== str && str.length)
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = {
    height: "310",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters,
      autoplay: 1,
    },
  };

  function handleClick(movie) {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || movie.title || movie.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const vId = urlParams.get("v");
          setTrailerUrl(vId);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${base_url}${movie.backdrop_path})`,
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => {
                handleClick(movie);
              }}>Play</button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {truncate(movie.overview, 150)}
          </h1>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </>
  );
}
export default Banner;
