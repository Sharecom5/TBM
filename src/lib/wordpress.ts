/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostData, WPCategory, WPPost } from "./types";

const API_URL = (process.env.WORDPRESS_API_URL || "https://admin.thebharatmirror.com/wp-json").replace(/\/$/, "");

if (!process.env.WORDPRESS_API_URL) {
    console.warn("WORDPRESS_API_URL is not defined. Using fallback: " + API_URL);
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
// Helper to ensure image URLs use a working subdomain
function normalizeImageUrl(url: string | undefined) {
    if (!url) return "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620";
    // Ensure we use admin.thebharatmirror.com as wp. does not resolve
    if (url.includes('wp.thebharatmirror.com')) {
        return url.replace('wp.thebharatmirror.com', 'admin.thebharatmirror.com');
    }
    return url;
}

function normalizeCanonicalUrl(url: string | undefined, slug: string) {
    const primaryDomain = "https://www.thebharatmirror.com";
    if (!url) return `${primaryDomain}/${slug}`;

    // List of mirror domains to normalize
    const mirrors = [
        "renewablemirror.com",
        "electricalmirror.com",
        "constructionmirror.com",
        "admin.thebharatmirror.com",
        "thebharatmirror.com" // catch non-www too
    ];

    let processedUrl = url;
    mirrors.forEach(mirror => {
        if (processedUrl.includes(mirror)) {
            // Replace matching domain with primary domain while preserving the path/slug
            // If the mirror is the same domain but different subdomain, we just swap it
            processedUrl = `${primaryDomain}/${slug}`;
        }
    });

    return processedUrl;
}

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
        modified: post.modified,
        author: {
            name: authors?.name || "Editorial Team",
            avatar: authors?.avatar_urls?.["96"],
        },
        image: {
            url: normalizeImageUrl(featuredMedia?.source_url),
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
            canonical: normalizeCanonicalUrl(post.rank_math_canonical_url, post.slug),
            focusKeyword: post.rank_math_focus_keyword || undefined,
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            // Add a 10s timeout to avoid hanging builds
            signal: AbortSignal.timeout(10000),
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`[WP API] HTTP ERROR for ${url.toString()} - Status: ${res.status} ${res.statusText}`);
            console.error(`[WP API] Error Body Preview: ${errorBody.slice(0, 500)}`);
            return null;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const body = await res.text();
            console.error(`[WP API] Expected JSON but got ${contentType}. Body Preview: ${body.slice(0, 500)}`);
            return null;
        }

        const data = await res.json();
        console.log(`[WP API] Successfully fetched ${Array.isArray(data) ? data.length : "object"} from ${url.toString()}`);
        return data;
    } catch (error: unknown) {
        const err = error as any; // Cast for property access if needed, or better:
        if (err.name === 'TimeoutError') {
            console.error(`[WP API] Timeout for ${url.toString()}`);
        } else {
            console.error(`[WP API] Fetch Exception for ${url.toString()}:`, err.message || error);
        }
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

export async function searchPosts(query: string, page = 1, perPage = 20): Promise<PostData[]> {
    const params: Record<string, string> = {
        _embed: "true",
        search: query,
        per_page: perPage.toString(),
        page: page.toString(),
    };

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

/**
 * Fetches ALL published posts by paginating the WP REST API (100 per page).
 * Used by the main sitemap so every article is included regardless of count.
 */
export async function getAllPostsForSitemap(): Promise<PostData[]> {
    const allPosts: WPPost[] = [];
    let page = 1;
    const perPage = 100; // WP REST API hard max

    while (true) {
        const batch = await fetchAPI("/wp/v2/posts", {
            _embed: "true",
            per_page: perPage.toString(),
            page: page.toString(),
            orderby: "date",
            order: "desc",
        }, 300); // cache for 5 min per batch

        if (!batch || !Array.isArray(batch) || batch.length === 0) break;

        allPosts.push(...batch);
        console.log(`[Sitemap] Fetched page ${page} — ${batch.length} posts (total so far: ${allPosts.length})`);

        // If we got fewer than perPage, we've hit the last page
        if (batch.length < perPage) break;

        page++;
    }

    return allPosts.map(normalizePost);
}

export async function getRecentPostsForSitemap(): Promise<PostData[]> {
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    // WP API Usually filters by 'date' (published), but synced posts might have older published dates
    // though they are "new" to this site. We'll also fetch a bit more to be safe.
    const after = fortyEightHoursAgo.toISOString();

    let posts = await fetchAPI("/wp/v2/posts", {
        _embed: "true",
        per_page: "500",
        after: after
    }, 60);

    // If no posts in 48 hours, fall back to the most recent 10 posts 
    // to ensure the sitemap is never "blank" for the user/search consoles.
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
        console.log("[Sitemap] No posts found in 48h, falling back to latest 10 posts.");
        posts = await fetchAPI("/wp/v2/posts", {
            _embed: "true",
            per_page: "10",
        }, 60);
    }

    if (!posts || !Array.isArray(posts)) return [];
    return posts.map(normalizePost);
}