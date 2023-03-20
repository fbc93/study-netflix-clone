import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchLatestMovies, fetchMovieGenres, fetchMovieVideos, fetchNowPlayingMovies, fetchTopRatedMovies, fetchTVGenres, fetchTvVideos, fetchUpcomingMovies, IGenreList, ILatestSlider, INowPlayingMovie, IVisualBanner } from "../api";
import { getRandomVideoData } from "../utils";
import ErrorSlider from "./Components/Error/ErrorSlider";
import ErrorVisualBanner from "./Components/Error/ErrorVisualBanner";
import LatestSlider from "./Components/LatestSlider";

import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import Slider from "./Components/Slider";
import VisualBanner from "./Components/VisualBanner";

const Wrapper = styled(motion.main)``;

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

  const { data: movieGenreD } = useQuery(
    "movie_genre", fetchMovieGenres
  );

  const { data: tvGenreD } = useQuery(
    "tv_genre", fetchTVGenres
  );

  const wrapperVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
    }
  }

  const TvGenreData = tvGenreD?.genres;
  const MovieGenreData = movieGenreD?.genres;
  const movieUrl = "movie";

  return (
    <>
      <Wrapper
        variants={wrapperVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 1 }}
      >
        {nowPlayingD ?
          <VisualBanner
            media_type="movie"
            data={nowPlayingD as IVisualBanner}
            isLoading={nowPlayingL as boolean}
            MGenre={MovieGenreData as IGenreList[]}
            TGenre={TvGenreData as IGenreList[]}
            videoType={movieUrl}
          /> :
          <ErrorVisualBanner dataName="nowPlaying" />
        }
        {nowPlayingD ?
          <Slider
            media_type="movie"
            title="🔥 NOW Playing Movies"
            data={nowPlayingD as IVisualBanner}
            isLoading={nowPlayingL as boolean}
          /> :
          <ErrorSlider dataName="nowPlaying" />
        }
        {upcomingD ?
          <Slider
            media_type="movie"
            title="📆 Upcoming Movies"
            data={upcomingD as IVisualBanner}
            isLoading={upcomingL as boolean}
          /> :
          <ErrorSlider dataName="upcoming" />
        }
        {topRatedD ?
          <Slider
            media_type="movie"
            title="🏆 TOP Rated Movies"
            data={topRatedD as IVisualBanner}
            isLoading={topRatedL as boolean}
          /> :
          <ErrorSlider dataName="topRated" />
        }
        {latestD ?
          <LatestSlider
            media_type="movie"
            title="📌 Latest Movies"
            data={latestD as ILatestSlider}
            isLoading={latestL as boolean}
          /> :
          <ErrorSlider dataName="latest" />
        }
      </Wrapper>
      {/* <Modal /> */}
    </>
  )
}

export default Home;