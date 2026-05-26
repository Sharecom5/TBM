import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Bharat Mirror',
  description: 'Privacy Policy for The Bharat Mirror.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
      
      <p className="mb-6 leading-relaxed">
        At The Bharat Mirror, accessible from https://thebharatmirror.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by The Bharat Mirror and how we use it.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
        <p className="mb-4 leading-relaxed">
          <strong>Calculator Inputs:</strong> The data you input into our calculators (e.g., electricity bills, salary details) is processed locally within your web browser to generate results. We do not save, store, or transmit your personal calculator data to our servers.
        </p>
        <p className="leading-relaxed">
          <strong>Log Files:</strong> The Bharat Mirror follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Cookies and Web Beacons</h2>
        <p className="leading-relaxed">
          Like any other website, The Bharat Mirror uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Google DoubleClick DART Cookie</h2>
        <p className="leading-relaxed">
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.thebharatmirror.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Our Advertising Partners</h2>
        <p className="mb-4 leading-relaxed">
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data.
        </p>
        <p className="mb-4 leading-relaxed">
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on The Bharat Mirror, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>
        <p className="leading-relaxed">
          Note that The Bharat Mirror has no access to or control over these cookies that are used by third-party advertisers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Third Party Privacy Policies</h2>
        <p className="leading-relaxed">
          The Bharat Mirror&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Consent</h2>
        <p className="leading-relaxed">
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </section>
    </div>
  );
}
