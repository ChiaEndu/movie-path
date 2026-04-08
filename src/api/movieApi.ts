import axios from "axios";
import { config } from "../config/config";

export const fetchPopular = async () => {
  const res = await axios.get(`${config.BASE_URL}/movie/popular`, {
    params: { api_key: config.API_KEY },
  });
  return res.data.results;
};

export const fetchMovies = async (query: string) => {
  const res = await axios.get(`${config.BASE_URL}/search/movie`, {
    params: { api_key: config.API_KEY, query },
  });
  return res.data.results;
};

export const fetchMovieDetails = async (id: string) => {
  const res = await axios.get(`${config.BASE_URL}/movie/${id}`, {
    params: { api_key: config.API_KEY },
  });
  return res.data;
};