import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | The Bharat Mirror',
  description: 'Learn about The Bharat Mirror and our mission to provide accurate utility tools for Indian users.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">About Us</h1>
      
      <p className="text-lg mb-8 leading-relaxed">
        Welcome to The Bharat Mirror, your trusted hub for fast, accurate, and free utility tools designed specifically for Indian users.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">Our Mission</h2>
        <p className="mb-4 leading-relaxed">
          Navigating government schemes, calculating complex taxes, or estimating everyday finances can be overwhelming. The Bharat Mirror was built to solve this problem. Our mission is to transform complex financial and technical guidelines—like the PM Surya Ghar Yojana or the latest Income Tax slabs—into simple, easy-to-use calculators.
        </p>
        <p className="leading-relaxed">
          We believe that every Indian deserves access to transparent data to make informed decisions about their money, energy consumption, and business.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">What We Do</h2>
        <p className="leading-relaxed">
          Unlike traditional news sites, we focus entirely on interactive utilities. From solar subsidy estimators to financial calculators and web development tools, we build lightweight, mobile-friendly applications that give you the answers you need in seconds.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">Our Commitment to Accuracy and Privacy</h2>
        <p className="mb-4 leading-relaxed">
          We regularly update our tools to reflect the latest 2026 government guidelines and market rates. More importantly, we respect your privacy. The data you enter into our calculators (such as your electricity bill or salary) is processed directly in your browser. We do not store your personal calculator inputs on our servers.
        </p>
        <p className="font-semibold text-lg mt-8 text-emerald-700">
          Thank you for trusting The Bharat Mirror.
        </p>
      </section>
    </div>
  );
}
