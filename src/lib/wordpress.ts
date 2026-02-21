/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostData, WPCategory, WPPost } from "./types";

const API_URL = process.env.WORDPRESS_API_URL?.replace(/\/$/, "");

if (!API_URL) {
    console.warn("WORDPRESS_API_URL is not defined in environment variables. Content will not be fetched.");
}

// Helper to decode HTML entities in titles
function decodeHtml(html: string) {
    if (!html) return "";
    return html.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
}

// Simple text sanitizer for excerpts (strips HTML and decodes entities)
function sanitizeExcerpt(html: string) {
    if (!html) return "";
    // Remove all HTML tags
    const stripped = html.replace(/<[^>]+>/g, "");
    // Decode entities
    const decoded = decodeHtml(stripped);
    // Limit length
    return decoded.slice(0, 160) + "...";
}

function normalizePost(post: WPPost): PostData {
    const embedded = post._embedded || {};
    const featuredMedia = embedded["wp:featuredmedia"]?.[0];
    const authors = embedded["author"]?.[0];
    const terms = embedded["wp:term"]?.[0] || [];

    return {
        id: post.id,
        slug: post.slug,
        title: decodeHtml(post.title.rendered),
        excerpt: sanitizeExcerpt(post.excerpt.rendered),
        content: post.content.rendered,
        date: post.date,
        author: {
            name: authors?.name || "Editorial Team",
            avatar: authors?.avatar_urls?.["96"],
        },
        image: {
            url: featuredMedia?.source_url || "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
            alt: featuredMedia?.alt_text || post.title.rendered,
            caption: featuredMedia?.caption?.rendered ? decodeHtml(featuredMedia.caption.rendered) : undefined,
        },
        categories: terms.map(term => ({
            id: term.id,
            name: decodeHtml(term.name),
            slug: term.slug,
        })),
        seo: {
            title: post.rank_math_title ? decodeHtml(post.rank_math_title) : decodeHtml(post.title.rendered),
            description: post.rank_math_description ? decodeHtml(post.rank_math_description) : "",
            fullHead: post.yoast_head || undefined,
        },
        sticky: post.sticky,
    };
}

export async function fetchAPI(endpoint: string, params: Record<string, string> = {}, revalidate = 60) {
    if (!API_URL) return null;

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(`${API_URL}${cleanEndpoint}`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

    try {
        const res = await fetch(url.toString(), {
            next: { revalidate, tags: ['posts'] },
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!res.ok) {
            console.error(`[WP API] Failed: ${url.toString()} - Status: ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error(`[WP API] Fetch Exception for ${url.toString()}:`, error.message || error);
        return null;
    }
}

export async function getAllPosts(page = 1, perPage = 10, category?: number): Promise<PostData[]> {
    const params: Record<string, string> = {
        _embed: "true",
        per_page: perPage.toString(),
        page: page.toString(),
    };

    if (category) {
        params.categories = category.toString();
    }

    const posts = await fetchAPI("/wp/v2/posts", params);
    if (!posts || !Array.isArray(posts)) {
        return [];
    }

    return posts.map(normalizePost);
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
    const posts = await fetchAPI("/wp/v2/posts", {
        slug,
        _embed: "true",
    });

    if (!posts || !posts.length) return null;
    return normalizePost(posts[0]);
}

export async function getAllCategories(): Promise<WPCategory[]> {
    const categories = await fetchAPI("/wp/v2/categories", {
        per_page: "100",
        orderby: "count",
        order: "desc",
    }, 3600);

    return categories || [];
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
    const categories = await fetchAPI("/wp/v2/categories", {
        slug,
    });

    if (!categories || !categories.length) return null;
    return categories[0];
}

export async function getRecentPostsForSitemap(): Promise<PostData[]> {
    const after = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
    const posts = await fetchAPI("/wp/v2/posts", {
        _embed: "true",
        per_page: "100",
        after: after
    }, 600);

    if (!posts || !Array.isArray(posts)) return [];
    return posts.map(normalizePost);
}