'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search as SearchIcon, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { searchPosts } from '@/lib/wordpress';
import { PostData } from '@/lib/types';
import NewsCard from '@/components/news/NewsCard';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);
    const [results, setResults] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const posts = await searchPosts(query);
                setResults(posts);
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to fetch search results. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
        setSearchTerm(query);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        if (e) e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <div className="max-w-3xl mx-auto mb-16">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 text-center tracking-tighter">
                    Search <span className="text-brand-red">The Bharat Mirror</span>
                </h1>
                <form onSubmit={handleSearch} className="relative group">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for articles, trends, or markets..."
                        className="w-full pl-14 pr-6 py-5 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-3xl text-lg focus:outline-none focus:border-brand-red transition-all shadow-xl shadow-gray-100/50 dark:shadow-none font-medium text-gray-900 dark:text-white"
                    />
                    <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-red text-white px-6 py-2.5 rounded-2xl font-bold hover:brightness-110 transition-colors"
                    >
                        Search
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-brand-red animate-spin mb-4" />
                    <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Searching Archives...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <p className="text-brand-red font-bold mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="text-brand-red font-bold underline">Try Again</button>
                </div>
            ) : query ? (
                <div>
                    <div className="flex items-center justify-between mb-12 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Results for &quot;<span className="text-brand-red">{query}</span>&quot;
                        </h2>
                        <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">{results.length} articles found</span>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {results.map(post => (
                                <NewsCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">No matching stories found</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium italic">
                                We couldn&apos;t find anything for your search. Try checking your spelling or use more general keywords.
                            </p>
                            <Link href="/" className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-bold hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all uppercase tracking-widest text-xs">
                                Back to Home <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400 font-medium italic">Enter a keyword above to start searching thousands of articles.</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <Loader2 className="w-12 h-12 text-brand-red animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-bold animate-pulse">Initializing Search...</p>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
