"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimeAPI } from "@/lib/api-client";
import AnimeCard from "@/components/anime-card";
import { AnimeGridSkeleton } from "@/components/anime-card-skeleton";
import ErrorState from "@/components/error-state";
import EmptyState from "@/components/empty-state";
import { SearchResponse } from "@/types/api";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await AnimeAPI.searchAnime(query);
        setData(response);
      } catch (err) {
        console.error("Error searching anime:", err);
        setError("Failed to search anime");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [query]);

  if (!query) {
    return <EmptyState title="No search query" message="Enter a search term to find anime." />;
  }

  if (loading) {
    return <AnimeGridSkeleton count={12} />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Search failed"
        message={error || "Something went wrong"}
      />
    );
  }

  if (data.data.length === 0) {
    return (
      <EmptyState
        title="No results found"
        message={`No anime found for "${query}". Try a different search term.`}
      />
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">
        Found {data.total_data} results for &quot;{query}&quot;
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.data.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime} />
        ))}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <Suspense fallback={<AnimeGridSkeleton count={12} />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
