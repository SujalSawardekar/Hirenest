"use client"

import { motion } from "framer-motion";
import {
    Palette,
    Code2,
    PenTool,
    Video,
    FileText,
    TrendingUp,
    ArrowRight,
    Bot,
    Languages,
    Clock,
    Music,
    Briefcase,
    Database
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

const categories = [
    { name: "UI/UX Design", icon: Palette, count: "1.2k+" },
    { name: "Web Development", icon: Code2, count: "3.5k+" },
    { name: "Graphic Design", icon: PenTool, count: "2.1k+" },
    { name: "Video Editing", icon: Video, count: "1.8k+" },
    { name: "Content Writing", icon: FileText, count: "4.2k+" },
    { name: "Digital Marketing", icon: TrendingUp, count: "2.5k+" },
    { name: "AI Services", icon: Bot, count: "1.5k+" },
    { name: "Translation", icon: Languages, count: "3.1k+" },
    { name: "Virtual Assistant", icon: Clock, count: "2.8k+" },
    { name: "Music & Audio", icon: Music, count: "1.1k+" },
    { name: "Business Consulting", icon: Briefcase, count: "1.9k+" },
    { name: "Data Science", icon: Database, count: "1.4k+" },
];

export function CategoriesSection({ limit, searchQuery = "" }) {
    const filteredCategories = useMemo(() => {
        let result = categories;
        if (searchQuery) {
            result = result.filter(cat => 
                cat.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return limit ? result.slice(0, limit) : result;
    }, [limit, searchQuery]);

    const displayCategories = filteredCategories;

    return (
        <section id="categories" className="py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
                {!searchQuery && (
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Top Categories</h2>
                            <p className="text-muted-foreground text-lg">
                                Find exactly what you need from our extensive directory of professional freelance services.
                            </p>
                        </div>
                        <Link href="/categories" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 group whitespace-nowrap">
                            View All Categories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                )}

                {displayCategories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayCategories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link href={`/category/${category.name.toLowerCase().replace(/[\s\/]+/g, '-')}`} className="block">
                                    <div className="group bg-card rounded-2xl p-6 border border-white/5 hover:border-primary/50 transition-colors flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                                                <category.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{category.name}</h3>
                                                <p className="text-sm text-muted-foreground">{category.count} skills</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-card rounded-[2rem] border border-dashed border-white/10">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                            <Bot size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No categories found</h3>
                        <p className="text-muted-foreground">Try searching for something else, or browse all categories.</p>
                        <Button 
                            variant="link" 
                            className="mt-4 text-primary"
                            onClick={() => window.location.reload()}
                        >
                            Reset Search
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
