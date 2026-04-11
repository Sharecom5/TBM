import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
    getCategoryBySlug,
    getAllPosts
} from "@/lib/wordpress";
import CategoryTemplate from "@/components/templates/CategoryTemplate";

interface CategoryPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

import { truncateText } from "@/lib/utils";

export async function generateMetadata(
    { params }: CategoryPageProps
): Promise<Metadata> {
    const slug = params.slug;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thebharatmirror.com";

    const category = await getCategoryBySlug(slug);
    if (category) {
        const title = truncateText(`${category.name} News - The Bharat Mirror`, 60);
        const description = truncateText(`Latest ${category.name} news and updates from The Bharat Mirror.`, 160);

        return {
            title,
            description,
            alternates: {
                canonical: `${siteUrl}/category/${slug}`,
            },
            openGraph: {
                title,
                description,
                url: `${siteUrl}/category/${slug}`,
            },
        };
    }

    return {
        title: "Category Not Found",
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const slug = params.slug;

    const category = await getCategoryBySlug(slug);
    if (!category) {
        notFound();
    }

    // Fetch posts for this category
    const posts = await getAllPosts(1, 20, category.id);
    
    return <CategoryTemplate category={category} posts={posts} />;
}
