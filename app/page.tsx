import { AnimeAPI } from "@/lib/api-client";
import AnimeCard from "@/components/anime-card";
import { AnimeGridSkeleton } from "@/components/anime-card-skeleton";
import ErrorState from "@/components/error-state";
import EmptyState from "@/components/empty-state";
import Link from "next/link";
import { Suspense } from "react";

async function HomeContent() {
  try {
    const data = await AnimeAPI.getHome();

    const hasOngoing = data.ongoing.data.length > 0;
    const hasCompleted = data.completed.data.length > 0;

    if (!hasOngoing && !hasCompleted) {
      return <EmptyState title="No anime available" message="Check back later for new content." />;
    }

    return (
      <div className="space-y-12">
        {/* Ongoing Anime Section */}
        {hasOngoing && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Ongoing Anime</h2>
              <Link
                href="/ongoing"
                className="text-primary hover:underline text-sm font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {data.ongoing.data.slice(0, 12).map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
          </section>
        )}

        {/* Completed Anime Section */}
        {hasCompleted && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Completed Anime</h2>
              <Link
                href="/completed"
                className="text-primary hover:underline text-sm font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {data.completed.data.slice(0, 12).map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return (
      <ErrorState
        title="Failed to load anime"
        message="We couldn't fetch the anime list. Please try again later."
      />
    );
  }
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Welcome to AnimeStream
      </h1>
      <Suspense fallback={<AnimeGridSkeleton count={24} />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
