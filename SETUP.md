# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-anime-api.com
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
npm start
```

## API Configuration

The app requires an API server that implements the endpoints defined in `api.txt`:

- `GET /` - Home page with ongoing/completed anime
- `GET /ongoing-anime/page/{page}` - Ongoing anime list
- `GET /complete-anime/page/{page}` - Completed anime list
- `GET /?s={query}&post_type=anime` - Search anime
- `GET /anime/{slug}` - Anime details
- `GET /episode/{slug}` - Episode details with video sources

Set the `NEXT_PUBLIC_API_URL` environment variable to point to your API server.

## Features Included

✓ Home page with ongoing/completed sections
✓ Search functionality
✓ Anime detail pages
✓ Video player with multiple quality options
✓ Continue watching (localStorage)
✓ Dark mode (default)
✓ Responsive design
✓ Loading skeletons
✓ Error states
✓ Pagination

## Notes

- The API server is **not included** in this repository
- The app uses client-side localStorage for "Continue Watching"
- Images are loaded from the API with Next.js Image optimization
- All user inputs are sanitized for security
