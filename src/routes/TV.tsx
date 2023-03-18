import { useQuery } from "react-query";
import { fetchAiringTodays, fetchLatestTVs, fetchPopularTVs, fetchTopRatedTVs } from "../api";

function TV() {
  //Latest shows
  //Airing today
  //Popular
  //Top Rated
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

  //console.log(topRatedD)
  return (
    <div>TV</div>
  )
}

export default TV;