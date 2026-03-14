"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Trust", href: "#stats" },
        { name: "About Us", href: "/about" },
        { name: "Features", href: "/features" },
        { name: "Categories", href: "/categories" },
        { name: "How it Works", href: "/how-it-works" },
    ];

    return (
        <header className="fixed bottom-6 lg:bottom-auto lg:top-0 z-50 w-full px-4 lg:px-8 lg:pt-6">
            <div className="container mx-auto">
                <div className="bg-card/40 backdrop-blur-2xl border border-white/10 rounded-3xl h-20 flex items-center justify-between px-8 shadow-2xl relative overflow-hidden">
                    {/* Interior glow - Top for desktop, bottom for mobile */}
                    <div className="absolute top-0 lg:top-0 bottom-auto lg:bottom-auto left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    <div className="absolute bottom-0 lg:hidden left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center space-x-3 group shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="inline-block font-black text-2xl tracking-tighter text-white">HireNest</span>
                        </Link>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-bold transition-all hover:text-primary ${
                                        pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link href="/login">
                                <Button variant="ghost" className="text-white font-bold hover:bg-white/5 px-6">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="bg-white text-black hover:bg-white/90 font-bold px-8 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                                    Join Now
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay - Slides up from bottom */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="lg:hidden absolute bottom-28 left-4 right-4 z-40"
                        >
                            <div className="bg-card/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl space-y-6">
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-lg font-bold transition-all ${
                                                pathname === item.href ? 'text-primary' : 'text-white/70'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                
                                <div className="h-[1px] bg-white/10 w-full"></div>
                                
                                <div className="flex flex-col gap-4">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 text-white font-bold text-lg">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
                                            Join Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
