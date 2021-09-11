import "./App.css";
import requests from "./requests";
import netflix from "./img/netflix_animation.gif";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";

function App() {
  const [showNetflixLogo, setShowNetflixLogo] = useState(true);
  useEffect(() => {
    if (showNetflixLogo) {
      setTimeout(() => {
        setShowNetflixLogo(false);
      }, [2810]);
    }
  });

  return (
    <div className="App">
      {showNetflixLogo ? (
        <img className="start__animation" src={netflix} alt="" />
      ) : (
        <>
          <Nav />
          <Banner />
          <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </>
      )}
    </div>
  );
}

export default App;
