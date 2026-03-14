import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

import {
    PlusCircle,
    MoreVertical,
    Clock,
    Star,
    Briefcase,
    TrendingUp,
    Eye,
    Edit,
    Trash
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function FreelancerGigsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) redirect("/login")

    const sessionUser = session.user
    if (sessionUser.role !== "FREELANCER") redirect("/login")

    // Fetch the freelancer's gigs from the database
    const gigs = await prisma.gig.findMany({
        where: { freelancerId: sessionUser.id },
        orderBy: { createdAt: "desc" }
    })

    // Calculate some basic stats
    const totalEarnings = 0 // In a real app, calculate this from completed orders linked to gigs
    const activeOrders = 0 // In a real app, calculate this from active orders linked to gigs

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Gigs</h1>
                    <p className="text-muted-foreground">Manage your service offerings and track their performance.</p>
                </div>
                <Link href="/freelancer/gigs/new">
                    <Button className="w-full md:w-auto bg-primary text-white hover:bg-primary/90">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Gig
                    </Button>
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Gigs
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{gigs.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Gig Orders (Active)
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{activeOrders}</div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Gig Earnings
                        </CardTitle>
                        <Star className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${totalEarnings.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Gigs List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Your Active Services</h2>
                
                {gigs.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-xl bg-card/30">
                        <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">No gigs created yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-6">Create your first gig to start offering your services to clients on the platform.</p>
                        <Link href="/freelancer/gigs/new">
                            <Button className="bg-primary hover:bg-primary/90">Create Your First Gig</Button>
                        </Link>
                    </div>
                ) : (
                    gigs.map((gig) => (
                        <Card key={gig.id} className="border-white/5 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-colors overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                {/* Thumbnail Placeholder */}
                                <div className="w-full md:w-48 h-48 md:h-auto bg-background/50 flex flex-col items-center justify-center border-r border-white/5 shrink-0">
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Thumbnail</span>
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">{gig.category}</Badge>
                                </div>
                                
                                <CardContent className="flex-1 p-6 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white line-clamp-1">{gig.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white" title="View Public Page">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white" title="Edit Gig">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" title="Delete Gig">
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                        {gig.description}
                                    </p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto pt-4 border-t border-white/5">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Price</p>
                                            <p className="font-bold text-white">${gig.price.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Delivery Time</p>
                                            <p className="font-medium text-white flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-muted-foreground" /> {gig.deliveryDays} Days
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Revisions</p>
                                            <p className="font-medium text-white">{gig.revisions} Included</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Rating</p>
                                            <p className="font-medium text-white flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 0.0 (New)
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
