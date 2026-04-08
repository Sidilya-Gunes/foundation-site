
import React, { useState } from 'react';
import { sendMessage } from '../services/api';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'Support Request', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendMessage({
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        body: formState.message
      });
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: 'Support Request', message: '' });
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || 'Message could not be sent. Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-24 overflow-hidden animate-in fade-in duration-1000">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-brand-purple-100 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-brand-green-50 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute top-[40%] left-[20%] w-[150px] h-[150px] bg-brand-yellow-400 rounded-full blur-[80px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Text & Contact Info Section */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-brand-purple-500 font-bold uppercase tracking-widest text-sm">Contact & Solidarity</span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-purple-900 leading-tight">
                You Are Not Alone, <br />
                <span className="text-brand-green-500 italic">We Are Here.</span>
              </h1>
              <p className="text-xl text-gray-600 font-light leading-relaxed max-w-lg">
                You can reach out to us for any questions, support requests, or collaboration proposals. Every piece of information you share is safe with us and evaluated within our privacy principles.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-brand-purple-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-purple-100 rounded-xl flex items-center justify-center text-brand-purple-600 mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-brand-purple-900 mb-2">Email</h4>
                <p className="text-sm text-gray-500">info@openheart.org</p>
                <p className="text-sm text-gray-500">destek@openheart.org</p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-brand-purple-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-green-50 rounded-xl flex items-center justify-center text-brand-green-700 mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-brand-purple-900 mb-2">Headquarters</h4>
                <p className="text-sm text-gray-500">Sisli, Istanbul</p>
                <p className="text-sm text-gray-500">Buyukdere Ave. No: 123</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">We are on Social Media</p>
              <div className="flex space-x-4">
                {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                  <a key={platform} href="#" className="px-5 py-2 rounded-full border border-brand-purple-100 text-sm font-medium text-brand-purple-700 hover:bg-brand-purple-500 hover:text-white transition-all">
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-10 lg:p-14 rounded-[2.5rem] shadow-2xl shadow-brand-purple-900/5 border border-brand-purple-50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-3xl font-serif font-bold text-brand-purple-900 mb-8">Send a Message</h3>
            
              {submitted ? (
                <div className="py-20 text-center space-y-4 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-brand-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-green-500/20">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-brand-purple-900">Message Received</h4>
                  <p className="text-gray-500">We will get back to you as soon as possible. In solidarity!</p>
                  <button onClick={() => setSubmitted(false)} className="text-brand-purple-600 font-bold hover:underline mt-4">Send New Message</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-brand-neutral-bg border-2 border-transparent focus:border-brand-purple-200 focus:bg-white rounded-xl px-6 py-4 outline-none transition-all placeholder:text-gray-300" 
                      placeholder="Your Full Name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-brand-neutral-bg border-2 border-transparent focus:border-brand-purple-200 focus:bg-white rounded-xl px-6 py-4 outline-none transition-all placeholder:text-gray-300" 
                      placeholder="example@email.com" 
                    />
                  </div>
  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Subject</label>
                    <select 
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                      className="w-full bg-brand-neutral-bg border-2 border-transparent focus:border-brand-purple-200 focus:bg-white rounded-xl px-6 py-4 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option>Support Request</option>
                      <option>About Volunteering</option>
                      <option>Project Partnership</option>
                      <option>General Inquiries</option>
                    </select>
                  </div>
  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Your Message</label>
                    <textarea 
                      required
                      rows={5} 
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-brand-neutral-bg border-2 border-transparent focus:border-brand-purple-200 focus:bg-white rounded-xl px-6 py-4 outline-none transition-all placeholder:text-gray-300 resize-none" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-purple-900 text-white py-5 rounded-xl font-bold text-xl hover:bg-brand-purple-700 hover:shadow-xl hover:shadow-brand-purple-900/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                       <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : 'Send'}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 italic">
                    * Your data is protected strictly under privacy laws and is not shared with third parties.
                  </p>
                </form>
              )}
          </div>
        </div>

        {/* Support Hotline Banner */}
        <div className="mt-32 bg-brand-yellow-400 rounded-3xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
           <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
           <div className="space-y-2 text-center md:text-left relative z-10">
             <h2 className="text-3xl font-serif font-bold text-brand-purple-900">Donor Hotline</h2>
             <p className="text-brand-purple-900/70 font-medium">Contact us and strengthen solidarity.</p>
           </div>
           <div className="flex items-center space-x-6 relative z-10">
             <div className="text-4xl lg:text-5xl font-serif font-bold text-brand-purple-900">+90 (212) 555 0000</div>
             <button className="hidden lg:flex w-16 h-16 bg-brand-purple-900 text-white rounded-full items-center justify-center hover:bg-brand-purple-700 transition-colors shadow-lg">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
               </svg>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
