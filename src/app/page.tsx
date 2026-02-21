/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPosts } from "@/lib/wordpress";
import FeaturedGrid from "@/components/news/FeaturedGrid";
import CategoryBlock from "@/components/news/CategoryBlock";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import NewsletterWidget from "@/components/news/NewsletterWidget";
import AdBanner from "@/components/ads/AdBanner";
import { Metadata } from "next";
import { PostData } from "@/lib/types";

export const revalidate = 600; // Revalidate every 10 minutes

export const metadata: Metadata = {
  title: "The Bharat Mirror - India's Premier Digital News Platform",
  description: "Stay updated with the latest news, breaking stories, and in-depth analysis from India and around the world on The Bharat Mirror.",
  alternates: {
    canonical: "https://thebharatmirror.com",
  },
};

export default async function HomePage() {
  // Fetch a large batch of posts to distribute across sections
  // Legacy fetched 50 posts. We'll do the same.
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

  // 2. Category Sections
  const indiaPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "india"));
  const businessPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "business"));
  const sportPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "sport" || c.slug === "sports"));
  const worldPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "world"));

  // 3. Sidebar Posts (Trending - just latest remaining for now)
  const trendingPosts = getUniquePosts(5);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thebharatmirror.com";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "The Bharat Mirror",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Bharat Mirror",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://facebook.com/thebharatmirror",
      "https://twitter.com/thebharatmirror",
      "https://instagram.com/thebharatmirror"
    ]
  };

  if (allPosts.length === 0) {
    const debugUrl = process.env.WORDPRESS_API_URL || "NOT SET";
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Connecting to News Feed...</h2>
        <p className="text-gray-500 mb-2">We are having trouble loading the latest stories via the server.</p>
        <p className="text-xs text-gray-400 mb-8">Debug Info (API Source): {debugUrl}</p>

        <div className="mt-10 p-4 border border-dashed border-gray-300 rounded-lg max-w-md mx-auto">
          <h3 className="text-sm font-bold mb-2">Browser Connectivity Test</h3>
          <p className="text-xs text-gray-400 mb-4">Checking if your browser can reach the API directly...</p>
          <div id="browser-test-status" className="text-xs font-mono bg-gray-50 p-2 rounded">Initializing...</div>
          <script dangerouslySetInnerHTML={{
            __html: `
                (async () => {
                    const statusEl = document.getElementById('browser-test-status');
                    try {
                        const res = await fetch('https://admin.thebharatmirror.com/wp-json/wp/v2/posts?per_page=1');
                        if (res.ok) {
                            const data = await res.json();
                            statusEl.innerText = '✅ Browser can reach API. (Found ' + data.length + ' post)';
                            statusEl.className += ' text-green-600';
                        } else {
                            statusEl.innerText = '❌ API returned error: ' + res.status;
                            statusEl.className += ' text-red-600';
                        }
                    } catch (e) {
                        statusEl.innerText = '❌ Browser failed to reach API: ' + e.message;
                        statusEl.className += ' text-red-600';
                    }
                })()
            `}} />
        </div>

        <div className="animate-pulse flex justify-center mt-8">
          <div className="h-2 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="mb-12">
        <AdBanner size="leaderboard" position="top-banner" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* 1. Featured Grid */}
          <FeaturedGrid mainPost={mainFeatured} sidePosts={sideFeatured} />

          <div className="my-12">
            <AdBanner size="leaderboard" position="mid-content" />
          </div>

          {/* 2. Category Blocks */}
          {indiaPosts.length > 0 && <CategoryBlock category="India" posts={indiaPosts} />}
          {businessPosts.length > 0 && <CategoryBlock category="Business" posts={businessPosts} />}
          {sportPosts.length > 0 && <CategoryBlock category="Sport" posts={sportPosts} />}
          {worldPosts.length > 0 && <CategoryBlock category="World" posts={worldPosts} />}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-12">
          <TrendingSidebar posts={trendingPosts} />
          <AdBanner size="rectangle" position="sidebar" />
          <NewsletterWidget />
        </aside>
      </div>

      <div className="mt-12">
        <AdBanner size="leaderboard" position="footer-banner" />
      </div>
    </div>
  );
}
