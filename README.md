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

The application uses the API defined in `api.txt`. Here's how the endpoints map to features:

### Available Endpoints

1. **Home** (`/`) 
   - Returns ongoing and completed anime sections
   - Used on: Home page

2. **Ongoing Anime** (`/ongoing-anime/page/{page}`)
   - Paginated list of ongoing anime
   - Used on: Ongoing page with pagination

3. **Completed Anime** (`/complete-anime/page/{page}`)
   - Paginated list of completed anime
   - Used on: Completed page with pagination

4. **Search** (`/?s={query}&post_type=anime`)
   - Search anime by title
   - Used on: Search page
   - Features: Real-time search with genre and status display

5. **Anime Details** (`/anime/{slug}`)
   - Full anime information with episodes and recommendations
   - Used on: Anime detail page
   - Features: Synopsis, genres, ratings, episode list, recommendations

6. **Episode Details** (`/episode/{slug}`)
   - Episode streaming with multiple mirrors and downloads
   - Used on: Watch page
   - Features: Video player, quality selection, navigation, download links

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
   
   Edit `.env` and set your API base URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```

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

Based on the API structure in `api.txt`, the following assumptions were made:

1. **API Response Format**: All endpoints return JSON with a `success` boolean and `data` field
2. **Image URLs**: Thumbnail URLs are either absolute (https://) or relative paths
3. **Pagination**: Available through `pagination.available_pages` array and `next_page` URL
4. **Slugs**: Anime and episode identifiers are URL-friendly slugs
5. **Video Mirrors**: Episode mirrors may require token resolution for actual video URLs
6. **Genres**: Available as arrays in anime info objects
7. **No Authentication**: The API doesn't require authentication tokens
8. **CORS**: Assumes the API has CORS enabled for browser requests

### Known Limitations

1. **API Dependency**: The app requires a working API server (not included in this repository)
2. **Video Player**: Uses iframe embedding; advanced features depend on the video provider
3. **No User Accounts**: Continue watching is stored locally only
4. **No Filters Beyond Search**: Genre/status filters not implemented (API doesn't expose filter endpoints)
5. **Static Pagination**: Page numbers are based on available_pages array from API

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
- Multiple quality/server options
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
