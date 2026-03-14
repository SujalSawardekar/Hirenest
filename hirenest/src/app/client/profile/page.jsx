import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Star, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function ClientProfilePage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/login")
    }

    const userId = session.user.id
    const userRole = session.user.role

    if (userRole !== "CLIENT") {
        redirect("/login")
    }

    const userData = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            jobs: {
                orderBy: { createdAt: "desc" },
                take: 5
            },
            ordersAsClient: {
                where: { status: "COMPLETED" }
            }
        }
    })

    if (!userData) {
        redirect("/login")
    }

    const memberSince = new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const totalSpent = userData.ordersAsClient.reduce((sum, order) => sum + order.amount, 0)
    const jobsPosted = userData.jobs.length

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header / Cover Area */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 h-48 border border-white/10">
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
                                {(userData.name || userData.email || "C").substring(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-1 pb-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-white">{userData.name || userData.email}</h1>
                        </div>
                        <p className="text-xl text-muted-foreground font-medium">Client</p>
                        
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
                        <Link href="/settings">
                            <Button className="flex-1 sm:flex-none bg-primary text-white hover:bg-primary/90">
                                Edit Profile
                            </Button>
                        </Link>
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
                                <h3 className="font-semibold text-white">Total Spent</h3>
                                <div className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}<span className="text-base text-muted-foreground font-normal"> USD</span></div>
                            </div>
                            
                            <hr className="border-white/5" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-background flex items-center justify-center text-amber-500 border border-white/5">
                                        <Star className="w-5 h-5 fill-amber-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">5.0 / 5</div>
                                        <div className="text-xs text-muted-foreground">Client Rating</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-background flex items-center justify-center text-green-500 border border-white/5">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{userData.ordersAsClient.length}</div>
                                        <div className="text-xs text-muted-foreground">Completed Hires</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-8">
                    {/* Recent Jobs Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Recent Job Postings</h2>
                        </div>
                        
                        <div className="space-y-4">
                            {userData.jobs.length === 0 ? (
                                <div className="p-8 text-center border border-dashed border-white/10 rounded-xl bg-background/30 text-muted-foreground">
                                    You haven't posted any jobs yet.
                                </div>
                            ) : (
                                userData.jobs.map((job) => (
                                    <Card key={job.id} className="border-white/5 bg-background/40 hover:bg-white/5 transition-colors">
                                        <CardContent className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-white text-lg">{job.title}</h3>
                                                <span className="font-bold text-white bg-white/10 px-2 py-1 rounded text-sm">${job.budget}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                                            
                                            <div className="flex justify-between items-center text-xs">
                                                <div className="flex gap-4 text-muted-foreground">
                                                    <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                                                    <span>Status: {job.status}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
