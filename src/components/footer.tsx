import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <Image 
                src="/horizontal-logo.svg" 
                alt="Pulp Logo" 
                width={143} 
                height={34} 
                priority
              />
            </Link>
          </div>
          
          {/* Navigation Sections */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company Section */}
            <div>
              <h3 className="text-white font-medium mb-4">COMPANY</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-zinc-400 hover:text-white text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-zinc-400 hover:text-white text-sm">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-zinc-400 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Technology Section */}
            <div>
              <h3 className="text-white font-medium mb-4">TECHNOLOGY</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/api-sdk" className="text-zinc-400 hover:text-white text-sm">
                    API/SDK
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-zinc-400 hover:text-white text-sm">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Use Cases Section */}
            <div>
              <h3 className="text-white font-medium mb-4">USE CASES</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/solutions/intelligent-communication" className="text-zinc-400 hover:text-white text-sm">
                    Intelligent Communication
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/automated-analysis" className="text-zinc-400 hover:text-white text-sm">
                    Automated Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/audience-simulations" className="text-zinc-400 hover:text-white text-sm">
                    Audience Simulations
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/content-moderation" className="text-zinc-400 hover:text-white text-sm">
                    Content Moderation
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/knowledge-synthesis" className="text-zinc-400 hover:text-white text-sm">
                    Knowledge Synthesis
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/adaptive-chatbots" className="text-zinc-400 hover:text-white text-sm">
                    Adaptive Chatbots
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Industries Section */}
            <div>
              <h3 className="text-white font-medium mb-4">INDUSTRIES</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/industries/technology" className="text-zinc-400 hover:text-white text-sm">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/industries/government" className="text-zinc-400 hover:text-white text-sm">
                    Government & Civic Engagement
                  </Link>
                </li>
                <li>
                  <Link href="/industries/marketing" className="text-zinc-400 hover:text-white text-sm">
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/industries/education" className="text-zinc-400 hover:text-white text-sm">
                    Education
                  </Link>
                </li>
                <li>
                  <Link href="/industries/professional-services" className="text-zinc-400 hover:text-white text-sm">
                    Professional Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm text-center">© {new Date().getFullYear()} Pulp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 