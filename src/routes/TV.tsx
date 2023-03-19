import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchAiringTodays, fetchLatestTVs, fetchMovieGenres, fetchPopularTVs, fetchTopRatedTVs, fetchTVGenres, IVisualBanner } from "../api";
import Modal from "./Components/Modal";
import Slider from "./Components/Slider";
import VisualBanner from "./Components/VisualBanner";

const Wrapper = styled.main``;

function TV() {
  //Latest TVs
  //Airing today TVs
  //Popular TVs
  //Top Rated TVs
  const { data: latestD, isLoading: latestL } = useQuery(
    "latest_tv", fetchLatestTVs
  );

  const { data: airtodayD, isLoading: airtodayL } = useQuery(
    "airtoday_tv", fetchAiringTodays
  );

  const { data: popularD, isLoading: popularL } = useQuery(
    "popular_tv", fetchPopularTVs
  );

  const { data: topRatedD, isLoading: topRatedL } = useQuery(
    "topRated_tv", fetchTopRatedTVs
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
  // let currentPath = "/tv";

  // useEffect(() => {
  //   if (currentPath === location.pathname) window.location.reload();
  //   currentPath = location.pathname;
  // }, [location]);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  useEffect(() => {
    console.log('match222')
  }, []);

  return (
    <>
      <Wrapper>
        {topRatedD && (
          <VisualBanner
            media_type="tv"
            data={topRatedD as IVisualBanner}
            isLoading={latestL as boolean}
            MGenre={MovieGenreData as any[]}
            TGenre={TvGenreData as any[]}
          />
        )}
        <Slider title="TV latest" />
        <Slider title="TV air today" />
        <Slider title="TV popular" />
      </Wrapper>
      <Modal />
    </>
  )
}

export default TV;