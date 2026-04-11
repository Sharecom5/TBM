/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPosts } from "@/lib/wordpress";
import FeaturedGrid from "@/components/news/FeaturedGrid";
import CategoryBlock from "@/components/news/CategoryBlock";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import NewsletterWidget from "@/components/news/NewsletterWidget";
import NewsCard from "@/components/news/NewsCard";

import { Metadata } from "next";
import { PostData } from "@/lib/types";
import { truncateText } from "@/lib/utils";

export const revalidate = 60; // Revalidate every minute for freshness while debugging

export const metadata: Metadata = {
  title: truncateText("The Bharat Mirror - India's Premier Digital News Platform", 60),
  description: truncateText("Stay updated with the latest news, breaking stories, and in-depth analysis from India and around the world on The Bharat Mirror.", 160),
  alternates: {
    canonical: "https://www.thebharatmirror.com",
  },
};

export default async function HomePage() {
  // Fetch a larger batch to improve filtering coverage
  const allPosts = await getAllPosts(1, 50);

  // Helper to get unique posts
  const shownIds = new Set<number>();
  const getUniquePosts = (count: number, filterFn: (p: PostData) => boolean = () => true) => {
    const filtered = allPosts.filter((p) => !shownIds.has(p.id) && filterFn(p));
    const limited = filtered.slice(0, count);
    limited.forEach((p) => shownIds.add(p.id));
    return limited;
  };

  // 1. Featured Section
  // Try to find a sticky/featured post first
  const mainFeatured = getUniquePosts(1, (p) => p.sticky === true)[0] || getUniquePosts(1)[0];
  const sideFeatured = getUniquePosts(4);

  // 2. Category Sections (Increased from 4 to 8 for more news)
  const indiaPosts = getUniquePosts(8, (p) => p.categories.some((c) => c.slug === "india"));
  const businessPosts = getUniquePosts(8, (p) => p.categories.some((c) => c.slug === "business"));
  const sportPosts = getUniquePosts(8, (p) => p.categories.some((c) => c.slug === "sport" || c.slug === "sports"));
  const worldPosts = getUniquePosts(8, (p) => p.categories.some((c) => c.slug === "world"));

  // 3. Sidebar Posts (Trending)
  const trendingPosts = getUniquePosts(5);

  // 4. Latest Stories (New section to show even more news)
  const latestStories = getUniquePosts(12);

  if (allPosts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-serif font-black mb-6">No stories found at the moment.</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
          We are currently updating our systems to bring you the latest news.
          Please check back in a few minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">



      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* 1. Featured Grid */}
          <FeaturedGrid mainPost={mainFeatured} sidePosts={sideFeatured} />



          {/* 2. Category Blocks */}
          {indiaPosts.length > 0 && <CategoryBlock category="India" posts={indiaPosts} />}
          {businessPosts.length > 0 && <CategoryBlock category="Business" posts={businessPosts} />}
          
          {sportPosts.length > 0 && <CategoryBlock category="Sport" posts={sportPosts} />}
          {worldPosts.length > 0 && <CategoryBlock category="World" posts={worldPosts} />}

          {/* 4. Latest News Grid - Maximum Image coverage */}
          <section className="mt-20">
            <div className="flex items-center justify-between mb-10 border-b-4 border-gray-900 pb-4">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Latest Stories</h2>
                <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800 mx-8 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {latestStories.map((post) => (
                    <NewsCard key={post.id} post={post} className="border-0 shadow-sm hover:shadow-xl transition-shadow rounded-xl p-4 bg-gray-50/50 dark:bg-white/5" />
                ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-12">
          <div className="sticky top-24 space-y-12">
            <TrendingSidebar posts={trendingPosts} />
            <NewsletterWidget />
          </div>
        </aside>
      </div>


    </div>
  );
}
