"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ClipboardList, CheckCircle2, Wallet, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FreelancerDashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ active: 0, completed: 0, earnings: 0, pending: 0 });

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (user.role !== "FREELANCER") {
            router.push("/login");
        } else {
            fetch(`http://localhost:5000/api/orders`, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const active = data.filter(o => o.status === "ACTIVE").length;
                    const completed = data.filter(o => o.status === "COMPLETED").length;
                    const earnings = data.filter(o => o.status === "COMPLETED").reduce((acc, curr) => acc + curr.amount, 0);
                    const pending = data.filter(o => ["PENDING", "ACTIVE", "REVIEW"].includes(o.status)).reduce((acc, curr) => acc + curr.amount, 0);
                    setStats({ active, completed, earnings, pending });
                }
            })
            .catch(err => console.error(err));
        }
    }, [user, router]);

    if (!user) return null;

    const displayStats = [
        { title: "Active Orders", value: stats.active.toString(), icon: ClipboardList, trend: "Currently working on", trendColor: "text-amber-500" },
        { title: "Completed Projects", value: stats.completed.toString(), icon: CheckCircle2, trend: "Successfully delivered", trendColor: "text-green-500" },
        { title: "Total Earnings", value: `$${stats.earnings.toLocaleString()}`, icon: Wallet, trend: "Available balance", trendColor: "text-emerald-400" },
        { title: "Pending Clearance", value: `$${stats.pending.toLocaleString()}`, icon: Clock, trend: "Will clear upon completion", trendColor: "text-muted-foreground" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Freelancer Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}. Keep up the great work!
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-xs text-muted-foreground">Profile Status</span>
                        <div className="w-24 h-1.5 bg-background rounded-full mt-1 overflow-hidden">
                            <div className="w-full h-full bg-accent rounded-full" />
                        </div>
                    </div>
                    <Link href="/freelancer/gigs/new">
                        <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
                            Create New Gig
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {displayStats.map((stat, i) => (
                    <Card key={i} className="border-white/5 bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-accent" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <p className={`text-xs ${stat.trendColor}`}>{stat.trend}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-white/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Needs Your Attention</CardTitle>
                        <Link href="/freelancer/orders" className="text-sm text-accent hover:text-accent/80 flex items-center">
                            View all <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4 flex flex-col items-center justify-center py-6 text-muted-foreground">
                        <p>No urgent action required.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
