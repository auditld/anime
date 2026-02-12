import { AnimeAPI } from "@/lib/api-client";
import Image from "next/image";
import Link from "next/link";
import ErrorState from "@/components/error-state";
import AnimeCard from "@/components/anime-card";
import { Play } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AnimeDetailPage({ params }: Props) {
  const { slug } = await params;

  try {
    const response = await AnimeAPI.getAnimeDetail(slug);
    const anime = response.data;

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={anime.thumbnail || "/placeholder.jpg"}
            alt={anime.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            {/* Poster */}
            <div className="hidden md:block">
              <div className="sticky top-24">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={anime.thumbnail || "/placeholder.jpg"}
                    alt={anime.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{anime.title}</h1>
                {anime.streaming_title && (
                  <p className="text-lg text-muted-foreground">{anime.streaming_title}</p>
                )}
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-card rounded-lg border border-border">
                {anime.info.status && (
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{anime.info.status as string}</p>
                  </div>
                )}
                {anime.info.score && (
                  <div>
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="font-medium">⭐ {anime.info.score as string}</p>
                  </div>
                )}
                {anime.info.total_episode && (
                  <div>
                    <p className="text-sm text-muted-foreground">Episodes</p>
                    <p className="font-medium">{anime.info.total_episode as string}</p>
                  </div>
                )}
                {anime.info.duration && (
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{anime.info.duration as string}</p>
                  </div>
                )}
                {anime.info.released_on && (
                  <div>
                    <p className="text-sm text-muted-foreground">Released</p>
                    <p className="font-medium">{anime.info.released_on as string}</p>
                  </div>
                )}
                {anime.info.studio && (
                  <div>
                    <p className="text-sm text-muted-foreground">Studio</p>
                    <p className="font-medium">{anime.info.studio as string}</p>
                  </div>
                )}
              </div>

              {/* Genres */}
              {anime.info.genres && Array.isArray(anime.info.genres) && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.info.genres.map((genre, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Synopsis */}
              {anime.synopsis && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {anime.synopsis}
                  </p>
                </div>
              )}

              {/* Episodes */}
              {anime.episodes && anime.episodes.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Episodes</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {anime.episodes.map((episode) => (
                      <Link
                        key={episode.slug}
                        href={`/watch/${episode.slug}?anime=${slug}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-card hover:bg-accent border border-border rounded-lg transition-colors group"
                      >
                        <Play className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">{episode.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {anime.rekomendasi && anime.rekomendasi.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">You May Also Like</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {anime.rekomendasi.slice(0, 10).map((rec) => (
                      <AnimeCard
                        key={rec.slug}
                        anime={{
                          title: rec.title,
                          slug: rec.slug,
                          link: rec.link,
                          thumbnail: rec.thumbnail,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading anime detail:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Failed to load anime"
          message="We couldn't load this anime. The slug might be invalid or the API is unavailable."
          action={
            <Link
              href="/"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Go Home
            </Link>
          }
        />
      </div>
    );
  }
}
