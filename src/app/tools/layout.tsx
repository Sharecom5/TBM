import React from 'react';
import Link from 'next/link';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Bharat Mirror - Interactive Tools & Utilities Hub',
  description: 'Free, fast, and accurate interactive calculators for everyday decisions.',
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Utilities Header/Nav (Optional - could integrate into main layout later) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-slate-900">
            The Bharat Mirror
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/tools" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
              Utility Hub
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} The Bharat Mirror. All calculations are estimated.</p>
        </div>
      </footer>
    </div>
  );
}
