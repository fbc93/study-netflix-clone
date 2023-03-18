import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchLatestMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "../api";
import VisualBanner from "../components/VisualBanner";

const Wrapper = styled(motion.div)``;

function Home() {
  //Latest movies
  //Top Rated movies
  //Upcoming movies
  const { data: latestD, isLoading: latestL } = useQuery(
    "latest_movie", fetchLatestMovies
  );

  const { data: topRatedD, isLoading: topRatedL } = useQuery(
    "topRated_movie", fetchTopRatedMovies
  );

  const { data: upcomingD, isLoading: upcomingL } = useQuery(
    "upcoming_movie", fetchUpcomingMovies
  );

  //console.log(upcomingD);
  return (
    <Wrapper>
      <VisualBanner />
    </Wrapper>
  )
}

export default Home;