import { getRecentPostsForSitemap } from "@/lib/wordpress";
import { NextResponse } from "next/server";

export const revalidate = 60; // Revalidate every minute for Google News freshness

export async function GET() {
    try {
        const posts = await getRecentPostsForSitemap();
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thebharatmirror.com';

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts.map(post => {
            // XML Entity Escape for safety
            const title = post.title
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');

            return `
  <url>
    <loc>${siteUrl}/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>The Bharat Mirror</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
        }).join('')}
</urlset>`;

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=59",
            },
        });
    } catch (error) {
        console.error("[News Sitemap] Route Error:", error);
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}
