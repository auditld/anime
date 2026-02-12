"use client";

import { useEffect, useState } from "react";
import { AnimeAPI } from "@/lib/api-client";
import AnimeCard from "@/components/anime-card";
import { AnimeGridSkeleton } from "@/components/anime-card-skeleton";
import ErrorState from "@/components/error-state";
import EmptyState from "@/components/empty-state";
import { ListResponse } from "@/types/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OngoingPage() {
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await AnimeAPI.getOngoingAnime(currentPage);
        setData(response);
      } catch (err) {
        console.error("Error loading ongoing anime:", err);
        setError("Failed to load ongoing anime");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ongoing Anime</h1>
        <AnimeGridSkeleton count={24} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ongoing Anime</h1>
        <ErrorState
          title="Failed to load"
          message={error || "Something went wrong"}
        />
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ongoing Anime</h1>
        <EmptyState title="No ongoing anime" message="Check back later for new episodes." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ongoing Anime</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.data.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime} />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination && data.pagination.available_pages.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex gap-2">
            {data.pagination.available_pages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-accent"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!data.pagination.next_page}
            className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
