import React from 'react';
import { Mail, Shield, Zap, Bell } from 'lucide-react';
import { Metadata } from 'next';
import NewsletterWidget from '@/components/news/NewsletterWidget';

export const metadata: Metadata = {
    title: 'Newsletters | The Bharat Mirror',
    description: "Stay ahead with Bharat Daily and our specialized news briefings. Subscribe to the information that matters to you.",
    alternates: {
        canonical: 'https://www.thebharatmirror.com/newsletters',
    },
};

const NewslettersPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505]">
            <div className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-brand-red rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-red rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter relative z-10">
                    Stay <span className="text-brand-red">Ahead</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed relative z-10">
                    Curated journalism delivered straight to your inbox. Join 50,000+ subscribers who start their day with The Bharat Mirror.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 border-b-4 border-brand-red w-fit pb-1">
                                Bharat Daily
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                Our flagship morning briefing. We distill thousands of stories into the 10 most critical updates you need to know before you start your day. Coverage includes national politics, global shifts, markets, and culture.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <Zap className="w-6 h-6 text-brand-red shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Fast-paced</h4>
                                    <p className="text-sm text-gray-500">Read in under 5 minutes</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Shield className="w-6 h-6 text-brand-red shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Curated</h4>
                                    <p className="text-sm text-gray-500">Only the facts that matter</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Bell className="w-6 h-6 text-brand-red shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Daily</h4>
                                    <p className="text-sm text-gray-500">Every morning at 8:00 AM</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Mail className="w-6 h-6 text-brand-red shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Free</h4>
                                    <p className="text-sm text-gray-500">High quality, zero cost</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:scale-110">
                        <NewsletterWidget />
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-20">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-12 text-center uppercase tracking-widest text-sm">Coming Soon</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl opacity-60">
                            <h3 className="font-black text-lg mb-2">Bharat Tech</h3>
                            <p className="text-sm text-gray-500 font-medium">Weekly deep-dives into India&apos;s digital revolution and startup ecosystem.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl opacity-60">
                            <h3 className="font-black text-lg mb-2">Bharat Markets</h3>
                            <p className="text-sm text-gray-500 font-medium">Daily summary of NSE, BSE and global market movements for the modern investor.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl opacity-60">
                            <h3 className="font-black text-lg mb-2">Bharat Opinion</h3>
                            <p className="text-sm text-gray-500 font-medium">Weekly curation of the most thought-provoking essays from our leading columnists.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewslettersPage;
