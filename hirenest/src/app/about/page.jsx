"use client"

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Target, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        {/* About Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-primary/20 text-primary mb-6 px-6 py-2 rounded-full font-bold">OUR STORY</Badge>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                Redefining the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Workforce</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                HireNest was born from a simple idea: that great talent shouldn't be limited by borders, and great companies shouldn't be limited by their local talent pool.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-32 bg-card/20 border-y border-white/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Our Mission</h2>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  To create the world's most trusted and efficient marketplace for professional freelance services. We empower creators to build sustainable careers and businesses to scale without limits.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <Target size={24} />
                    </div>
                    <h3 className="text-white font-bold text-xl">Precision Matching</h3>
                    <p className="text-muted-foreground">Finding the exact right person for the exact right job.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                      <Heart size={24} />
                    </div>
                    <h3 className="text-white font-bold text-xl">Radical Trust</h3>
                    <p className="text-muted-foreground">Building security into every line of code we write.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-[100px] rounded-full" />
                <div className="bg-card border border-white/10 rounded-[3rem] p-4 relative z-10 shadow-3xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Our Team"
                    className="rounded-[2.5rem] w-full h-[500px] object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Talent Network", value: "50k+" },
                { label: "Successful Projects", value: "120k+" },
                { label: "Countries Reached", value: "180+" },
                { label: "Trust Rating", value: "4.9/5" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-4xl md:text-6xl font-black text-white mb-2">{stat.value}</p>
                  <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-gradient-to-b from-transparent to-primary/10">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12">Ready to join the movement?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/signup">
                <Button size="lg" className="h-16 px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                  Join as a Freelancer
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-white/10 hover:bg-white/5 text-white font-bold text-lg">
                  Hire Elite Talent
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
