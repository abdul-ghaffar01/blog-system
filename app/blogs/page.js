import React from "react";
import constructBlog from "@/utils/constructBlog";
import items from "@/utils/items";

const Page = () => {
  return (
    <main
      className="max-w-4xl mx-auto px-4 py-12"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <article className="prose prose-lg max-w-none prose-headings:mb-4 prose-p:mb-6 prose-img:rounded-xl">
        {constructBlog(items)}
      </article>
    </main>
  );
};

export default Page;
