import { prisma } from "@/lib/prisma"
import { Search, Star, MessageSquare } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default async function BrowseFreelancersPage({
    searchParams
}; {
    searchParams?: { search?: string }
}) {
    const search = searchParams?.search || ""

    // Fetch real freelancers from Prisma
    const freelancers = await prisma.user.findMany({
        where: {
            role: "FREELANCER",
            ...(search ? {
                OR: [
                    { name: { contains: search } },
                    { skills: { contains: search } },
                    { title: { contains: search } }
                ]
            } : {})
        },
        include: {
            gigs: true,
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Browse Freelancers</h1>
                <p className="text-muted-foreground">Find the perfect talent for your next project.</p>
            </div>

            <div className="relative max-w-xl">
                <form action="/client/freelancers" method="GET">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        name="search"
                        placeholder="Search by skills, title, or name..."
                        className="pl-10 bg-card/50 border-white/10 h-12 text-base"
                        defaultValue={search}
                    />
                </form>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {freelancers.map((freelancer) => (
                    <Card key={freelancer.id} className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col hover:border-primary/30 transition-colors">
                        <CardContent className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                        {freelancer.name?.substring(0, 2).toUpperCase() || "FR"}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{freelancer.name || freelancer.email}</h3>
                                        <p className="text-xs text-primary">{freelancer.title || "Freelancer"}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-white text-lg">
                                        ${freelancer.hourlyRate || 0}/hr
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <span className="font-medium text-white">4.9</span>
                                <span>(12 reviews)</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6 flex-1">
                                {(freelancer.skills ? freelancer.skills.split(",").map(s => s.trim()) : []).map((skill, si) => (
                                    <Badge key={si} variant="secondary" className="bg-white/5 hover:bg-white/10">{skill}</Badge>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <Button variant="outline" className="w-full flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Message
                                </Button>
                                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                                    Hire Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {freelancers.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        No freelancers found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}
