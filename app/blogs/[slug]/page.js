import ShowBlog from "@/components/blog_page/ShowBlog";

export default async function BlogPage({ params, searchParams }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // ✅ Await searchParams before using
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.category || null;

  return (
    <div className="container mx-auto px-4 py-12">
      <ShowBlog slug={slug} categoryParam={categoryParam} />
    </div>
  );
}
