import { MetadataRoute } from 'next';
import { getAllPostsForSitemap, getAllCategories } from '@/lib/wordpress';

// Revalidate the sitemap every 60 seconds so new WP posts appear almost instantly
export const revalidate = 60;
export const maxDuration = 60; // Allow more time for fetching thousands of posts

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thebharatmirror.com';

    // 1. Fetch Categories
    const categories = await getAllCategories();
    const categoryUrls = categories.map((cat) => ({
        url: `${siteUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // 2. Fetch ALL Posts (paginated, 100 per WP API page — captures every article)
    const posts = await getAllPostsForSitemap();
    const postUrls = posts.map((post) => ({
        url: `${siteUrl}/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        images: post.image?.url ? [post.image.url] : [],
    }));

    // 3. Static Pages and Category Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/search',
        '/newsletters',
        '/advertise',
        '/privacy',
        '/terms',
        '/disclaimer',
        '/business',
        '/entertainment',
        '/india',
        '/life-and-style',
        '/opinion',
        '/sci-tech',
        '/sport',
        '/world'
    ];

    const staticPages = staticRoutes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'always' as const : 'monthly' as const,
        priority: route === '' ? 1.0 : 0.5,
    }));

    return [...staticPages, ...categoryUrls, ...postUrls];
}
