"use client"

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        <section className="relative pt-32 pb-24 overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <Badge className="bg-accent/20 text-accent mb-6 px-6 py-2 rounded-full font-bold">CONTACT US</Badge>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">touch</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Have a question or just want to say hi? We'd love to hear from you. Our team typically responds within 2 hours during business hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-accent/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Email Us</h3>
                  <p className="text-muted-foreground mb-4">Detailed inquiries & support</p>
                  <a href="mailto:support@hirenest.com" className="text-primary font-bold hover:underline">support@hirenest.com</a>
                </div>
                
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-primary/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Call Us</h3>
                  <p className="text-muted-foreground mb-4">Monday - Friday, 9am - 6pm</p>
                  <a href="tel:+1234567890" className="text-primary font-bold hover:underline">+1 (234) 567-890</a>
                </div>

                <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-purple-500/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">Studio 42, Innovation Hub<br />Silicon Valley, CA</p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 h-full shadow-2xl">
                  <form className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-white uppercase tracking-widest">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary/50 transition-all" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-white uppercase tracking-widest">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary/50 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-white uppercase tracking-widest">Subject</label>
                      <input type="text" placeholder="How can we help?" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary/50 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-white uppercase tracking-widest">Message</label>
                      <textarea rows={6} placeholder="Tell us more about your project..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-primary/50 transition-all resize-none"></textarea>
                    </div>
                    <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg flex items-center gap-3">
                      Send Message <Send size={20} />
                    </Button>
                  </form>
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
