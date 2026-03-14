"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Users, Briefcase, Globe, Star } from "lucide-react";

const Counter = ({ value, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseFloat(value);
            if (start === end) return;

            let totalMiliseconds = duration * 1000;
            let incrementTime = (totalMiliseconds / end);

            let timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
};

const stats = [
    {
        label: "Talent Network",
        value: "50",
        suffix: "k+",
        icon: Users,
        color: "from-blue-500 to-cyan-400"
    },
    {
        label: "Successful Projects",
        value: "120",
        suffix: "k+",
        icon: Briefcase,
        color: "from-purple-500 to-pink-500"
    },
    {
        label: "Countries Reached",
        value: "180",
        suffix: "+",
        icon: Globe,
        color: "from-amber-500 to-orange-500"
    },
    {
        label: "Trust Rating",
        value: "4.9",
        suffix: "/5",
        icon: Star,
        color: "from-green-500 to-emerald-400",
        isFloat: true
    }
];

export function StatsSection() {
    return (
        <section id="stats" className="py-20 relative overflow-hidden bg-background">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-[2.5rem] bg-card/30 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all hover:bg-card/50">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} p-4 flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                
                                <div className="space-y-1">
                                    <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                        {stat.isFloat ? (
                                            <span className="tabular-nums">4.9{stat.suffix}</span>
                                        ) : (
                                            <Counter value={stat.value} suffix={stat.suffix} />
                                        )}
                                    </div>
                                    <p className="text-muted-foreground font-medium text-sm md:text-base uppercase tracking-widest px-2">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Decorative element */}
                            <div className={`absolute -inset-1 rounded-[2.6rem] bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
