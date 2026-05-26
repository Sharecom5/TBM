'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, Linkedin, Loader2 } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulated network request (Backend removed)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505]">
            {/* Header Section */}
            <div className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Get in <span className="text-brand-red">Touch</span></h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                    Have a news tip, feedback, or an advertising inquiry? Reach out to the editorial team at The Bharat Mirror.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 bg-red-50 dark:bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-6">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Email Us</h3>
                            <p className="text-gray-500 text-sm mb-4 font-medium">For inquiries and news tips:</p>
                            <a href="mailto:contact@thebharatmirror.com" className="text-brand-red font-bold hover:underline break-all">contact@thebharatmirror.com</a>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 bg-red-50 dark:bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-6">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Our Office</h3>
                            <p className="text-gray-500 text-sm mb-4 font-medium">Headquarters:</p>
                            <p className="text-gray-900 dark:text-gray-300 font-bold leading-relaxed">
                                New Delhi, India<br />
                                Digital Media Center, Block 12
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 bg-red-50 dark:bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-6">
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Connect</h3>
                            <p className="text-gray-500 text-sm mb-4 font-medium">Follow our professional network:</p>
                            <a href="https://linkedin.com/company/thebharatmirror" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-300 font-bold hover:text-brand-red transition-colors uppercase tracking-widest text-xs">LinkedIn Profile</a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8 bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                        {submitted ? (
                            <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MessageSquare className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Message Received!</h2>
                                <p className="text-gray-500 max-w-sm mx-auto font-medium mb-8 leading-relaxed">
                                    Thank you for reaching out. Our editorial team will review your message and get back to you if necessary.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-red outline-none transition-all font-medium text-gray-900 dark:text-white"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-red outline-none transition-all font-medium text-gray-900 dark:text-white"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-red outline-none transition-all font-medium text-gray-900 dark:text-white"
                                        placeholder="What is this regarding?"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Message Content</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-red outline-none transition-all font-medium resize-none text-gray-900 dark:text-white"
                                        placeholder="Type your message here..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-brand-red hover:bg-black dark:hover:bg-white text-white dark:hover:text-black'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            Send Secure Message <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
