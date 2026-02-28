'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Calendar, Copy, Check, Send, ExternalLink, ShieldCheck } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
}

export default function SocialAdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [secret, setSecret] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [indexingStatus, setIndexingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [indexingError, setIndexingError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Try internal API proxy first
                let res = await fetch('/api/posts');

                // Fallback to direct fetch if proxy fails (or returns non-ok)
                if (!res.ok) {
                    res = await fetch('https://admin.thebharatmirror.com/wp-json/wp/v2/posts?per_page=10');
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    const normalized = data.map((p: any) => {
                        // Handle both normalized PostData (from /api/posts) and raw WPPost (from fallback)
                        const titleRaw = typeof p.title === 'string' ? p.title : (p.title?.rendered || 'No Title');
                        const excerptRaw = typeof p.excerpt === 'string' ? p.excerpt : (p.excerpt?.rendered || '');

                        return {
                            id: p.id,
                            title: titleRaw.replace(/&amp;/g, '&').replace(/&#8217;/g, "'"),
                            excerpt: excerptRaw.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
                            slug: p.slug,
                            date: p.date
                        };
                    });
                    setPosts(normalized);
                    if (normalized.length > 0) setSelectedPost(normalized[0]);
                } else {
                    console.error('Data is not an array:', data);
                    setPosts([]);
                }
            } catch (err) {
                console.error('Failed to fetch posts', err);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const generateLinkedInPost = (post: Post) => {
        const siteUrl = 'https://thebharatmirror.com';
        const link = `${siteUrl}/${post.slug}?utm_source=linkedin&utm_medium=social&utm_campaign=auto_post`;

        // Dynamic hooks based on content keywords could be added later
        const hooks = [
            "India’s economic landscape is undergoing a critical transformation that industry leaders cannot afford to overlook.",
            "The latest developments in the region highlight a strategic shift that will redefine clinical and social standards.",
            "Staying ahead in today's fast-paced digital economy requires access to verified and timely insights."
        ];
        const randomHook = hooks[post.id % hooks.length];

        return `${randomHook}\n\n${post.excerpt}\n\nUnderstanding these nuances is essential for anyone navigating the current environment.\n\nHow do you foresee these changes impacting your sector in the coming months? \n\nRead full story here:\n${link}\n\n#IndiaNews #BusinessInsights #BreakingNews #TheBharatMirror #Leadership`;
    };

    const handleCopy = () => {
        if (!selectedPost) return;
        navigator.clipboard.writeText(generateLinkedInPost(selectedPost));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleIndexing = async () => {
        if (!selectedPost || !secret) return;
        setIndexingStatus('loading');
        setIndexingError('');

        try {
            const res = await fetch(`/api/indexing?slug=${selectedPost.slug}&secret=${secret}&action=updated`, {
                method: 'GET',
            });
            const data = await res.json();

            if (res.ok && data.success !== false) {
                setIndexingStatus('success');
            } else {
                setIndexingStatus('error');
                setIndexingError(data.error || data.details || 'Indexing failed');
            }
        } catch (err: unknown) {
            setIndexingStatus('error');
            setIndexingError(err instanceof Error ? err.message : 'Network error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                        Social <span className="text-brand-red">Admin Hub</span>
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">
                        Generate professional content and trigger instant Google indexing.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Select Post Column */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Send className="w-5 h-5 text-brand-red" />
                                Recent Articles
                            </h2>
                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                {posts.map((post) => (
                                    <button
                                        key={post.id}
                                        onClick={() => setSelectedPost(post)}
                                        className={`w-full text-left p-3 rounded-xl transition-all border ${selectedPost?.id === post.id
                                            ? 'bg-red-50 dark:bg-red-900/20 border-brand-red ring-1 ring-brand-red'
                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 hover:border-brand-red/50'
                                            }`}
                                    >
                                        <p className="text-sm font-bold line-clamp-2 mb-1">{post.title}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Generator Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {selectedPost && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        LinkedIn Optimizer
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full text-sm font-bold hover:scale-105 transition-transform"
                                        >
                                            {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copySuccess ? 'Copied!' : 'Copy Post'}
                                        </button>
                                        <a
                                            href={`https://thebharatmirror.com/${selectedPost.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                            {generateLinkedInPost(selectedPost)}
                                        </pre>
                                    </div>
                                </div>

                                {/* Security & Indexing Section */}
                                <div className="p-6 bg-brand-red/5 dark:bg-brand-red/10 border-t border-brand-red/20">
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-black uppercase tracking-widest text-brand-red mb-2 flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" />
                                                Admin Auth Secret
                                            </label>
                                            <input
                                                type="password"
                                                value={secret}
                                                onChange={(e) => setSecret(e.target.value)}
                                                placeholder="Enter Webhook Secret"
                                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-red outline-none"
                                            />
                                        </div>
                                        <button
                                            onClick={handleIndexing}
                                            disabled={indexingStatus === 'loading' || !secret}
                                            className={`px-8 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${indexingStatus === 'success'
                                                ? 'bg-green-600 text-white'
                                                : indexingStatus === 'error'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-brand-red text-white hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale'
                                                }`}
                                        >
                                            {indexingStatus === 'loading' ? 'Processing...' :
                                                indexingStatus === 'success' ? 'Indexed!' :
                                                    indexingStatus === 'error' ? 'Retry Indexing' : 'Instant Index'}
                                        </button>
                                    </div>
                                    {indexingStatus === 'error' && (
                                        <p className="mt-2 text-[10px] text-red-600 font-bold uppercase tracking-wider animate-pulse">
                                            Error: {indexingError}
                                        </p>
                                    )}
                                    {indexingStatus === 'success' && (
                                        <p className="mt-2 text-[10px] text-green-600 font-bold uppercase tracking-wider">
                                            ✨ Google has been notified successfully!
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <footer className="mt-12 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} The Bharat Mirror &bull; Next.js Admin Engine
                </footer>
            </div>
        </div>
    );
}
