import React from "react";
import SkeletonBox from "./SkeletonBox";

const PageSkeleton = () => {
  return (
    <main
      className="max-w-7xl mx-auto px-6 py-12 space-y-12"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Featured Skeleton */}
      <section className="relative rounded-2xl overflow-hidden shadow-md">
        <SkeletonBox className="w-full h-[400px]" />
        <div className="absolute bottom-0 p-8 space-y-3 w-full">
          <SkeletonBox className="h-4 w-24" />
          <SkeletonBox className="h-8 w-2/3" />
          <SkeletonBox className="h-4 w-1/2" />
          <SkeletonBox className="h-10 w-32 mt-4" />
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Skeleton */}
        <aside
          className="w-full lg:w-64 flex-shrink-0 rounded-xl border bg-[var(--surface)] shadow-sm p-4 lg:p-5 h-fit"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Categories */}
          <div className="mb-6">
            <SkeletonBox className="h-4 w-28 mb-4" />
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-col gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBox key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <SkeletonBox className="h-4 w-20 mb-3" />
            <SkeletonBox className="h-10 w-full" />
          </div>
        </aside>

        {/* Blog Grid Skeleton */}
        <div className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow border p-4 space-y-3"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <SkeletonBox className="w-full h-40" />
                <SkeletonBox className="h-5 w-2/3 mt-2" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-5/6" />
                <SkeletonBox className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageSkeleton;
