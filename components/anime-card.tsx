import Link from "next/link";
import Image from "next/image";
import { AnimeItem } from "@/types/api";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  anime: AnimeItem;
  className?: string;
}

export default function AnimeCard({ anime, className }: AnimeCardProps) {
  return (
    <Link
      href={`/anime/${anime.slug}`}
      className={cn(
        "group block rounded-lg overflow-hidden bg-card hover:ring-2 hover:ring-primary transition-all",
        className
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <Image
          src={anime.thumbnail || "/placeholder.jpg"}
          alt={anime.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {anime.episode && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
            {anime.episode}
          </div>
        )}
        {anime.episodeInfo && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
            {anime.episodeInfo}
          </div>
        )}
        {anime.rating && (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded text-xs font-semibold">
            ⭐ {anime.rating}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold line-clamp-2 text-sm mb-1">{anime.title}</h3>
        {anime.status && (
          <p className="text-xs text-muted-foreground">{anime.status}</p>
        )}
        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {anime.genres.slice(0, 3).map((genre, i) => (
              <span
                key={i}
                className="text-xs bg-muted px-2 py-0.5 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
