import Link from 'next/link';
import { Metadata } from 'next';
import { Sun, Code, Calculator, ArrowRight, Zap, Car, Leaf, LineChart, Code2, Globe } from 'lucide-react';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'Utility Hub | The Bharat Mirror',
  description: 'A suite of powerful calculators and tools for Green Energy, Developers, and Personal Finance.',
};

const CATEGORIES = [
  {
    title: "The Green Energy Utility Box",
    description: "Calculate subsidies, ROI, and costs for renewable energy.",
    icon: <Leaf className="w-6 h-6 text-emerald-500" />,
    color: "bg-emerald-50 border-emerald-100",
    tools: [
      {
        name: "PM Surya Ghar Subsidy Calculator",
        href: "/calculators/pm-surya-ghar-subsidy-calculator",
        icon: <Sun className="w-5 h-5" />,
        isReady: true,
        tag: "High Demand"
      },
      {
        name: "Solar ROI & Payback Estimator",
        href: "#",
        icon: <Zap className="w-5 h-5" />,
        isReady: false
      },
      {
        name: "EV vs. Petrol Cost Comparison",
        href: "#",
        icon: <Car className="w-5 h-5" />,
        isReady: false
      }
    ]
  },
  {
    title: "The Developer & SEO Toolkit",
    description: "Essential tools for web development and optimization.",
    icon: <Code2 className="w-6 h-6 text-blue-500" />,
    color: "bg-blue-50 border-blue-100",
    tools: [
      {
        name: "Website Carbon Footprint Checker",
        href: "#",
        icon: <Globe className="w-5 h-5" />,
        isReady: false
      },
      {
        name: "Meta Tag & SERP Preview Generator",
        href: "#",
        icon: <Code className="w-5 h-5" />,
        isReady: false
      }
    ]
  },
  {
    title: "The Personal Finance Hub",
    description: "Take control of your money with precision tools.",
    icon: <LineChart className="w-6 h-6 text-purple-500" />,
    color: "bg-purple-50 border-purple-100",
    tools: [
      {
        name: "Old vs. New Tax Regime Calculator",
        href: "#",
        icon: <Calculator className="w-5 h-5" />,
        isReady: false
      },
      {
        name: "Mutual Fund SIP Wealth Builder",
        href: "#",
        icon: <LineChart className="w-5 h-5" />,
        isReady: false
      }
    ]
  }
];

export default function UtilityHubIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          The Utility Hub
        </h1>
        <p className="text-lg text-slate-600">
          Powerful calculators and essential tools designed to help you make smarter decisions in finance, renewable energy, and web development.
        </p>
      </div>

      <div className="space-y-12">
        {CATEGORIES.map((category, idx) => (
          <section key={idx} className="scroll-mt-24">
            <div className="flex items-center mb-6">
              <div className={clsx("p-2.5 rounded-xl mr-4 border", category.color)}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{category.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool, tIdx) => (
                <div 
                  key={tIdx} 
                  className={clsx(
                    "group rounded-2xl border p-6 transition-all duration-200",
                    tool.isReady 
                      ? "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 shadow-sm relative overflow-hidden" 
                      : "bg-slate-50/50 border-dashed border-slate-200 opacity-75"
                  )}
                >
                  {tool.isReady && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent opacity-50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-100 transition-opacity"></div>
                  )}
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className={clsx(
                      "p-3 rounded-lg inline-flex mb-4",
                      tool.isReady ? "bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors" : "bg-slate-100 text-slate-400"
                    )}>
                      {tool.icon}
                    </div>
                    {tool.tag && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {tool.tag}
                      </span>
                    )}
                    {!tool.isReady && !tool.tag && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <h3 className={clsx(
                    "text-lg font-bold mb-2 relative z-10",
                    tool.isReady ? "text-slate-900 group-hover:text-emerald-700 transition-colors" : "text-slate-600"
                  )}>
                    {tool.name}
                  </h3>
                  
                  {tool.isReady ? (
                    <Link href={tool.href} className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 mt-4 group/link relative z-10">
                      Open Calculator <ArrowRight className="ml-1.5 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <p className="text-sm text-slate-500 mt-2">In development. Check back later.</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
