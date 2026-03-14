"use client"

import { motion } from "framer-motion";
import { Search, FileSearch, UserCheck, CreditCard, Send, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        title: "Post a Job",
        description: "Provide details about your project, required skills, and budget to attract top talent.",
        icon: Search,
    },
    {
        title: "Hire Top Talent",
        description: "Review proposals, chat with candidates, and hire the perfect fit for your needs.",
        icon: UserCheck,
    },
    {
        title: "Secure Payment",
        description: "Fund your project securely. The money is held in escrow until you approve the work.",
        icon: CreditCard,
    }
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-24 bg-card/30 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How HireNest Works</h2>
                    <p className="text-muted-foreground text-lg">
                        A simple, secure, and transparent process designed for maximum efficiency.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative text-center"
                        >
                            <div className="mx-auto w-24 h-24 bg-card border-2 border-primary rounded-full flex items-center justify-center mb-6 relative z-10 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
                                <step.icon className="w-10 h-10 text-primary" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center border-4 border-background">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed px-4">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
