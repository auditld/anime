# API Endpoints Summary & Mapping

This application uses the [wajik-anime-api](https://github.com/wajik45/wajik-anime-api) as its backend, specifically the **otakudesu** source endpoints.

## API Configuration

Set the `NEXT_PUBLIC_API_URL` environment variable to point to your wajik-anime-api instance:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Available Endpoints

All endpoints are prefixed with `/otakudesu/`.

### 1. Home Page
**Endpoint**: `GET /otakudesu/home`

**Returns**: Ongoing and completed anime lists
```json
{
  "statusCode": 200,
  "statusMessage": "OK",
  "message": "",
  "data": {
    "ongoing": {
      "animeList": [
        {
          "title": "string",
          "poster": "string",
          "episodes": "string",
          "animeId": "string",
          "releaseDay": "string",
          "latestReleaseDate": "string",
          "otakudesuUrl": "string"
        }
      ]
    },
    "completed": {
      "animeList": [
        {
          "title": "string",
          "poster": "string",
          "episodes": "string",
          "animeId": "string",
          "score": "string",
          "lastReleaseDate": "string",
          "otakudesuUrl": "string"
        }
      ]
    }
  },
  "pagination": null
}
```

**Used In**: 
- Home page (`app/page.tsx`)
- Shows both ongoing and completed anime sections

---

### 2. Ongoing Anime List
**Endpoint**: `GET /otakudesu/ongoing?page={page}`

**Returns**: Paginated list of ongoing anime

**Used In**:
- Ongoing page (`app/ongoing/page.tsx`)
- Full paginated list with navigation

---

### 3. Completed Anime List
**Endpoint**: `GET /otakudesu/completed?page={page}`

**Returns**: Same structure as ongoing anime

**Used In**:
- Completed page (`app/completed/page.tsx`)
- Full paginated list with navigation

---

### 4. Search Anime
**Endpoint**: `GET /otakudesu/search?q={query}`

**Parameters**:
- `q`: Search query string (required)

**Used In**:
- Search page (`app/search/page.tsx`)
- Header search bar (`components/header.tsx`)

---

### 5. Anime Details
**Endpoint**: `GET /otakudesu/anime/{animeId}`

**Parameters**:
- `animeId`: Anime identifier (e.g., "drstn-s3-p2-sub-indo")

**Returns**: Full anime details including synopsis, episodes, genres, and recommendations

**Used In**:
- Anime detail page (`app/anime/[slug]/page.tsx`)
- Displays full info, episode list, recommendations

---

### 6. Episode Details
**Endpoint**: `GET /otakudesu/episode/{episodeId}`

**Parameters**:
- `episodeId`: Episode identifier

**Returns**: Episode details including server list, downloads, and navigation

**Used In**:
- Watch page (`app/watch/[slug]/page.tsx`)
- Video player with server selection
- Episode navigation
- Download links

---

### 7. Server/Video URL Resolution
**Endpoint**: `GET /otakudesu/server/{serverId}` or `POST /otakudesu/server/{serverId}`

**Parameters**:
- `serverId`: Base64-encoded server identifier from episode details

**Returns**: Resolved video streaming URL

**Used In**:
- Watch page (`app/watch/[slug]/page.tsx`)
- Resolves actual video URLs for selected servers

---

## Response Wrapper Format

All wajik-anime-api responses follow this format:
```json
{
  "statusCode": 200,
  "statusMessage": "OK",
  "message": "",
  "data": { ... },
  "pagination": {
    "currentPage": 1,
    "prevPage": null,
    "hasPrevPage": false,
    "nextPage": 2,
    "hasNextPage": true,
    "totalPages": 4
  }
}
```

The API client (`lib/api-client.ts`) transforms these responses into internal types used by the page components.

---

## Feature Mapping

| Feature | Endpoints Used | Pages |
|---------|---------------|-------|
| Browse ongoing anime | `/otakudesu/ongoing?page={page}` | Home, Ongoing |
| Browse completed anime | `/otakudesu/completed?page={page}` | Home, Completed |
| Search anime | `/otakudesu/search?q={query}` | Search, Header |
| View anime details | `/otakudesu/anime/{animeId}` | Anime Detail |
| Watch episodes | `/otakudesu/episode/{episodeId}` | Watch |
| Resolve video servers | `/otakudesu/server/{serverId}` | Watch |
| Navigate episodes | `/otakudesu/episode/{episodeId}` navigation | Watch |
| Recommendations | `/otakudesu/anime/{animeId}` recommendations | Anime Detail |

---

## Assumptions Made

1. **Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable
2. **Backend**: Uses [wajik-anime-api](https://github.com/wajik45/wajik-anime-api) with otakudesu source
3. **Authentication**: No authentication required (public API)
4. **CORS**: API server has CORS enabled for browser requests
5. **Image URLs**: Absolute URLs from otakudesu source
6. **IDs**: `animeId`, `episodeId`, `serverId` are string identifiers
7. **Pagination**: Based on `currentPage`/`totalPages` from API response
8. **Video Streaming**: Server IDs must be resolved via `/otakudesu/server/{serverId}` endpoint
9. **Error Handling**: API returns standard error responses with statusCode

---

## Security Measures

1. **Input Sanitization**: All search queries are URL-encoded
2. **XSS Prevention**: User inputs sanitized with `escapeHtml()` utility
3. **Environment Variables**: API URL not hardcoded
4. **No Secrets**: No API keys or tokens in client code
5. **Type Safety**: Full TypeScript types prevent invalid data
