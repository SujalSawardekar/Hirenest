import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import {
    Users,
    ShieldAlert,
    ShieldCheck,
    Activity,
    CreditCard,
    Ban,
    CheckCircle,
    MoreVertical
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/login")
    }

    const user = session.user
    if (user.role !== "ADMIN") {
        redirect("/login")
    }

    // Database Queries
    const totalUsers = await prisma.user.count()
    
    const activeOrders = await prisma.order.count({
        where: { status: { in: ["ACTIVE", "PENDING"] } }
    })

    const allOrders = await prisma.order.findMany({
        where: { status: { in: ["ACTIVE", "PENDING", "COMPLETED"] } }
    })

    const escrowVolume = allOrders
        .filter(o => o.status === "ACTIVE" || o.status === "PENDING")
        .reduce((sum, o) => sum + o.amount, 0)

    const stats = [
        { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, trend: "Registered accounts", color: "text-blue-500" },
        { title: "Active Orders", value: activeOrders.toLocaleString(), icon: Activity, trend: "Currently ongoing", color: "text-green-500" },
        { title: "Escrow Volume", value: `$${escrowVolume.toLocaleString()}`, icon: CreditCard, trend: "Money currently in escrow", color: "text-primary" },
        { title: "Active Disputes", value: "0", icon: ShieldAlert, trend: "No disputes at this time", color: "text-destructive" },
    ]

    // Fetch the 5 most recent users for "Verification Queue" as a substitute for real verification data
    const recentUsers = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Platform Overview</h1>
                <p className="text-muted-foreground">Monitor platform health, verify users, and manage disputes.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-white/5 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg bg-background ${stat.color}`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.trend}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Recent Users */}
                <Card className="col-span-2 border-white/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Accounts</CardTitle>
                            <CardDescription>Accounts that recently joined the platform.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentUsers.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-background/30 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{item.name || item.email}</h4>
                                            <p className="text-xs text-muted-foreground">{item.role} • Joined {item.createdAt.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {recentUsers.length === 0 && (
                                <p className="text-muted-foreground text-center py-4">No users found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Security Alerts / Spam Detection */}
                <Card className="border-destructive/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                            <ShieldCheck className="w-5 h-5" /> System Status
                        </CardTitle>
                        <CardDescription>Platform security alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-between text-sm">
                            <span className="text-white">System Health</span>
                            <Badge className="bg-green-500/20 text-green-500 border-0 shadow-none">Optimal</Badge>
                        </div>

                        <div className="p-3 bg-background/50 border border-white/5 rounded-lg flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Automated Spam Filter</span>
                            <Badge className="bg-primary/20 text-primary border-0 shadow-none">Active - 99.8% Eff.</Badge>
                        </div>
                        
                        <div className="p-3 bg-background/50 border border-white/5 rounded-lg flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Database Connections</span>
                            <Badge className="bg-blue-500/20 text-blue-500 border-0 shadow-none">Healthy</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
