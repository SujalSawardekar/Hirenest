import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star, Clock, Briefcase, Mail, CheckCircle } from "lucide-react"

export default async function FreelancerProfilePage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/login")
    }

    const userId = session.user.id
    const userRole = session.user.role

    if (userRole !== "FREELANCER") {
        redirect("/login")
    }

    const userData = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            gigs: true,
            ordersAsFreelancer: {
                where: { status: "COMPLETED" }
            }
        }
    })

    if (!userData) {
        redirect("/login")
    }

    // Default values safely parsing strings
    const skillsList = userData.skills ? userData.skills.split(",").map(s => s.trim()) : ["No skills listed"]
    const memberSince = new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const completedJobs = userData.ordersAsFreelancer.length

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header / Cover Area */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 h-48 border border-white/10">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent h-24" />
            </div>

            {/* Profile Info Section */}
            <div className="relative px-6 sm:px-10 -mt-20">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
                    <div className="w-32 h-32 rounded-full border-4 border-background bg-card flex items-center justify-center overflow-hidden shrink-0 outline outline-1 outline-white/10 shadow-xl">
                        {userData.image ? (
                            <img src={userData.image} alt={userData.name || "User avatar"} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-500 flex items-center justify-center text-4xl font-bold text-white">
                                {(userData.name || userData.email || "F").substring(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-1 pb-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-white">{userData.name || userData.email}</h1>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                <CheckCircle className="w-3 h-3 mr-1" /> Available
                            </Badge>
                        </div>
                        <p className="text-xl text-primary font-medium">{userData.title || "Freelancer"}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> Global / Remote
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> Member since {memberSince}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pb-2 w-full sm:w-auto">
                        <Button className="flex-1 sm:flex-none bg-primary text-white hover:bg-primary/90">
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-3 gap-8 px-2 sm:px-6">
                
                {/* Left Sidebar */}
                <div className="space-y-6">
                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-white">Hourly Rate</h3>
                                <div className="text-2xl font-bold text-white">${userData.hourlyRate || 0}<span className="text-base text-muted-foreground font-normal">/hr</span></div>
                            </div>
                            
                            <hr className="border-white/5" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-background flex items-center justify-center text-amber-500 border border-white/5">
                                        <Star className="w-5 h-5 fill-amber-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">4.9 / 5</div>
                                        <div className="text-xs text-muted-foreground">Average Rating</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-background flex items-center justify-center text-green-500 border border-white/5">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{completedJobs}</div>
                                        <div className="text-xs text-muted-foreground">Jobs Completed</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-background flex items-center justify-center text-blue-500 border border-white/5">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">100%</div>
                                        <div className="text-xs text-muted-foreground">On-Time Delivery</div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-white/5" />

                            <div className="space-y-3">
                                <h3 className="font-semibold text-white text-sm">Contact</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="w-4 h-4" /> {userData.email}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-white mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skillsList.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="bg-white/5 hover:bg-white/10 text-foreground">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-8">
                    {/* About Section */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">About Me</h2>
                        <div className="prose prose-invert max-w-none text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                            {userData.bio || "No biography provided. Click 'Edit Profile' to add some information about yourself and your expertise."}
                        </div>
                    </div>

                    {/* Active Gigs Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">My Services (Gigs)</h2>
                        </div>
                        
                        <div className="space-y-4">
                            {userData.gigs.length === 0 ? (
                                <div className="p-8 text-center border border-dashed border-white/10 rounded-xl bg-background/30 text-muted-foreground">
                                    You haven't created any gigs yet.
                                </div>
                            ) : (
                                userData.gigs.map((gig) => (
                                    <div key={gig.id} className="p-4 border border-white/5 rounded-xl bg-card/50 hover:bg-card/80 transition-colors flex flex-col sm:flex-row gap-4">
                                        <div className="w-full sm:w-32 h-24 bg-background/80 rounded-lg shrink-0 flex items-center justify-center border border-white/5 text-muted-foreground">
                                            No Image
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-semibold text-white line-clamp-1">{gig.title}</h3>
                                                <span className="font-bold text-white">${gig.price}</span>
                                            </div>
                                            <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wider mb-2 border-white/10">{gig.category}</Badge>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{gig.description}</p>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {gig.deliveryDays} Days Delivery</span>
                                                <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 5.0 (0)</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
