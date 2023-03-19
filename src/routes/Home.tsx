import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchLatestMovies, fetchMovieGenres, fetchNowPlayingMovies, fetchTopRatedMovies, fetchTVGenres, fetchUpcomingMovies, IGenreList, INowPlayingMovie, IVisualBanner } from "../api";
import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import Slider from "./Components/Slider";
import VisualBanner from "./Components/VisualBanner";

const Wrapper = styled.main``;

function Home() {
  //DATA
  const { data: nowPlayingD, isLoading: nowPlayingL } = useQuery(
    "now_playing", fetchNowPlayingMovies
  );

  const { data: latestD, isLoading: latestL } = useQuery(
    "latest_movie", fetchLatestMovies
  );

  const { data: topRatedD, isLoading: topRatedL } = useQuery(
    "topRated_movie", fetchTopRatedMovies
  );

  const { data: upcomingD, isLoading: upcomingL } = useQuery(
    "upcoming_movie", fetchUpcomingMovies
  );

  const { data: movieGenreD, isLoading: movieGenreL } = useQuery(
    "movie_genre", fetchMovieGenres
  );

  const { data: tvGenreD, isLoading: tvGenreL } = useQuery(
    "tv_genre", fetchTVGenres
  );

  const TvGenreData = tvGenreD?.genres;
  const MovieGenreData = movieGenreD?.genres;

  //refresh
  // let location = useLocation();
  // let currentPath = "";

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  //console.log(useLocation().pathname)


  // useEffect(() => {
  //   console.log('match')
  // }, []);



  return (
    <>
      <Wrapper>
        {nowPlayingD && (
          <VisualBanner
            media_type="movie"
            data={nowPlayingD as IVisualBanner}
            isLoading={nowPlayingL as boolean}
            MGenre={MovieGenreData as IGenreList[]}
            TGenre={TvGenreData as IGenreList[]}
          />
        )}
        <Slider title="latest" />
        <Slider title="top rated" />
        <Slider title="upcoming" />
      </Wrapper>
      <Modal />
    </>
  )
}

export default Home;