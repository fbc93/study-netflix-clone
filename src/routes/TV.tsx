import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchAiringTodays, fetchLatestTVs, fetchMovieGenres, fetchMovieVideos, fetchPopularTVs, fetchTopRatedTVs, fetchTVGenres, fetchTvVideos, IVisualBanner } from "../api";
import { getRandomVideoData } from "../utils";
import Modal from "./Components/Modal";
import Slider from "./Components/Slider";
import VisualBanner from "./Components/VisualBanner";

const Wrapper = styled.main``;

function TV() {
  //DATA
  const { data: topRatedD, isLoading: topRatedL } = useQuery(
    "topRated_tv", fetchTopRatedTVs
  );

  const { data: latestD, isLoading: latestL } = useQuery(
    "latest_tv", fetchLatestTVs
  );

  const { data: airtodayD, isLoading: airtodayL } = useQuery(
    "airtoday_tv", fetchAiringTodays
  );

  const { data: popularD, isLoading: popularL } = useQuery(
    "popular_tv", fetchPopularTVs
  );

  const { data: movieGenreD, isLoading: movieGenreL } = useQuery(
    "movie_genre", fetchMovieGenres
  );

  const { data: tvGenreD, isLoading: tvGenreL } = useQuery(
    "tv_genre", fetchTVGenres
  );

  const TvGenreData = tvGenreD?.genres;
  const MovieGenreData = movieGenreD?.genres;
  const tvUrl = "tv";

  return (
    <>
      <Wrapper>
        {topRatedD && (
          <VisualBanner
            media_type="tv"
            data={topRatedD as IVisualBanner}
            isLoading={topRatedL as boolean}
            MGenre={MovieGenreData as any[]}
            TGenre={TvGenreData as any[]}
            videoType={tvUrl}
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