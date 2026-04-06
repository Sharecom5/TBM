import React from 'react';
import { Shield, Target } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | The Bharat Mirror',
    description: "Learn about the mission, values, and story behind The Bharat Mirror, India's premier digital news platform.",
    alternates: {
        canonical: 'https://www.thebharatmirror.com/about',
    },
};

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505]">
            <div className="bg-brand-red text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">The Mirror of <span className="text-black">Bharat</span></h1>
                <p className="text-red-100 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
                    Dedicated to delivering fast, accurate, and fearless journalism for the modern Indian citizen.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="prose prose-xl dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight border-b-4 border-brand-red w-fit pb-2">Our Mission</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
                        The Bharat Mirror was founded on a simple yet powerful principle: to provide a reflection of our nation that is as clear as a mirror. In an era of misinformation and sensationalism, we stand committed to the core values of journalism—truth, integrity, and objectivity.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <Target className="w-10 h-10 text-brand-red mb-6" />
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Accurate Reporting</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                We don&apos;t just report news; we verify it. Our team of correspondents works around the clock to ensure every story is backed by facts. We adhere to strict fact-checking protocols.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <Shield className="w-10 h-10 text-brand-red mb-6" />
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Fearless Journalism</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                We ask the hard questions. Our editorial team is independent and dedicated to holding power accountable, without fear or favor.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Editorial Standards</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                        The Bharat Mirror follows a strict code of ethics. We separate news from opinion, and we are transparent about our sources. Corrections are made promptly and visibly.
                    </p>

                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Digital First</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        As a headless digital news platform, we leverage the latest technology to bring you news as it happens. From live market updates to deep-dive investigative pieces, The Bharat Mirror is your window into the pulse of India.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
