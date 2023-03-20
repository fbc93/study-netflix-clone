import { useEffect, useState } from "react";
import { IGenreList, IVideos } from "./api";

//convert genreId to genreNm
export const convertGenreIdToNm = (genreArray: number[], media_type: string, TvGenreData: IGenreList[], MovieGenreData: IGenreList[]) => {
  const genre = [];
  const result = [];

  if (genreArray !== undefined) {
    for (let i = 0; i < genreArray.length; i++) {
      genre.push(genreArray[i]);

      for (let j = 0; j < genre.length; j++) {

        if (media_type as any === "tv") {
          for (let k = 0; k < TvGenreData?.length; k++) {
            if (genre[j] === TvGenreData[k].id) {
              genre[j] = TvGenreData[k].name;
              result.push(genre[j]);
            }
          }

        } else if (media_type as any === "movie") {
          for (let k = 0; k < MovieGenreData?.length; k++) {
            if (genre[j] === MovieGenreData[k].id) {
              genre[j] = MovieGenreData[k].name;
              result.push(genre[j]);
            }
          }
        }
      }
    }
  }
  return result;
}

//get random index of video
export function getRandomVideoData(movieVideoD: IVideos) {
  const results = movieVideoD?.results;

  if (results?.length > 1) {
    const min = 1;
    const max = results?.length;
    const idx = Math.floor((Math.random() * (max - min)) + min);
    const result = movieVideoD?.results[idx]?.key;
    return result;

  } else if (results?.length === 1) {
    const result = movieVideoD?.results[0]?.key;
    return result;
  }
}

//size: original Or w500
export function setImagePathSize(size: string, path: string) {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

//get current window width
function getInnerWindowValue() {
  const { innerWidth: width } = window;
  return width;
}

function useCurrentWindowWidth() {
  const [currentWidth, setCurrentWidth] = useState(getInnerWindowValue());

  useEffect(() => {
    function handleResize() {
      setCurrentWidth(getInnerWindowValue());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return currentWidth;
}

export default useCurrentWindowWidth;