import axios from "axios";
import {
  HomeResponse,
  ListResponse,
  SearchResponse,
  AnimeDetailResponse,
  EpisodeDetailResponse,
} from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export class AnimeAPI {
  static async getHome(): Promise<HomeResponse> {
    const response = await apiClient.get("/");
    return response.data;
  }

  static async getOngoingAnime(page: number = 1): Promise<ListResponse> {
    const response = await apiClient.get(`/ongoing-anime/page/${page}`);
    return response.data;
  }

  static async getCompletedAnime(page: number = 1): Promise<ListResponse> {
    const response = await apiClient.get(`/complete-anime/page/${page}`);
    return response.data;
  }

  static async searchAnime(query: string): Promise<SearchResponse> {
    const response = await apiClient.get(`/?s=${encodeURIComponent(query)}&post_type=anime`);
    return response.data;
  }

  static async getAnimeDetail(slug: string): Promise<AnimeDetailResponse> {
    const response = await apiClient.get(`/anime/${slug}`);
    return response.data;
  }

  static async getEpisodeDetail(slug: string): Promise<EpisodeDetailResponse> {
    const response = await apiClient.get(`/episode/${slug}`);
    return response.data;
  }
}

export default apiClient;
