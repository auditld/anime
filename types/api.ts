// API Response Types based on api.txt

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
  token: string;
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
