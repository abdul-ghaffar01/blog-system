import ShowAllBlogs from "@/components/all-blogs/ShowAllBlogs";
import { BASE_URL } from "@/utils/env";

// ✅ page.js stays server-side
export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.category || "All";

  // Initial featured
  const featuredRes = await fetch(
    `${BASE_URL}/api/blogs?limit=1&sort=recent`,
    { cache: "no-store" }
  );
  const featuredData = await featuredRes.json();
  const featured = featuredData.blogs?.[0] || null;

  // Initial categories
  const catRes = await fetch(`${BASE_URL}/api/categories`, {
    cache: "no-store",
  });
  const categories = await catRes.json();

  // Initial blogs (page=1)
  const blogsRes = await fetch(
    `${BASE_URL}/api/blogs?page=1&limit=6&sort=newest&category=${categoryParam !== "All" ? categoryParam : ""
    }`,
    { cache: "no-store" }
  );
  const blogsData = await blogsRes.json();

  return (
    <ShowAllBlogs
      featured={featured}
      categories={[{ name: "All", count: 0 }, ...categories]}
      initialBlogs={blogsData.blogs}
      initialHasMore={blogsData.hasMore}
      initialCategory={categoryParam}
    />
  );
}
