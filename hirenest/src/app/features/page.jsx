import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        
        {/* Features Hero */}
        <section className="relative pt-24 pb-20 overflow-hidden bg-card border-b border-white/5">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-6 border-0 px-4 py-1.5 text-sm">
              Platform Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight max-w-4xl mx-auto">
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">scale your workforce</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
              HireNest provides a comprehensive suite of tools designed to make hiring, collaborating, and paying freelancers safer and faster than ever before.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 h-14 px-8 text-base rounded-full shadow-[0_0_40px_rgba(79,70,229,0.3)]">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Existing Component */}
        <FeaturesSection />

        {/* Deep Dive Section */}
        <section className="py-24 bg-background border-t border-white/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built for absolute security and peace of mind</h2>
                <div className="space-y-6">
                  {[
                    "Escrow protection on every single milestone",
                    "Mandatory KYC verification for high-value contracts",
                    "Dispute resolution mediated by human experts",
                    "SSL encrypted communications and file transfers"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                      <p className="text-lg text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full"></div>
                <div className="bg-card border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">100% Secure System</h4>
                      <p className="text-sm text-green-400">System Status: Active</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[95%] rounded-full"></div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-[88%] rounded-full"></div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[99%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
