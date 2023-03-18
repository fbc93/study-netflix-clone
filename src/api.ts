const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;
const LANGUAGE_CODE = "ko-KR";

export function fetchLatestMovies() {
  return fetch(`${BASE_URL}/movie/latest?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchTopRatedMovies() {
  return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchUpcomingMovies() {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchLatestTVs() {
  return fetch(`${BASE_URL}/tv/latest?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchAiringTodays() {
  return fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchPopularTVs() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchTopRatedTVs() {
  return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchSearch(SEARCH_WORD: string) {
  return fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=${LANGUAGE_CODE}&query=${SEARCH_WORD}&include_adult=false`)
    .then((res) => res.json());
}