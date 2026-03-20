import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer | The Bharat Mirror',
    description: "Legal disclaimer regarding the accuracy, completeness, and reliability of information on The Bharat Mirror.",
};

const DisclaimerPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-xl dark:prose-invert">
                <div className="text-center mb-16">
                    <AlertCircle className="w-16 h-16 text-brand-red mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Legal <span className="text-brand-red">Disclaimer</span></h1>
                    <p className="text-gray-500 font-medium italic">Last Updated: March 20, 2026</p>
                </div>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">General Information</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    The information provided by The Bharat Mirror (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) on thebharatmirror.com (the &quot;Site&quot;) is for general informational purposes only. All information on the Site is provided in good faith.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">External Links</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Professional Disclaimer</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    The Site cannot and does not contain legal/medical/financial/fitness advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Errors and Omissions</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, The Bharat Mirror is not responsible for any errors or omissions, or for the results obtained from the use of this information.
                </p>

                <div className="mt-16 text-center">
                    <p className="text-sm opacity-50">© 2026 The Bharat Mirror. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerPage;
