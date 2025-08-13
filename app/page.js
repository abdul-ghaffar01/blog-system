"use client"
import AllBlogsSection from "@/components/home/AllBlogs";
import CategoriesSection from "@/components/home/Categories";
import FeaturedBlogsSection from "@/components/home/FeaturedBlogs";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import RecentBlogsSection from "@/components/home/RecentBlogs";
import { useState } from "react";

export default function Home() {
  "use client";

  const [open, setOpen] = useState(false);

  return (<>
    <Hero />
    <CategoriesSection />
    <FeaturedBlogsSection />
    <RecentBlogsSection />
    <AllBlogsSection />
    <Footer />
  </>
  );
}
