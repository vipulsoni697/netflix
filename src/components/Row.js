import React, { useState, useEffect } from "react";
import axios from "../axios"; //as we have given default export as can import with any name
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      let request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //whenever we use any variable thats coming from outside and is being used in     useEffect, we have to include it in dependency array

  const opts = {
    height: "390",
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
          const vId = urlParams.get("v"); //to get video id
          setTrailerUrl(vId);
        })
        .catch((error) => console.log(error)); //if url not found then app doesnt crashes
    }
  }

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => {
                handleClick(movie);
              }}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
export default Row;
