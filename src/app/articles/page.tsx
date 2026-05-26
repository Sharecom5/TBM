import React from 'react';
import Link from 'next/link';
import { getSortedArticlesData } from '@/lib/markdown';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles | The Bharat Mirror',
  description: 'Read our latest SEO-optimized guides and articles on green energy, personal finance, and more.',
};

export default function ArticlesIndexPage() {
  const allArticlesData = getSortedArticlesData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Articles & Guides</h1>
      <p className="text-lg text-slate-600 mb-12">
        In-depth resources and guides to help you make the most of our utility tools.
      </p>

      <div className="grid gap-8">
        {allArticlesData.map(({ slug, title, date, description }) => (
          <article key={slug} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              <Link href={`/articles/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h2>
            <p className="text-sm text-slate-500 mb-4">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-slate-700 leading-relaxed">
              {description}
            </p>
            <div className="mt-4">
              <Link href={`/articles/${slug}`} className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
                Read full article &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
