import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Code2, PenTool, Video, FileText, TrendingUp, Star, MapPin, ArrowRight, ArrowLeft, Bot, Languages, Clock, Music, Briefcase, Database } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const categoriesData = {
    "ui-ux-design": { name: "UI/UX Design", icon: Palette, count: "1.2k+" },
    "web-development": { name: "Web Development", icon: Code2, count: "3.5k+" },
    "graphic-design": { name: "Graphic Design", icon: PenTool, count: "2.1k+" },
    "video-editing": { name: "Video Editing", icon: Video, count: "1.8k+" },
    "content-writing": { name: "Content Writing", icon: FileText, count: "4.2k+" },
    "digital-marketing": { name: "Digital Marketing", icon: TrendingUp, count: "2.5k+" },
    "ai-services": { name: "AI Services", icon: Bot, count: "1.5k+" },
    "translation": { name: "Translation", icon: Languages, count: "3.1k+" },
    "virtual-assistant": { name: "Virtual Assistant", icon: Clock, count: "2.8k+" },
    "music-audio": { name: "Music & Audio", icon: Music, count: "1.1k+" },
    "business-consulting": { name: "Business Consulting", icon: Briefcase, count: "1.9k+" },
    "data-science": { name: "Data Science", icon: Database, count: "1.4k+" },
}

// Temporary mock freelancers for the category
const mockFreelancers = [
    { id: 1, name: "Sarah Jenkins", title: "Senior Expert", rating: 4.9, reviews: 124, rate: 85, location: "United States" },
    { id: 2, name: "David Chen", title: "Creative Professional", rating: 5.0, reviews: 89, rate: 65, location: "Canada" },
    { id: 3, name: "Elena Rodriguez", title: "Specialist", rating: 4.8, reviews: 210, rate: 95, location: "Spain" },
    { id: 4, name: "Michael Chang", title: "Lead Consultant", rating: 4.9, reviews: 156, rate: 110, location: "Singapore" },
]

export default async function CategoryPage({ params }) {
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug
    const categoryInfo = categoriesData[slug]

    if (!categoryInfo) {
        notFound()
    }

    const Icon = categoryInfo.icon

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            
            <main className="flex-1 flex flex-col">
                {/* Hero Header */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-card border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0"></div>
                    
                    <div className="container mx-auto px-4 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <div className="mb-6 flex items-center gap-4">
                                <Link href="/categories">
                                    <Button variant="ghost" className="text-muted-foreground hover:text-white pl-0">
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
                                    </Button>
                                </Link>
                                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
                                    Category Overview
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                                    {categoryInfo.name}
                                </h1>
                                <Badge variant="outline" className="hidden md:flex bg-white/5 border-white/10 text-white text-lg py-1 px-4 rounded-full mt-2">
                                    {categoryInfo.count} active skills
                                </Badge>
                            </div>
                            <p className="text-xl text-muted-foreground mb-8 text-balance">
                                Discover top {categoryInfo.name.toLowerCase()} experts ready to bring your ideas to life. Hire the perfect freelancer for your project today.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link href="/signup">
                                    <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-12 text-base font-medium">
                                        Post a Job in {categoryInfo.name}
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-medium border-white/10 text-white hover:bg-white/5">
                                    Browse Freelancers
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Freelancer List Section */}
                <section className="py-20 flex-1">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Top {categoryInfo.name} Freelancers</h2>
                                <p className="text-muted-foreground">Hire the top 1% of talent in this category instantly.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mockFreelancers.map((freelancer) => (
                                <Card key={freelancer.id} className="border-white/5 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-inner">
                                                {freelancer.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-sm font-medium">
                                                <Star className="w-3.5 h-3.5 fill-amber-500" />
                                                <span>{freelancer.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{freelancer.name}</h3>
                                        <p className="text-primary text-sm font-medium mb-4">{categoryInfo.name} {freelancer.title}</p>
                                        
                                        <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Location</span>
                                                <span className="text-white">{freelancer.location}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Hourly Rate</span>
                                                <span className="font-semibold text-white">${freelancer.rate}/hr</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Completed Jobs</span>
                                                <span className="text-white">{freelancer.reviews}</span>
                                            </div>
                                        </div>

                                        <Link href="/freelancers" className="block">
                                            <Button className="w-full bg-white/5 hover:bg-primary hover:text-white text-foreground border-0 transition-colors group">
                                                View Profile <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    )
}
