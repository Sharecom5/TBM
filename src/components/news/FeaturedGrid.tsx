import Link from "next/link";
import Image from "next/image";
import { PostData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import NewsCard from "@/components/news/NewsCard";

interface FeaturedGridProps {
    mainPost: PostData;
    sidePosts: PostData[];
}

export default function FeaturedGrid({ mainPost, sidePosts }: FeaturedGridProps) {
    if (!mainPost) return null;

    const mainSlug = mainPost.slug;
    const mainImageUrl = mainPost.image.url;
    const mainDate = formatDate(mainPost.date);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 items-start">
            {/* 1. Primary Feature */}
            <div className="lg:col-span-2 group border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 pb-8 lg:pb-0 lg:pr-8">
                <Link href={`/${mainSlug}`} className="block overflow-hidden rounded-2xl mb-6 relative aspect-[16/10] shadow-2xl bg-gray-100">
                    <Image
                        src={mainImageUrl}
                        alt={mainPost.title}
                        fill
                        priority
                        sizes="(max-w-768px) 100vw, 800px"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                <Link href={`/${mainSlug}`}>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-gray-900 dark:text-white leading-[1.1] mb-4 hover:text-brand-red transition-colors tracking-tight">
                        {mainPost.title}
                    </h1>
                </Link>
                <div
                    className="text-gray-600 dark:text-gray-400 text-base line-clamp-3 mb-6 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: mainPost.excerpt }}
                />
                <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-gray-100 dark:border-gray-800 pt-4">
                    <span className="bg-brand-red text-white px-2 py-0.5 rounded-sm">Featured</span>
                    <span>{mainDate}</span>
                </div>
            </div>

            {/* 2. Secondary Column (Stack with Images) */}
            <div className="lg:col-span-1 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 pb-8 lg:pb-0 lg:pr-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 border-b border-gray-50 dark:border-gray-800/50 pb-2">
                    Must Read
                </h4>
                {sidePosts.slice(0, 2).map((post) => (
                    <NewsCard key={post.slug} post={post} variant="default" className="border-0 pb-0" />
                ))}
            </div>

            {/* 3. Quick Read Column (Sidebar Style with small Thumbs) */}
            <div className="lg:col-span-1 space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 border-b border-gray-50 dark:border-gray-800/50 pb-2">
                    Latest Updates
                </h4>
                <div className="space-y-4">
                    {sidePosts.slice(2).concat(sidePosts.slice(0, 1)).map((post, i) => (
                        <NewsCard key={post.slug + i} post={post} variant="sidebar" className="border-gray-50 dark:border-gray-800/50" />
                    ))}
                </div>
            </div>
        </div>
    );
}
