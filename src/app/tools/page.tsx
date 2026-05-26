"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ALL_TOOLS = [
  {
    id: 'pm-surya-ghar',
    title: "PM Surya Ghar Payouts",
    description: "Calculate your exact rooftop solar setup size, central CFA subsidy, and state top-ups instantly.",
    link: "/tools/green-energy/pm-surya-ghar-calculator",
    category: "Green Energy & Sustainability",
    categoryId: "green-energy"
  },
  {
    id: 'ev-cost',
    title: "EV vs. Petrol Cost Estimator",
    description: "Compare the 5-year running costs of electric vehicles against petrol cars based on daily commute.",
    link: "/tools/green-energy/ev-cost-calculator",
    category: "Green Energy & Sustainability",
    categoryId: "green-energy"
  },
  {
    id: 'tax-regime',
    title: "Old vs. New Tax Regime",
    description: "Input your income and deductions to see which Indian tax slab saves you the most money this fiscal year.",
    link: "/tools/finance/old-vs-new-tax-calculator",
    category: "Finance & Taxation",
    categoryId: "finance"
  },
  {
    id: 'sip-builder',
    title: "Mutual Fund SIP Builder",
    description: "Visualize the power of compounding on your monthly systematic investment plans over time.",
    link: "/tools/finance/sip-wealth-builder",
    category: "Finance & Taxation",
    categoryId: "finance"
  },
  {
    id: 'css-grid',
    title: "CSS Grid Code Generator",
    description: "A visual interface to adjust layout parameters and instantly output clean, production-ready CSS.",
    link: "/tools/web-dev/css-grid-generator",
    category: "Web Developer Toolkit",
    categoryId: "web-dev"
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'green-energy', label: 'Green Energy' },
  { id: 'finance', label: 'Finance' },
  { id: 'web-dev', label: 'Web Dev' }
];

export default function ToolsHubIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = ALL_TOOLS.filter(tool => {
    const searchString = searchQuery.toLowerCase();
    const matchesSearch = 
      tool.title.toLowerCase().includes(searchString) ||
      tool.description.toLowerCase().includes(searchString);
    
    const matchesCategory = activeCategory === 'all' || tool.categoryId === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Group filtered tools by category
  const toolsByCategory = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof ALL_TOOLS>);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16 font-sans">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Free Interactive Calculators for Everyday Decisions.
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          The Bharat Mirror Utility Hub: Fast, accurate, and completely free tools.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a tool (e.g., 'Tax' or 'Solar')..." 
            className="w-full px-6 py-4 rounded-full border border-slate-300 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors pointer-events-none">
            Search
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold border transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-transparent text-slate-500 border-slate-300 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {Object.entries(toolsByCategory).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-slate-500">No tools found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-4 text-blue-600 hover:underline font-semibold"
          >
            Clear filters
          </button>
        </div>
      ) : (
        Object.entries(toolsByCategory).map(([category, tools]) => (
          <section key={category} className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-6">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map(tool => (
                <Link key={tool.id} href={tool.link} className="group bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-600">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h3>
                    <p className="text-sm text-slate-500 mb-6">{tool.description}</p>
                  </div>
                  <span className="text-blue-600 font-semibold text-sm flex items-center group-hover:text-blue-700">
                    Open Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
