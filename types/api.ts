// API Response Types for wajik-anime-api (otakudesu source)

// Internal types used by page components

export interface AnimeItem {
  title: string;
  slug: string;
  episodeInfo?: string;
  episode?: string;
  meta?: string;
  day?: string;
  date?: string;
  link: string;
  thumbnail: string;
  type?: string;
  genres?: string[];
  status?: string;
  rating?: string;
}

export interface PaginationInfo {
  available_pages: number[];
  next_page: string | null;
}

export interface ListResponse {
  success: boolean;
  page?: number;
  total_data: number;
  pagination?: PaginationInfo;
  data: AnimeItem[];
}

export interface HomeResponse {
  ongoing: {
    count: number;
    data: AnimeItem[];
  };
  completed: {
    count: number;
    data: AnimeItem[];
  };
}

export interface Episode {
  title: string;
  link: string;
  slug: string;
  release_date?: string;
  url?: string;
}

export interface RecommendedAnime {
  title: string;
  link: string;
  slug: string;
  thumbnail: string;
}

export interface AnimeDetail {
  title: string;
  streaming_title: string;
  thumbnail: string;
  synopsis: string;
  info: Record<string, string | string[]>;
  episodes: Episode[];
  rekomendasi: RecommendedAnime[];
}

export interface AnimeDetailResponse {
  success: boolean;
  data: AnimeDetail;
}

export interface Mirror {
  quality: string;
  provider: string;
  serverId: string;
  url?: string | null;
}

export interface DownloadProvider {
  provider: string;
  url: string;
}

export interface Download {
  quality: string;
  size?: string;
  providers: DownloadProvider[];
}

export interface NavigationLink {
  url: string;
  slug: string | null;
}

export interface EpisodeNavigation {
  previous: NavigationLink | null;
  anime: NavigationLink | null;
  next: NavigationLink | null;
}

export interface EpisodeDetail {
  title: string;
  metadata: {
    author: string;
    release: string;
  };
  info: Record<string, any>;
  iframe: string | null;
  navigation: EpisodeNavigation;
  episodes: Episode[];
  mirrors: Mirror[];
  downloads: Download[];
}

export interface EpisodeDetailResponse {
  success: boolean;
  data: EpisodeDetail;
}

export interface SearchResponse {
  success: boolean;
  total_data: number;
  data: AnimeItem[];
}

// Wajik-anime-api response wrapper types

export interface WajikResponse<T = Record<string, any>> {
  statusCode: number;
  statusMessage: string;
  message: string;
  data: T | null;
  pagination: WajikPagination | null;
}

export interface WajikPagination {
  currentPage: number | null;
  prevPage: number | null;
  hasPrevPage: boolean;
  nextPage: number | null;
  hasNextPage: boolean;
  totalPages: number | null;
}

// Wajik otakudesu-specific data types

export interface WajikTextCard {
  title: string;
  otakudesuUrl?: string;
}

export interface WajikOngoingAnimeCard extends WajikTextCard {
  animeId: string;
  poster: string;
  episodes: string;
  releaseDay: string;
  latestReleaseDate: string;
}

export interface WajikCompletedAnimeCard extends WajikTextCard {
  animeId: string;
  poster: string;
  episodes: string;
  score: string;
  lastReleaseDate: string;
}

export interface WajikSearchedAnimeCard extends WajikTextCard {
  animeId: string;
  poster: string;
  status: string;
  score: string;
  genreList: WajikGenreCard[];
}

export interface WajikGenreCard extends WajikTextCard {
  genreId: string;
}

export interface WajikEpisodeCard extends WajikTextCard {
  episodeId: string;
}

export interface WajikRecommendedAnimeCard extends WajikTextCard {
  animeId: string;
  poster: string;
}

export interface WajikSynopsis {
  paragraphList: string[];
}

export interface WajikBatchCard extends WajikTextCard {
  batchId: string;
}

export interface WajikAnimeDetails {
  title: string;
  japanese: string;
  score: string;
  producers: string;
  type: string;
  status: string;
  episodes: string;
  duration: string;
  aired: string;
  studios: string;
  poster: string;
  synopsis: WajikSynopsis;
  batch: WajikBatchCard | null;
  genreList: WajikGenreCard[];
  episodeList: WajikEpisodeCard[];
  recommendedAnimeList: WajikRecommendedAnimeCard[];
}

export interface WajikServerEntry {
  title: string;
  serverId: string;
}

export interface WajikQuality {
  title: string;
  size?: string;
  urlList?: { title: string; url: string }[];
  serverList?: WajikServerEntry[];
}

export interface WajikEpisodeDetails {
  title: string;
  animeId: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: WajikEpisodeCard | null;
  hasNextEpisode: boolean;
  nextEpisode: WajikEpisodeCard | null;
  server: { qualityList: WajikQuality[] };
  download: { qualityList: WajikQuality[] };
  info: {
    credit: string;
    encoder: string;
    duration: string;
    type: string;
    genreList: WajikGenreCard[];
    episodeList: WajikEpisodeCard[];
  };
}

export interface WajikHomeData {
  ongoing: {
    otakudesuUrl?: string;
    animeList: WajikOngoingAnimeCard[];
  };
  completed: {
    otakudesuUrl?: string;
    animeList: WajikCompletedAnimeCard[];
  };
}
