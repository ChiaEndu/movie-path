import axios from "axios";
import { config } from "../config/config";

export const fetchPopular = async (page = 1) => {
  const res = await axios.get(`${config.BASE_URL}/movie/popular`, {
    params: {
      api_key: config.API_KEY,
      page,
    },
  });
  return res.data;
};

export const fetchMovies = async (query: string, page = 1) => {
  const res = await axios.get(`${config.BASE_URL}/search/movie`, {
    params: {
      api_key: config.API_KEY,
      query,
      page,
    },
  });
  return res.data;
};

export const fetchMovieDetails = async (id: string) => {
  const res = await axios.get(`${config.BASE_URL}/movie/${id}`, {
    params: { api_key: config.API_KEY },
  });
  return res.data;
};

export const fetchGenres = async () => {
  const res = await axios.get(`${config.BASE_URL}/genre/movie/list`, {
    params: { api_key: config.API_KEY },
  });
  return res.data.genres;
};

