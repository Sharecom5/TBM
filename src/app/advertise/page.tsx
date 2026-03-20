import React from 'react';
import { Mail, Globe, Target } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Advertise with Us | The Bharat Mirror',
    description: "Grow your brand with India's premier digital news platform. Discover our advertising and partnership opportunities.",
};

const AdvertisePage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505]">
            <div className="bg-brand-red text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">Grow with <span className="text-black">Bharat</span></h1>
                <p className="text-red-100 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
                    Partner with India&apos;s fastest-growing digital news network to reach millions of engaged readers.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="prose prose-xl dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight border-b-4 border-brand-red w-fit pb-2">Why Partner with Us?</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
                        The Bharat Mirror provides a premium environment for brands. Our readers are influential, informed, and highly engaged with our high-quality journalism across news, business, technology, and sports.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <Target className="w-8 h-8 text-brand-red mb-4" />
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Targeted Reach</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Reach specific demographics through our specialized sections and geographic targeting.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <Globe className="w-8 h-8 text-brand-red mb-4" />
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Global Audience</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Our platform attracts readers from across India and around the world.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <Mail className="w-8 h-8 text-brand-red mb-4" />
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Direct Impact</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Leverage our high-CTR ad placements and sponsored content opportunities.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Our Ad Units</h2>
                    <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700 dark:text-gray-300 mb-12">
                        <li><strong>Display Ads:</strong> Premium banners across desktop and mobile.</li>
                        <li><strong>Sponsored Articles:</strong> Native content that tells your brand story effectively.</li>
                        <li><strong>Newsletter Sponsorship:</strong> Reach our subscribers directly in their inbox.</li>
                        <li><strong>Video Integration:</strong> High-impact pre-roll and mid-roll opportunities.</li>
                    </ul>

                    <div className="bg-black dark:bg-white text-white dark:text-black p-12 rounded-[2.5rem] text-center">
                        <h2 className="text-3xl font-black mb-6 tracking-tight">Ready to Start?</h2>
                        <p className="mb-8 opacity-80 max-w-lg mx-auto">Get in touch with our partnerships team to discuss custom campaigns and media kits.</p>
                        <a href="mailto:ads@thebharatmirror.com" className="bg-brand-red text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all inline-block">Contact Ad Sales</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisePage;
