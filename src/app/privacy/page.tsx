import React from 'react';
import { Shield } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | The Bharat Mirror',
    description: "Our commitment to protecting your privacy and personal data at The Bharat Mirror.",
};

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-xl dark:prose-invert">
                <div className="text-center mb-16">
                    <Shield className="w-16 h-16 text-brand-red mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Privacy <span className="text-brand-red">Policy</span></h1>
                    <p className="text-gray-500 font-medium italic">Last Updated: March 20, 2026</p>
                </div>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Introduction</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    At The Bharat Mirror, accessible from thebharatmirror.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by The Bharat Mirror and how we use it.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Log Files</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    The Bharat Mirror follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Cookies and Web Beacons</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    Like any other website, The Bharat Mirror uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Advertising Partners</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google and other programmatic networks.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Consent</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPage;
