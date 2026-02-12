import axios from "axios";
import {
  HomeResponse,
  ListResponse,
  SearchResponse,
  AnimeDetailResponse,
  EpisodeDetailResponse,
  WajikResponse,
  WajikHomeData,
  WajikOngoingAnimeCard,
  WajikCompletedAnimeCard,
  WajikSearchedAnimeCard,
  WajikAnimeDetails,
  WajikEpisodeDetails,
  WajikPagination,
  AnimeItem,
  PaginationInfo,
  Mirror,
  Download,
  Episode,
} from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: convert wajik pagination to internal pagination format
function toInternalPagination(
  p: WajikPagination | null
): PaginationInfo | undefined {
  if (!p) return undefined;
  const pages: number[] = [];
  if (p.totalPages) {
    for (let i = 1; i <= p.totalPages; i++) {
      pages.push(i);
    }
  } else if (p.currentPage) {
    pages.push(p.currentPage);
    if (p.nextPage) pages.push(p.nextPage);
  }
  return {
    available_pages: pages,
    next_page: p.hasNextPage && p.nextPage ? String(p.nextPage) : null,
  };
}

// Helper: map ongoing anime card to internal AnimeItem
function mapOngoingCard(card: WajikOngoingAnimeCard): AnimeItem {
  return {
    title: card.title,
    slug: card.animeId,
    episodeInfo: card.episodes,
    episode: card.episodes,
    day: card.releaseDay,
    date: card.latestReleaseDate,
    link: card.otakudesuUrl || "",
    thumbnail: card.poster,
    type: "ongoing",
  };
}

// Helper: map completed anime card to internal AnimeItem
function mapCompletedCard(card: WajikCompletedAnimeCard): AnimeItem {
  return {
    title: card.title,
    slug: card.animeId,
    episodeInfo: card.episodes,
    episode: card.episodes,
    date: card.lastReleaseDate,
    rating: card.score,
    link: card.otakudesuUrl || "",
    thumbnail: card.poster,
    type: "completed",
  };
}

// Helper: map searched anime card to internal AnimeItem
function mapSearchedCard(card: WajikSearchedAnimeCard): AnimeItem {
  return {
    title: card.title,
    slug: card.animeId,
    thumbnail: card.poster,
    link: card.otakudesuUrl || "",
    genres: card.genreList?.map((g) => g.title) || [],
    status: card.status,
    rating: card.score,
  };
}

export class AnimeAPI {
  static async getHome(): Promise<HomeResponse> {
    const response = await apiClient.get<WajikResponse<WajikHomeData>>(
      "/otakudesu/home"
    );
    const wajikData = response.data?.data;
    const ongoingList = wajikData?.ongoing?.animeList ?? [];
    const completedList = wajikData?.completed?.animeList ?? [];
    return {
      ongoing: {
        count: ongoingList.length,
        data: ongoingList.map(mapOngoingCard),
      },
      completed: {
        count: completedList.length,
        data: completedList.map(mapCompletedCard),
      },
    };
  }

  static async getOngoingAnime(page: number = 1): Promise<ListResponse> {
    const response = await apiClient.get<
      WajikResponse<{ animeList: WajikOngoingAnimeCard[] }>
    >("/otakudesu/ongoing", { params: { page } });
    const wajikData = response.data;
    const animeList = wajikData?.data?.animeList ?? [];
    return {
      success: wajikData.statusCode === 200,
      page: wajikData.pagination?.currentPage ?? page,
      total_data: animeList.length,
      pagination: toInternalPagination(wajikData.pagination),
      data: animeList.map(mapOngoingCard),
    };
  }

  static async getCompletedAnime(page: number = 1): Promise<ListResponse> {
    const response = await apiClient.get<
      WajikResponse<{ animeList: WajikCompletedAnimeCard[] }>
    >("/otakudesu/completed", { params: { page } });
    const wajikData = response.data;
    const animeList = wajikData?.data?.animeList ?? [];
    return {
      success: wajikData.statusCode === 200,
      page: wajikData.pagination?.currentPage ?? page,
      total_data: animeList.length,
      pagination: toInternalPagination(wajikData.pagination),
      data: animeList.map(mapCompletedCard),
    };
  }

  static async searchAnime(query: string): Promise<SearchResponse> {
    const response = await apiClient.get<
      WajikResponse<{ animeList: WajikSearchedAnimeCard[] }>
    >("/otakudesu/search", { params: { q: query } });
    const wajikData = response.data;
    const animeList = wajikData?.data?.animeList ?? [];
    return {
      success: wajikData.statusCode === 200,
      total_data: animeList.length,
      data: animeList.map(mapSearchedCard),
    };
  }

