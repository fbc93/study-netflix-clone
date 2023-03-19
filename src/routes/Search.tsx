import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchSearch, INowPlayingMovie } from "../api";
import Slider from "./Components/Slider";

const Wrapper = styled.main``;

function Search() {
  //Search
  const { data: searchD, isLoading: searchL } = useQuery(
    "search_multi", () => fetchSearch("harry potter")
  );

  //console.log(searchD)

  return (
    <Wrapper>
      <Slider title="movie" />
      <Slider title="tv" />
      <Slider title="people" />
    </Wrapper>
  )
}

export default Search;