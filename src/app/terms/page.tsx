import React from 'react';
import { Scale } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | The Bharat Mirror',
    description: "Read the rules and conditions for using The Bharat Mirror's news platform and digital services.",
};

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-xl dark:prose-invert">
                <div className="text-center mb-16">
                    <Scale className="w-16 h-16 text-brand-red mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Terms of <span className="text-brand-red">Service</span></h1>
                    <p className="text-gray-500 font-medium italic">Last Updated: March 20, 2026</p>
                </div>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Terms</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    By accessing the website at thebharatmirror.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Use License</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    Permission is granted to temporarily download one copy of the materials (information or software) on The Bharat Mirror&apos;s website for personal, non-commercial transitory viewing only.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Disclaimer</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    The materials on The Bharat Mirror&apos;s website are provided on an &apos;as is&apos; basis. The Bharat Mirror makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Governing Law</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>

                <div className="mt-16 text-center">
                    <p className="text-sm opacity-50">© 2026 The Bharat Mirror. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
