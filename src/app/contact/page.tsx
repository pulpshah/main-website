import React from "react";
import Link from "next/link";
import ContactForm from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative pb-20 overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-30">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(#8A3FFC_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(#8A3FFC_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-16 px-4">
        <div className="inline-block mb-8">
          <span className="px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-purple-600/20 text-xs font-medium tracking-wider max-w-full break-words text-white shadow-[0_0_10px_2px_rgba(168,85,247,0.75)]">
            Get In Touch With Us
          </span>
        </div>
        
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Background with gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 z-0"></div>
            
            {/* Animated background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl opacity-40 animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-green-500/10 rounded-full blur-3xl opacity-70 animate-pulse delay-1000"></div>
            
            {/* Content */}
            <div className="relative z-10 py-12 px-6 sm:px-12 md:py-16 md:px-16 backdrop-blur-sm">
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Heading */}
                <div className="space-y-4 text-center">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    Contact Pulp AI
                  </h1>
                  <p className="text-xl text-purple-300 font-medium">
                    We&apos;d Love to Hear From You
                  </p>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    Have questions about our platform? Want to schedule a demo? Or simply curious about how Pulp AI can transform your engagement strategy? Reach out to us!
                  </p>
                </div>
                
                <ContactForm />
                
                {/* Alternative Contact Methods */}
                <div className="pt-8 border-t border-gray-800/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="mb-2 flex justify-center">
                        <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
                      <p className="text-gray-300 mt-1">shah@pulp.com.ai</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-pink-500 transition-all">
                      <div className="mb-2 flex justify-center">
                        <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white">Phone</h3>
                      <p className="text-gray-300 mt-1">+1 (917) 757-3992</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-green-500 transition-all">
                      <div className="mb-2 flex justify-center">
                        <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white">Office</h3>
                      <p className="text-gray-300 mt-1">Brooklyn, NY</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="pt-6 mb-4">
                  <div className="flex justify-center">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/40 animate-[pulse_4s_ease-in-out_infinite]"></div>
              <div className="absolute inset-0 rounded-2xl border-2 border-pink-500/30 animate-[pulse_4s_ease-in-out_1s_infinite]"></div>
              <div className="absolute -inset-[1px] rounded-2xl border-[1.5px] border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-[pulse_3s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
