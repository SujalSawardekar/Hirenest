import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatsSection } from "@/components/sections/StatsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CategoriesSection limit={6} />
        <HowItWorksSection />

        {/* Call to Action Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join thousands of freelancers and clients experiencing the future of work. Sign up today and unlock endless opportunities.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="px-8 h-14 text-base font-semibold group bg-white text-primary hover:bg-gray-100">
                Join HireNest Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
