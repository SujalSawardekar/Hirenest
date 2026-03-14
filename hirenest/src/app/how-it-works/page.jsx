"use client"

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        
        {/* Impactful Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-background">
           <div className="absolute inset-0 z-0">
             <div className="absolute top-0 right-1/4 w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-8 border-0 px-6 py-2 text-sm font-bold rounded-full">
              THE PLATFORM FOR THE TOP 1%
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              A seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">collaboration</span> journey
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              We've re-engineered the freelance experience from the ground up to be secure, fast, and entirely friction-free.
            </p>
          </div>
        </section>

        {/* The 3-Step Journey Section */}
        <HowItWorksSection />

        {/* Why HireNest Section - Creative Visual */}
        <section className="py-32 bg-background border-t border-white/5">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-[100px] rounded-full opacity-50" />
                        <div className="bg-card/50 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 relative z-10 shadow-2xl overflow-hidden">
                             <div className="absolute top-0 right-0 p-8">
                                 <Sparkles className="w-12 h-12 text-primary/40" />
                             </div>
                             <h3 className="text-3xl font-bold text-white mb-8">What makes us different?</h3>
                             <div className="space-y-8">
                                {[
                                    { t: "AI Matching", d: "Our proprietary algorithm analyzes 50+ data points to find your perfect match." },
                                    { t: "Elite Talent", d: "Only 3% of applicants pass our rigorous vetting and identity checks." },
                                    { t: "Fast Payments", d: "Experience near-instant fund releases once milestones are approved." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-1 h-auto bg-gradient-to-b from-primary to-accent rounded-full shrink-0" />
                                        <div>
                                            <h4 className="text-white font-bold text-xl mb-2">{item.t}</h4>
                                            <p className="text-muted-foreground leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Built for those who <br /> refuse to <span className="text-primary tracking-widest uppercase italic text-3xl md:text-5xl">settle</span></h2>
                        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                            Stop wasting time with unreliable platforms. Join thousands of world-class freelancers and forward-thinking companies already winning on HireNest.
                        </p>
                        <Link href="/signup">
                            <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-white text-black hover:bg-gray-100 flex items-center gap-3">
                                Get Started Today <ArrowRight />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* Refined FAQ Section */}
        <section className="py-32 bg-card/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Everything you need <br /> to <span className="text-accent underline decoration-primary underline-offset-8">know</span></h2>
              <p className="text-xl text-muted-foreground">Common questions about our high-performance platform.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-6">
              {[
                  { q: "How does the escrow system work?", a: "When a client hires a freelancer, they deposit the project funds into our secure escrow system. The funds remain locked until the freelancer delivers the agreed-upon work and the client approves it. This guarantees that freelancers get paid for their work and clients get the quality they expect." },
                  { q: "How do you verify freelancers?", a: "Every freelancer on HireNest goes through a rigorous multi-step verification process. This includes identity verification, portfolio review, skill assessments, and continuous monitoring of their platform ratings and reviews to maintain high quality." },
                  { q: "What happens if there is a dispute?", a: "We have a dedicated human dispute resolution team. If a disagreement occurs that cannot be resolved between the client and freelancer directly, our team will step in, review all platform communications and deliverables, and make a fair, binding decision regarding the escrowed funds." },
                  { q: "Are there any hidden fees?", a: "No. We believe in absolute transparency. Clients pay exactly the milestone amount plus a standard % processing fee clearly shown at checkout. Freelancers see exactly how much they will earn after platform fees before they ever accept a contract." }
              ].map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-[2rem] px-8 py-2 hover:border-primary/40 transition-all shadow-sm">
                    <AccordionTrigger className="text-white hover:text-primary transition-colors text-xl font-bold py-6 no-underline">
                        {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8 pt-2">
                        {item.a}
                    </AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
