import Link from 'next/link';
import { ArrowRight, Zap, Calculator, Globe } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Bharat Mirror | Utility Hub',
  description: 'Your comprehensive hub for powerful utilities, calculators, and tools.',
};

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-16 sm:py-24">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
          Welcome to <span className="text-emerald-600">The Bharat Mirror</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          We have transitioned into a comprehensive utility hub. Discover our suite of powerful calculators designed to help you make smarter financial and technical decisions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/calculators"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-200"
          >
            Explore Calculators <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            href="/calculators/pm-surya-ghar-subsidy-calculator"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 rounded-full transition-all"
          >
            PM Surya Ghar Calculator
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16 border-t border-slate-100 pt-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Green Energy</h3>
            <p className="text-slate-600">Calculate solar subsidies and ROI for renewable energy investments.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Developer Tools</h3>
            <p className="text-slate-600">Optimize your web presence with our SEO and development tools.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Personal Finance</h3>
            <p className="text-slate-600">Take control of your wealth with precision financial calculators.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
