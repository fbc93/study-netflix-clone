import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { fetchSearch, ISearch } from "../api";
import SearchSlider from "./Components/SearchSlider";

const HeaderArea = styled.div`
  width:100%;
  padding-top:7rem;
  height: 20vw;
  padding:7rem 4% 0 4%;
  display: flex;

  h1 {
    font-size: 4vw;
    align-self: center;
  }
`;

const Wrapper = styled(motion.main)`
  margin:3rem 0 0 0;
`;

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { data: searchD, isLoading: searchL } = useQuery(
    ["search", keyword],
    () => fetchSearch(keyword as string)
  );

  const moviesArr = searchD?.results.filter((item: any) => item.media_type === "movie" && item.adult === false);
  const tvArr = searchD?.results.filter((item: any) => item.media_type === "tv" && item.adult === false);
  const personArr = searchD?.results.filter((item: any) => item.media_type === "person" && item.adult === false);

  return (
    <>
      <HeaderArea>
        <h1>🔎 Search Movies OR TV Series</h1>
        <h1>_results ...{searchD?.results.length}</h1>
      </HeaderArea>
      <Wrapper key={keyword} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>

        {moviesArr?.length > 0 ? (
          <SearchSlider
            media_type={"movie" as string}
            title="🎬 Movies"
            count={moviesArr.length as number}
            data={moviesArr as ISearch[]}
            isLoading={searchL as boolean}
          />
        ) : null}

        {tvArr?.length > 0 ? (
          <SearchSlider
            media_type={"tv" as string}
            title="📺 TV Series"
            count={tvArr.length as number}
            data={tvArr as ISearch[]}
            isLoading={searchL as boolean}
          />
        ) : null}

        {personArr?.length > 0 ? (
          <SearchSlider
            media_type={"person" as string}
            title="👨‍👩‍👧‍👧 Person"
            count={personArr.length as number}
            data={personArr as ISearch[]}
            isLoading={searchL as boolean}
          />
        ) : null}

      </Wrapper>
    </>
  )
}

export default Search;