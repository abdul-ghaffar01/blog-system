"use client"
import AllBlogsSection from "@/components/home/AllBlogs";
import CategoriesSection from "@/components/home/Categories";
import FeaturedBlogsSection from "@/components/home/FeaturedBlogs";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import RecentBlogsSection from "@/components/home/RecentBlogs";
import Navbar from "@/components/navbar/Navbar";
import { useState } from "react";

export default function Home() {
  "use client";

  const [open, setOpen] = useState(false);

  return (<>
    <Navbar />
    <Hero />
    <CategoriesSection />
    <FeaturedBlogsSection />
    <RecentBlogsSection />
    <AllBlogsSection />
    <Footer />
  </>
  );
}
