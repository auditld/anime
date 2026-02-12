# Anime Streaming Web App

A modern, clean web anime streaming application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Browse Anime**: View ongoing and completed anime series
- **Search & Filters**: Search for anime titles with real-time results
- **Anime Details**: Comprehensive information including synopsis, genres, ratings, and episode lists
- **Video Streaming**: Watch episodes with multiple quality options and server mirrors
- **Continue Watching**: Automatically track your viewing progress using localStorage
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Beautiful dark theme enabled by default
- **Modern UX**: Loading skeletons, empty states, and error handling

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with server-side rendering and excellent performance
- **TypeScript** - Type-safe development with full API type definitions
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Modern icon library

### Justification
- **Next.js 14**: Chosen for its excellent performance, SEO capabilities, server components, and built-in optimizations
- **TypeScript**: Ensures type safety across the application, reducing runtime errors and improving developer experience
- **Tailwind CSS**: Enables rapid UI development with consistent styling and easy dark mode implementation

## 📁 Project Structure

```
/app                    # Next.js 14 App Router pages
  /anime/[slug]        # Anime detail page
  /watch/[slug]        # Episode watch page
  /ongoing             # Ongoing anime list
  /completed           # Completed anime list
  /search              # Search results page
  layout.tsx           # Root layout with header
  page.tsx             # Home page
  globals.css          # Global styles with dark mode
/components            # Reusable React components
  anime-card.tsx       # Anime card component
  anime-card-skeleton.tsx  # Loading skeleton
  header.tsx           # Navigation header with search
  error-state.tsx      # Error UI component
  empty-state.tsx      # Empty state component
  theme-provider.tsx   # Dark mode provider
/lib                   # Utility functions and API client
  api-client.ts        # Typed API wrapper
  utils.ts             # Helper functions with input sanitization
  storage.ts           # localStorage wrapper for continue watching
/types                 # TypeScript type definitions
  api.ts               # API response types based on api.txt
```

## 🔌 API Integration

The application uses the [wajik-anime-api](https://github.com/wajik45/wajik-anime-api) as its backend, specifically the **otakudesu** source. See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed endpoint information.

### Available Endpoints

All endpoints are prefixed with `/otakudesu/`:

1. **Home** (`/otakudesu/home`) 
   - Returns ongoing and completed anime sections
   - Used on: Home page

2. **Ongoing Anime** (`/otakudesu/ongoing?page={page}`)
   - Paginated list of ongoing anime
   - Used on: Ongoing page with pagination

3. **Completed Anime** (`/otakudesu/completed?page={page}`)
   - Paginated list of completed anime
   - Used on: Completed page with pagination

4. **Search** (`/otakudesu/search?q={query}`)
   - Search anime by title
   - Used on: Search page
   - Features: Real-time search with genre and status display

5. **Anime Details** (`/otakudesu/anime/{animeId}`)
   - Full anime information with episodes and recommendations
   - Used on: Anime detail page
   - Features: Synopsis, genres, ratings, episode list, recommendations

6. **Episode Details** (`/otakudesu/episode/{episodeId}`)
   - Episode streaming with server list and downloads
   - Used on: Watch page
   - Features: Video player, server selection, navigation, download links

7. **Server Resolution** (`/otakudesu/server/{serverId}`)
   - Resolves actual video streaming URLs from server IDs
   - Used on: Watch page

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/auditld/anime.git
   cd anime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your wajik-anime-api base URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
   
   You need a running instance of [wajik-anime-api](https://github.com/wajik45/wajik-anime-api). Follow its setup instructions to start the API server.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🔒 Security Features

- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Environment Variables**: API URLs and sensitive data stored in environment variables
- **No Secrets in Code**: No API keys or secrets committed to the repository
- **Type Safety**: TypeScript ensures type-safe API interactions

## 📝 Assumptions & Notes

Based on the [wajik-anime-api](https://github.com/wajik45/wajik-anime-api), the following assumptions were made:

1. **API Response Format**: All endpoints return JSON wrapped in `{ statusCode, statusMessage, message, data, pagination }` format
2. **Image URLs**: Poster/thumbnail URLs are absolute (https://) URLs from otakudesu
3. **Pagination**: Available through `currentPage`/`totalPages` in the pagination object
4. **IDs**: Anime, episode, and server identifiers are string-based IDs
5. **Video Servers**: Episode servers require a separate resolution call to `/otakudesu/server/{serverId}` for actual video URLs
6. **Genres**: Available as `genreList` arrays with `{ title, genreId }` objects
7. **No Authentication**: The API doesn't require authentication tokens
8. **CORS**: Assumes the API has CORS enabled for browser requests

### Known Limitations

1. **API Dependency**: The app requires a running [wajik-anime-api](https://github.com/wajik45/wajik-anime-api) instance
2. **Video Player**: Uses iframe embedding; server URLs are resolved on demand
3. **No User Accounts**: Continue watching is stored locally only
4. **No Filters Beyond Search**: Genre/status filters not implemented in the UI
5. **Pagination**: Page numbers are computed from `totalPages` in the API response

## 🎨 Design Features

- **Dark Mode**: Enabled by default with carefully chosen color palette
- **Responsive Grid**: Adapts from 2 columns (mobile) to 6 columns (desktop)
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: Graceful error states with helpful messages
- **Smooth Animations**: Subtle transitions and hover effects
- **Accessible**: Semantic HTML and keyboard navigation support

## 📱 Page Details

### Home Page
- Displays ongoing and completed anime sections (12 items each)
- Quick access to view all links
- Hero-style layout

### Ongoing/Completed Pages
- Full paginated lists
- Page number navigation
- Persistent scroll position

### Search Page
- Real-time search results
- Shows result count
- Displays genres, status, and ratings

### Anime Detail Page
- Hero image with gradient overlay
- Comprehensive anime information
- Episode grid with play buttons
- Recommendations section

### Watch Page
- Full-screen video player
- Multiple server/quality options
- Episode navigation (prev/next)
- Complete episode list
- Download links organized by quality

## 🔄 Continue Watching

The app automatically saves your watching progress:
- Stores last 20 watched episodes
- Includes anime thumbnail and title
- Survives browser refresh
- Stored in localStorage (client-side only)

## 🤝 Contributing

Feel free to open issues or submit pull requests for improvements.

## 📄 License

See LICENSE file for details.
