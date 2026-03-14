"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code, PenTool, LayoutTemplate } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-48">
            {/* Creative Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Content */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium backdrop-blur-sm"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
                            Trusted by 10,000+ businesses globally
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                                Empowering the <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                                    Future of Work
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            HireNest is the premium marketplace where elite freelance professionals meet forward-thinking companies. Secure, transparent, and built for speed.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4"
                        >
                            <Link href="/signup?role=client" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-10 group bg-primary hover:bg-primary/90 text-white rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                                    Start Hiring
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/signup?role=freelancer" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-10 rounded-full border-white/10 hover:bg-white/5 hover:border-white/20 transition-all">
                                    Find Work
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Social Proof Mini */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-40 grayscale"
                        >
                            <div className="text-sm font-bold tracking-widest text-white uppercase italic">SaaSify</div>
                            <div className="text-sm font-bold tracking-widest text-white uppercase italic">Nexus</div>
                            <div className="text-sm font-bold tracking-widest text-white uppercase italic">Velocity</div>
                            <div className="text-sm font-bold tracking-widest text-white uppercase italic">Amplify</div>
                        </motion.div>
                    </div>

                    {/* Right: Visual Element */}
                    <div className="flex-1 relative hidden lg:block">
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        x: 0,
                                        y: [0, -20, 0]
                                    }}
                                    transition={{ 
                                        opacity: { duration: 0.8, delay: 0.4 },
                                        x: { duration: 0.8, delay: 0.4 },
                                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="bg-card/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl space-y-4 hover:border-primary/50 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Code size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">Development</h3>
                                        <p className="text-sm text-muted-foreground">Python, React, Node.js</p>
                                    </div>
                                </motion.div>
                                
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        x: 8,
                                        y: [0, 20, 0]
                                    }}
                                    transition={{ 
                                        opacity: { duration: 0.8, delay: 0.6 },
                                        x: { duration: 0.8, delay: 0.6 },
                                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                    }}
                                    className="bg-card/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl space-y-4 hover:border-accent/50 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <PenTool size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">Branding</h3>
                                        <p className="text-sm text-muted-foreground">Logo, UX, Graphics</p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="space-y-4 pt-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        x: 0,
                                        y: [0, -25, 0]
                                    }}
                                    transition={{ 
                                        opacity: { duration: 0.8, delay: 0.5 },
                                        x: { duration: 0.8, delay: 0.5 },
                                        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                                    }}
                                    className="bg-card/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl space-y-4 hover:border-purple-500/50 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                        <LayoutTemplate size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">Marketing</h3>
                                        <p className="text-sm text-muted-foreground">Ads, SEO, Strategy</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        x: 8,
                                        y: [0, 15, 0]
                                    }}
                                    transition={{ 
                                        opacity: { duration: 0.8, delay: 0.7 },
                                        x: { duration: 0.8, delay: 0.7 },
                                        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                                    }}
                                    className="bg-card/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl space-y-4 hover:border-primary/50 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <ArrowRight size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">Explore All</h3>
                                        <p className="text-sm text-muted-foreground">50+ More Skills</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Decorative Background for visuals */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -z-10 rounded-full scale-110" />
                    </div>
                </div>
            </div>
        </section>
    );
}
