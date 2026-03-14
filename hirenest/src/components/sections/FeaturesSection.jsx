"use client"

import { motion } from "framer-motion";
import { ShieldCheck, Link as LinkIcon, Users, MessageSquare, Globe, Zap, Headphones, Sparkles } from "lucide-react";

const features = [
    {
        title: "Secure Escrow Payments",
        description: "Funds are securely held in escrow until the project milestones are approved, protecting both clients and freelancers.",
        icon: ShieldCheck,
        color: "text-primary",
        bgColor: "bg-primary/10"
    },
    {
        title: "Blockchain Transparency",
        description: "Every transaction is recorded transparently ensuring verifiable trust and immutable work history.",
        icon: LinkIcon,
        color: "text-accent",
        bgColor: "bg-accent/10"
    },
    {
        title: "Verified Users",
        description: "Strict identity verification processes eliminate fake profiles and spam, ensuring a professional community.",
        icon: Users,
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    },
    {
        title: "Real-time Collaboration",
        description: "Built-in chat, file sharing, and project tracking to keep communication smooth and efficient.",
        icon: MessageSquare,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    {
        title: "Global Talent Pool",
        description: "Access top-tier professionals from around the world without geographical boundaries.",
        icon: Globe,
        color: "text-blue-400",
        bgColor: "bg-blue-400/10"
    },
    {
        title: "AI-Powered Matching",
        description: "Get smart recommendations for the best freelancers suited to your specific project needs.",
        icon: Sparkles,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10"
    },
    {
        title: "Lightning Fast Hiring",
        description: "Post a job and start receiving high-quality proposals in a matter of minutes.",
        icon: Zap,
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10"
    },
    {
        title: "24/7 Dedicated Support",
        description: "Our world-class support team is always available to help you with any issues or queries.",
        icon: Headphones,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10"
    }
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-card/50">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose HireNest?</h2>
                    <p className="text-muted-foreground text-lg">
                        We solve the biggest challenges in freelancing with cutting-edge technology and a focus on trust.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-card border border-white/5 rounded-2xl p-6 hover:shadow-xl hover:border-white/10 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
