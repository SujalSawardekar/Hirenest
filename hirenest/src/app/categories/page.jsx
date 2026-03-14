"use client"

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Sparkles, Bot } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        
        {/* Categories Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">Marketplace</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
                Explore our curated directory of high-end professional services. Find the perfect talent for your next breakthrough project.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto relative mb-12 group"
            >
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service are you looking for?" 
                className="w-full h-16 pl-16 pr-6 rounded-3xl bg-card border border-white/10 text-white text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-2xl"
              />
              <div className="absolute right-2 top-2 bottom-2">
                <Button className="h-full rounded-2xl px-10 bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                  Search
                </Button>
              </div>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 text-muted-foreground bg-white/5 py-1 px-3 rounded-full"><TrendingUp className="w-4 h-4 text-primary" /> Trending Now:</span>
              {["Full Stack", "AI Engineer", "UX Research", "Video Editing"].map((item) => (
                <button 
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="text-white hover:text-primary transition-colors bg-white/5 hover:bg-white/10 py-1 px-4 rounded-full border border-white/5"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section with search filter */}
        <section className="bg-background relative py-20">
            <div className="container mx-auto px-4 lg:px-8">
                {searchQuery && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white">Results for "{searchQuery}"</h2>
                    </div>
                )}
                <CategoriesSection searchQuery={searchQuery} />
            </div>
        </section>

        {/* Call to action */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Post a job with your specific requirements and let our AI matching system connect you with the perfect freelancers automatically.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-background hover:bg-gray-200 rounded-full px-8 text-base font-semibold">
                Post a Job Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
