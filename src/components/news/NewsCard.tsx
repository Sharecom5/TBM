import Link from "next/link";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import { PostData } from "@/lib/types";

interface NewsCardProps {
    post: PostData;
    variant?: "default" | "lead" | "horizontal" | "compact" | "text-only" | "sidebar";
    className?: string;
}

export default function NewsCard({ post, variant = "default", className }: NewsCardProps) {
    const postSlug = post.slug;
    const imageUrl = post.image.url;
    const formattedDate = formatDate(post.date);

    // Variant Styles
    const isLead = variant === "lead";
    const isHorizontal = variant === "horizontal";
    const isCompact = variant === "compact";
    const isTextOnly = variant === "text-only";
    const isSidebar = variant === "sidebar";

    // Determine category slug


    if (isTextOnly) {
        return (
            <div className={cn("group border-b border-gray-100 dark:border-gray-800 py-3 last:border-0 bg-white dark:bg-transparent", className)}>

                <Link href={`/${postSlug}`}>
                    <h3 className="font-serif font-bold text-base text-gray-900 dark:text-gray-100 leading-tight group-hover:text-brand-red transition-colors">
                        {post.title}
                    </h3>
                </Link>
            </div>
        );
    }

    if (isSidebar) {
        return (
            <div className={cn("group flex gap-3 border-b border-gray-100 dark:border-gray-800 py-3 last:border-0 bg-white dark:bg-transparent transition-all hover:bg-gray-50 dark:hover:bg-white/5 px-2 -mx-2 rounded-md", className)}>
                <div className="flex-1 w-0">
                    <Link href={`/${postSlug}`}>
                        <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                            {post.title}
                        </h4>
                    </Link>
                    <span className="text-[10px] text-gray-400 mt-1 block font-medium uppercase tracking-wider">{formattedDate}</span>
                </div>
                {imageUrl && (
                    <Link href={`/${postSlug}`} className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 relative shadow-sm">
                        <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </Link>
                )}
            </div>
        );
    }

    if (isHorizontal) {
        return (
            <div className={cn("group flex gap-5 border-b border-gray-200 dark:border-gray-800 pb-5 mb-5 items-start bg-white dark:bg-transparent hover:translate-x-1 transition-transform", className)}>
                {imageUrl && (
                    <Link href={`/${postSlug}`} className="w-1/3 aspect-[4/3] overflow-hidden rounded-md flex-shrink-0 bg-gray-100 relative shadow-lg">
                        <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-w-768px) 30vw, 200px"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </Link>
                )}
                <div className="flex-1 w-0">

                    <Link href={`/${postSlug}`}>
                        <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                    </Link>
                    <div
                        className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <span className="text-[10px] text-gray-400 mt-3 block font-sans font-bold uppercase tracking-widest">{formattedDate}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "group flex flex-col bg-white dark:bg-transparent transition-all duration-300",
            !isCompact && "border-b border-gray-200 dark:border-gray-800 pb-4",
            className
        )}>
            {imageUrl && (
                <Link href={`/${postSlug}`} className={cn("block overflow-hidden rounded-lg mb-4 relative bg-gray-100 shadow-lg", isLead ? "aspect-[16/9]" : "aspect-[3/2]")}>
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        priority={isLead}
                        sizes={isLead ? "(max-w-768px) 100vw, 800px" : "(max-w-768px) 100vw, 400px"}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </Link>
            )}

            <div className="flex flex-col flex-grow">


                <Link href={`/${postSlug}`}>
                    <h3 className={cn(
                        "font-serif font-bold text-gray-900 dark:text-white mb-2 leading-tight hover:text-brand-red transition-colors line-clamp-3",
                        isLead ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg md:text-xl"
                    )}>
                        {post.title}
                    </h3>
                </Link>

                {(!isCompact || isLead) && (
                    <div
                        className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                )}

                <span className="text-[10px] text-gray-400 mt-auto font-sans font-bold uppercase tracking-widest border-t border-gray-50 dark:border-gray-800 pt-2">
                    {formattedDate}
                </span>
            </div>
        </div>
    );
}
