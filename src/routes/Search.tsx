import { useQuery } from "react-query";
import { fetchSearch } from "../api";

function Search() {
  //Search
  const { data: searchD, isLoading: searchL } = useQuery(
    "search_multi", () => fetchSearch("harry potter")
  );

  //console.log(searchD)

  return (
    <div>Search</div>
  )
}

export default Search;