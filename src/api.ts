const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;
const LANGUAGE_CODE = "ko-KR";

export function fetchNowPlayingMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

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

//movie video
export function fetchMovieVideos(MOVIE_ID: number) {
  return fetch(`${BASE_URL}/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`).then((res) => res.json());
}

//tv video
export function fetchTvVideos(TV_ID: number) {
  return fetch(`${BASE_URL}/tv/${TV_ID}/videos?api_key=${API_KEY}`).then((res) => res.json());
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

export function fetchSearch(KEY_WORD: string) {
  return fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=${LANGUAGE_CODE}&query=${KEY_WORD}&include_adult=false`)
    .then((res) => res.json());
}

export function fetchMovieGenres() {
  return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

export function fetchTVGenres() {
  return fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

interface IVideo {
  key: string;
}

export interface IVideos {
  results: IVideo[];
}

export interface IGenreList {
  id: number;
  name: string;
}

interface IDates {
  maximum: string;
  minimum: string;
}
export interface IVisualBanner {
  dates: IDates;
  results: INowPlayingMovie[];
  genres: number[];
}
export interface INowPlayingMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  name: string;
  original_name: string;
}

export interface ILatestSlider {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  status: string;
  title: string;
  poster_path: string;
  name: string;
}