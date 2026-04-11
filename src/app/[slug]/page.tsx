import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
    getCategoryBySlug,
    getPostBySlug,
    getAllPosts
} from "@/lib/wordpress";
import { truncateText } from "@/lib/utils";
import CategoryTemplate from "@/components/templates/CategoryTemplate";
import ArticleTemplate from "@/components/templates/ArticleTemplate";

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Generate Metadata dynamically based on resolved type
export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const slug = params.slug;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thebharatmirror.com";

    // Try Category First
    const category = await getCategoryBySlug(slug);
    if (category) {
        const title = truncateText(`${category.name} News - The Bharat Mirror`, 60);
        const description = truncateText(`Latest ${category.name} news and updates from The Bharat Mirror.`, 160);
        
        return {
            title,
            description,
            alternates: {
                canonical: `${siteUrl}/${slug}`,
            },
            openGraph: {
                title,
                description,
                url: `${siteUrl}/${slug}`,
            },
        };
    }

    // Try Post Second
    const post = await getPostBySlug(slug);
    if (post) {
        const title = truncateText(post.seo.title || post.title, 60);
        const description = truncateText(post.seo.description || post.excerpt, 160);
        
        return {
            title,
            description,
            alternates: {
                canonical: post.seo.canonical || `${siteUrl}/${slug}`,
            },
            keywords: post.seo.focusKeyword || undefined,
            openGraph: {
                title,
                description,
                images: [post.image.url],
                type: "article",
                publishedTime: post.date,
                authors: [post.author.name],
                url: post.seo.canonical || `${siteUrl}/${slug}`,
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [post.image.url],
            },
        };
    }

    return {
        title: "Not Found",
    };
}

export default async function ResolverPage({ params }: PageProps) {
    const slug = params.slug;

    // Safety check: Don't process XML, TXT, or admin routes as slugs
    if (slug.endsWith('.xml') || slug.endsWith('.txt') || slug === 'social-admin') {
        notFound();
    }

    // 1. Check Category
    const category = await getCategoryBySlug(slug);
    if (category) {
        // Fetch posts for this category
        const posts = await getAllPosts(1, 20, category.id);
        return <CategoryTemplate category={category} posts={posts} />;
    }

    // 2. Check Article
    const post = await getPostBySlug(slug);
    if (post) {
        // Fetch trending/recent posts for sidebar
        const trendingPosts = await getAllPosts(1, 6); 
        
        // Fetch related posts from same category (Goal: Internal Linking)
        const primaryCategory = post.categories?.[0];
        let relatedPosts = [];
        if (primaryCategory) {
            relatedPosts = await getAllPosts(1, 5, primaryCategory.id);
        } else {
            // Fallback to latest
            relatedPosts = trendingPosts;
        }

        // Filter out current post
        const filteredTrending = trendingPosts.filter((p) => p.id !== post.id).slice(0, 5);
        const filteredRelated = relatedPosts.filter((p) => p.id !== post.id).slice(0, 4);

        return (
            <ArticleTemplate 
                post={post} 
                trendingPosts={filteredTrending} 
                relatedPosts={filteredRelated}
            />
        );
    }

    // 3. Not Found
    notFound();
}

// Optional: static params for popular categories/posts (ISR)
// export async function generateStaticParams() {
//   // fetch popular categories or recent posts to pre-render
//   return [];
// }
