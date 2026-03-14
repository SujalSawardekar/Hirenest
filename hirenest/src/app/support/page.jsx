"use client"

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, MessageCircle, FileQuestion, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <Navbar />
      <main className="flex-1 mt-16">
        <section className="relative pt-32 pb-24 overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto mb-8 text-primary shadow-2xl">
                <Headphones size={40} />
              </div>
              <Badge className="bg-primary/20 text-primary mb-6 px-6 py-2 rounded-full font-bold">24/7 CUSTOMER SUPPORT</Badge>
              <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">We're here to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">support</span> your growth</h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Whether you're a freelancer building your career or a business scaling up, our dedicated support team is ready to help you navigate every challenge.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-card/20 border-y border-white/5">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: MessageCircle, title: "Live Chat", desc: "Average response time: < 5 minutes", action: "Start Chat", color: "primary" },
                        { icon: Mail, title: "Email Support", desc: "For complex inquiries and technical help", action: "Send Email", color: "accent" },
                        { icon: FileQuestion, title: "Knowledge Base", desc: "Self-service guides and documentation", action: "Browse Docs", color: "white" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border border-white/10 rounded-[3rem] p-10 hover:border-primary/40 transition-all text-center group"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center mx-auto mb-8 text-${item.color} group-hover:scale-110 transition-transform`}>
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">{item.desc}</p>
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5 font-bold">
                                {item.action}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-32">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-card to-background border border-white/10 rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Priority Support for <span className="text-primary italic">Enterprise</span> Clients</h2>
                            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                                Get a dedicated account manager, 1-hour SLA responses, and custom onboarding for your entire team. Join the companies scaling faster with HireNest Enterprise.
                            </p>
                            <Button size="lg" className="rounded-full h-16 px-12 bg-white text-black hover:bg-gray-100 font-black text-lg">
                                Contact Sales
                            </Button>
                        </div>
                        <div className="w-full md:w-1/3 aspect-square rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center">
                            <Globe size={120} className="text-primary/20 animate-pulse" />
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
