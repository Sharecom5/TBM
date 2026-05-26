import React from 'react';
import { getArticleData, getAllArticleSlugs } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const paths = getAllArticleSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const articleData = getArticleData(params.slug);
    return {
      title: `${articleData.title} | The Bharat Mirror`,
      description: articleData.description,
    };
  } catch {
    return {
      title: 'Article Not Found',
    };
  }
}

export default function ArticlePage({ params }: Props) {
  let articleData;
  try {
    articleData = getArticleData(params.slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      <Link href="/articles" className="text-blue-600 hover:underline mb-8 inline-block font-semibold">
        &larr; Back to Articles
      </Link>
      
      <article className="prose prose-slate lg:prose-lg mx-auto">
        <header className="mb-10 pb-8 border-b border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            {articleData.title}
          </h1>
          <time className="text-slate-500 font-medium">
            {new Date(articleData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </header>
        
        <div className="mt-8 prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:text-blue-800 prose-li:my-1">
          <ReactMarkdown>{articleData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
