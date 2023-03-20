import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchAiringTodays, fetchLatestTVs, fetchMovieGenres, fetchMovieVideos, fetchPopularTVs, fetchTopRatedTVs, fetchTVGenres, fetchTvVideos, ILatestSlider, IVisualBanner } from "../api";
import { getRandomVideoData } from "../utils";
import ErrorSlider from "./Components/Error/ErrorSlider";
import ErrorVisualBanner from "./Components/Error/ErrorVisualBanner";
import LatestSlider from "./Components/LatestSlider";
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
        {topRatedD ?
          <VisualBanner
            media_type="tv"
            data={topRatedD as IVisualBanner}
            isLoading={topRatedL as boolean}
            MGenre={MovieGenreData as any[]}
            TGenre={TvGenreData as any[]}
            videoType={tvUrl}
          /> :
          <ErrorVisualBanner dataName="topRated" />
        }
        {topRatedD ?
          <Slider
            media_type="tv"
            title="🏆 TOP Rated TV Series"
            data={topRatedD as IVisualBanner}
            isLoading={topRatedL as boolean}
          /> :
          <ErrorSlider dataName="topRated" />
        }
        {popularD ?
          <Slider
            media_type="tv"
            title="👀 Popular Series"
            data={popularD as IVisualBanner}
            isLoading={popularL as boolean}
          /> :
          <ErrorSlider dataName="popular" />
        }
        {airtodayD ?
          <Slider
            media_type="tv"
            title="📺 Airing Today!"
            data={airtodayD as IVisualBanner}
            isLoading={airtodayL as boolean}
          /> :
          <ErrorSlider dataName="popular" />
        }
        {latestD ?
          <LatestSlider
            media_type="tv"
            title="📌 Latest TV Series"
            data={latestD as ILatestSlider}
            isLoading={latestL as boolean}
          /> :
          <ErrorSlider dataName="popular" />
        }
      </Wrapper>
      {/* <Modal /> */}
    </>
  )
}

export default TV;