  static async getAnimeDetail(slug: string): Promise<AnimeDetailResponse> {
    const response = await apiClient.get<
      WajikResponse<{ details: WajikAnimeDetails }>
    >(`/otakudesu/anime/${slug}`);
    const wajikData = response.data;
    const details = wajikData?.data?.details;
    if (!details) {
      return {
        success: false,
        data: {
          title: "",
          streaming_title: "",
          thumbnail: "",
          synopsis: "",
          info: {},
          episodes: [],
          rekomendasi: [],
        },
      };
    }

    const info: Record<string, string | string[]> = {};
    if (details.status) info.status = details.status;
    if (details.score) info.score = details.score;
    if (details.episodes) info.total_episode = details.episodes;
    if (details.duration) info.duration = details.duration;
    if (details.aired) info.released_on = details.aired;
    if (details.studios) info.studio = details.studios;
    if (details.type) info.type = details.type;
    if (details.producers) info.producers = details.producers;
    if (details.japanese) info.japanese = details.japanese;
    if (details.genreList?.length) {
      info.genres = details.genreList.map((g) => g.title);
    }

    return {
      success: wajikData.statusCode === 200,
      data: {
        title: details.title,
        streaming_title: details.japanese || "",
        thumbnail: details.poster,
        synopsis: details.synopsis?.paragraphList?.join("\n") || "",
        info,
        episodes: (details.episodeList ?? []).map((ep) => ({
          title: ep.title,
          link: ep.otakudesuUrl || "",
          slug: ep.episodeId,
        })),
        rekomendasi: (details.recommendedAnimeList ?? []).map((rec) => ({
          title: rec.title,
          link: rec.otakudesuUrl || "",
          slug: rec.animeId,
          thumbnail: rec.poster,
        })),
      },
    };
  }

  static async getEpisodeDetail(
    slug: string
  ): Promise<EpisodeDetailResponse> {
    const response = await apiClient.get<
      WajikResponse<{ details: WajikEpisodeDetails }>
    >(`/otakudesu/episode/${slug}`);
    const wajikData = response.data;
    const details = wajikData?.data?.details;
    if (!details) {
      return {
        success: false,
        data: {
          title: "",
          metadata: { author: "", release: "" },
          info: {},
          iframe: null,
          navigation: { previous: null, anime: null, next: null },
          episodes: [],
          mirrors: [],
          downloads: [],
        },
      };
    }

    // Build mirrors from server qualityList
    const mirrors: Mirror[] = [];
    if (details.server?.qualityList) {
      for (const quality of details.server.qualityList) {
        if (quality.serverList) {
          for (const server of quality.serverList) {
            mirrors.push({
              quality: quality.title,
              provider: server.title,
              serverId: server.serverId,
              url: null,
            });
          }
        }
      }
    }

    // Build downloads from download qualityList
    const downloads: Download[] = [];
    if (details.download?.qualityList) {
      for (const quality of details.download.qualityList) {
        downloads.push({
          quality: quality.title,
          size: quality.size,
          providers: (quality.urlList ?? []).map((u) => ({
            provider: u.title,
            url: u.url,
          })),
        });
      }
    }

    // Build episodes list
    const episodes: Episode[] = (details.info?.episodeList ?? []).map(
      (ep) => ({
        title: ep.title,
        link: ep.otakudesuUrl || "",
        slug: ep.episodeId,
      })
    );

    return {
      success: wajikData.statusCode === 200,
      data: {
        title: details.title,
        metadata: {
          author: details.info?.credit || "",
          release: details.releaseTime || "",
        },
        info: {
          duration: details.info?.duration || "",
          type: details.info?.type || "",
          encoder: details.info?.encoder || "",
          genres: details.info?.genreList?.map(
            (g: { title: string }) => g.title
          ),
        },
        iframe: details.defaultStreamingUrl || null,
        navigation: {
          previous: details.prevEpisode
            ? {
                url: details.prevEpisode.otakudesuUrl || "",
                slug: details.prevEpisode.episodeId,
              }
            : null,
          anime: details.animeId
            ? { url: "", slug: details.animeId }
            : null,
          next: details.nextEpisode
            ? {
                url: details.nextEpisode.otakudesuUrl || "",
                slug: details.nextEpisode.episodeId,
              }
            : null,
        },
        episodes,
        mirrors,
        downloads,
      },
    };
  }

  static async getServerUrl(serverId: string): Promise<string | null> {
    try {
      const response = await apiClient.get<
        WajikResponse<{ details: { url: string } }>
      >(`/otakudesu/server/${serverId}`);
      return response.data?.data?.details?.url || null;
    } catch {
      return null;
    }
  }
}

export default apiClient;
