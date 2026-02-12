"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AnimeAPI } from "@/lib/api-client";
import { EpisodeDetail } from "@/types/api";
import ErrorState from "@/components/error-state";
import Link from "next/link";
import { ChevronLeft, ChevronRight, List, Download } from "lucide-react";
import { continueWatchingStorage } from "@/lib/storage";

export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const animeSlug = searchParams.get("anime");
  
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMirror, setSelectedMirror] = useState<number>(0);

  useEffect(() => {
    const loadEpisode = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await AnimeAPI.getEpisodeDetail(slug);
        setEpisode(response.data);

        // Save to continue watching
        if (response.data && animeSlug) {
          continueWatchingStorage.add({
            animeSlug: animeSlug,
            animeTitle: response.data.info.judul || response.data.title,
            episodeSlug: slug,
            episodeTitle: response.data.title,
            thumbnail: response.data.info.thumbnail || "",
          });
        }
      } catch (err) {
        console.error("Error loading episode:", err);
        setError("Failed to load episode");
      } finally {
        setLoading(false);
      }
    };

    loadEpisode();
  }, [slug, animeSlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="aspect-video bg-muted rounded-lg" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Failed to load episode"
          message={error || "Something went wrong"}
          action={
            animeSlug && (
              <Link
                href={`/anime/${animeSlug}`}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Back to Anime
              </Link>
            )
          }
        />
      </div>
    );
  }

  const currentMirror = episode.mirrors[selectedMirror];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Video Player */}
      <div className="mb-6">
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          {currentMirror?.url ? (
            <iframe
              src={currentMirror.url}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : episode.iframe ? (
            <iframe
              src={episode.iframe}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white">No video source available</p>
            </div>
          )}
        </div>

        {/* Mirror Selection */}
        {episode.mirrors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Video Quality & Servers</h3>
            <div className="flex flex-wrap gap-2">
              {episode.mirrors.map((mirror, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMirror(index)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedMirror === index
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  {mirror.provider} {mirror.quality && `- ${mirror.quality}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Episode Info */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{episode.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {episode.metadata.author && (
            <span>Posted by {episode.metadata.author}</span>
          )}
          {episode.metadata.release && (
            <span>Released on {episode.metadata.release}</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {episode.navigation.previous && (
          <Link
            href={`/watch/${episode.navigation.previous.slug}${animeSlug ? `?anime=${animeSlug}` : ""}`}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Episode
          </Link>
        )}
        {episode.navigation.anime && (
          <Link
            href={`/anime/${episode.navigation.anime.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <List className="h-4 w-4" />
            All Episodes
          </Link>
        )}
        {episode.navigation.next && (
          <Link
            href={`/watch/${episode.navigation.next.slug}${animeSlug ? `?anime=${animeSlug}` : ""}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Next Episode
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Episode List */}
      {episode.episodes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">All Episodes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {episode.episodes.map((ep) => (
              <Link
                key={ep.slug}
                href={`/watch/${ep.slug}${animeSlug ? `?anime=${animeSlug}` : ""}`}
                className={`px-4 py-2 text-center rounded-lg border text-sm font-medium transition-colors ${
                  ep.slug === slug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-accent"
                }`}
              >
                {ep.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Downloads */}
      {episode.downloads.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Links
          </h3>
          <div className="space-y-4">
            {episode.downloads.map((download, index) => (
              <div key={index} className="p-4 bg-card border border-border rounded-lg">
                <div className="font-semibold mb-2">
                  {download.quality} {download.size && `(${download.size})`}
                </div>
                <div className="flex flex-wrap gap-2">
                  {download.providers.map((provider, pIndex) => (
                    <a
                      key={pIndex}
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded text-sm font-medium transition-colors"
                    >
                      {provider.provider}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
