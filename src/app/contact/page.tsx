import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | The Bharat Mirror',
  description: 'Contact The Bharat Mirror for support, bug reports, or business inquiries.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Contact Us</h1>
      
      <p className="text-lg mb-10 leading-relaxed">
        We are always here to help. Whether you have a question about one of our calculators, want to report a bug, or have a suggestion for a new tool we should build, we’d love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-blue-500 pl-3">Get In Touch</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-slate-900 mb-1">Email Support:</h3>
            <a href="mailto:admin@thebharatmirror.com" className="text-blue-600 hover:underline">admin@thebharatmirror.com</a>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg text-slate-900 mb-1">Business Inquiries:</h3>
            <a href="mailto:contact@thebharatmirror.com" className="text-blue-600 hover:underline">contact@thebharatmirror.com</a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-blue-500 pl-3">Our Office Location</h2>
          <address className="not-italic leading-relaxed text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <strong>The Bharat Mirror</strong><br />
            Ghaziabad, Uttar Pradesh,<br />
            India - 201014
          </address>
        </section>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl text-blue-900 border border-blue-100">
        <p className="font-medium">
          <strong>Please Note:</strong> We aim to respond to all inquiries within 24 to 48 hours. While we ensure our calculators are as accurate as possible, we cannot provide personalized financial or legal advice.
        </p>
      </div>
    </div>
  );
}
