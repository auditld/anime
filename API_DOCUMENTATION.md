# API Endpoints Summary & Mapping

This document summarizes the API endpoints found in `api.txt` and how they map to app features.

## Available Endpoints

### 1. Home Page
**Endpoint**: `GET /`

**Returns**: 
```json
{
  "ongoing": {
    "count": number,
    "data": AnimeItem[]
  },
  "completed": {
    "count": number,
    "data": AnimeItem[]
  }
}
```

**Used In**: 
- Home page (`app/page.tsx`)
- Shows both ongoing and completed anime sections

---

### 2. Ongoing Anime List
**Endpoint**: `GET /ongoing-anime/page/{page}`

**Returns**:
```json
{
  "success": true,
  "page": number,
  "total_data": number,
  "pagination": {
    "available_pages": number[],
    "next_page": string | null
  },
  "data": AnimeItem[]
}
```

**Used In**:
- Ongoing page (`app/ongoing/page.tsx`)
- Full paginated list with navigation

---

### 3. Completed Anime List
**Endpoint**: `GET /complete-anime/page/{page}`

**Returns**: Same structure as ongoing anime

**Used In**:
- Completed page (`app/completed/page.tsx`)
- Full paginated list with navigation

---

### 4. Search Anime
**Endpoint**: `GET /?s={query}&post_type=anime`

**Parameters**:
- `s`: Search query string
- `post_type`: Always "anime"

**Returns**:
```json
{
  "success": true,
  "total_data": number,
  "data": AnimeItem[]
}
```

**Used In**:
- Search page (`app/search/page.tsx`)
- Header search bar (`components/header.tsx`)

---

### 5. Anime Details
**Endpoint**: `GET /anime/{slug}`

**Parameters**:
- `slug`: Anime identifier (e.g., "naruto-shippuden")

**Returns**:
```json
{
  "success": true,
  "data": {
    "title": string,
    "streaming_title": string,
    "thumbnail": string,
    "synopsis": string,
    "info": {
      "status": string,
      "score": string,
      "total_episode": string,
      "duration": string,
      "released_on": string,
      "studio": string,
      "genres": string[]
    },
    "episodes": Episode[],
    "rekomendasi": RecommendedAnime[]
  }
}
```

**Used In**:
- Anime detail page (`app/anime/[slug]/page.tsx`)
- Displays full info, episode list, recommendations

---

### 6. Episode Details
**Endpoint**: `GET /episode/{slug}`

**Parameters**:
- `slug`: Episode identifier

**Returns**:
```json
{
  "success": true,
  "data": {
    "title": string,
    "metadata": {
      "author": string,
      "release": string
    },
    "info": object,
    "iframe": string | null,
    "navigation": {
      "previous": NavigationLink | null,
      "anime": NavigationLink | null,
      "next": NavigationLink | null
    },
    "episodes": Episode[],
    "mirrors": Mirror[],
    "downloads": Download[]
  }
}
```

**Used In**:
- Watch page (`app/watch/[slug]/page.tsx`)
- Video player with quality options
- Episode navigation
- Download links

---

## Data Models

### AnimeItem
```typescript
{
  title: string;
  slug: string;
  thumbnail: string;
  link: string;
  episode?: string;          // e.g., "Episode 12"
  episodeInfo?: string;      // e.g., "12 Episode"
  day?: string;              // Release day
  date?: string;             // Release date
  genres?: string[];
  status?: string;           // "Ongoing" | "Completed"
  rating?: string;           // e.g., "8.5"
}
```

### Episode
```typescript
{
  title: string;             // e.g., "Episode 1"
  link: string;
  slug: string;
  release_date?: string;
}
```

### Mirror (Video Source)
```typescript
{
  quality: string;           // e.g., "720p", "1080p"
  provider: string;          // e.g., "Vidstream", "Streamtape"
  token: string;
  url: string | null;        // Actual video URL
}
```

### Download
```typescript
{
  quality: string;           // e.g., "480p", "720p", "1080p"
  size?: string;             // e.g., "150MB", "300MB"
  providers: {
    provider: string;
    url: string;
  }[];
}
```

---

## Feature Mapping

| Feature | Endpoints Used | Pages |
|---------|---------------|-------|
| Browse ongoing anime | `/ongoing-anime/page/{page}` | Home, Ongoing |
| Browse completed anime | `/complete-anime/page/{page}` | Home, Completed |
| Search anime | `/?s={query}&post_type=anime` | Search, Header |
| View anime details | `/anime/{slug}` | Anime Detail |
| Watch episodes | `/episode/{slug}` | Watch |
| Navigate episodes | `/episode/{slug}` navigation | Watch |
| Recommendations | `/anime/{slug}` rekomendasi | Anime Detail |

---

## Assumptions Made

1. **Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable
2. **Response Format**: All responses follow the structure shown in api.txt
3. **Authentication**: No authentication required (public API)
4. **CORS**: API server has CORS enabled for browser requests
5. **Image URLs**: Can be absolute (https://) or relative
6. **Slugs**: URL-safe identifiers for anime and episodes
7. **Pagination**: Based on `available_pages` array returned by API
8. **Video Embedding**: Uses iframe for video player
9. **Mirror Resolution**: Some mirrors may require token decoding
10. **Error Handling**: API returns standard error responses

---

## Security Measures

1. **Input Sanitization**: All search queries are URL-encoded
2. **XSS Prevention**: User inputs sanitized with `sanitizeHtml()` utility
3. **Environment Variables**: API URL not hardcoded
4. **No Secrets**: No API keys or tokens in client code
5. **Type Safety**: Full TypeScript types prevent invalid data

---

## Limitations

1. **No Genre Filtering**: API doesn't expose genre filter endpoints
2. **No Advanced Search**: Only basic title search available
3. **No User Authentication**: Continue watching stored locally only
4. **No Comments/Reviews**: API doesn't provide comment endpoints
5. **Limited Filters**: Status and year filters not available in API
