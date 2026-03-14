"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Briefcase, Clock, CheckCircle2, DollarSign, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientDashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ activeJobs: 0, pending: 0, completed: 0, spending: 0 });

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (user.role !== "CLIENT") {
            router.push("/login");
        } else {
            const fetchStats = async () => {
                try {
                    const [jobsRes, ordersRes] = await Promise.all([
                        fetch('/api/jobs'),
                        fetch('/api/orders')
                    ]);
                    const jobs = await jobsRes.json();
                    const orders = await ordersRes.json();
                    
                    if (Array.isArray(jobs) && Array.isArray(orders)) {
                        const activeJobs = jobs.filter(j => ["OPEN", "IN_PROGRESS"].includes(j.status) && j.clientId === user._id).length;
                        const pending = orders.filter(o => o.status === "PENDING" && o.clientId === user._id).length;
                        const completed = orders.filter(o => o.status === "COMPLETED" && o.clientId === user._id).length;
                        const spending = orders.filter(o => ["COMPLETED", "ACTIVE"].includes(o.status) && o.clientId === user._id).reduce((acc, curr) => acc + curr.amount, 0);
                        setStats({ activeJobs, pending, completed, spending });
                    }
                } catch (error) {
                    console.error("Error fetching stats", error);
                }
            };
            fetchStats();
        }
    }, [user, router]);

    if (!user) return null;

    const displayStats = [
        { title: "Active Jobs", value: stats.activeJobs.toString(), icon: Briefcase, trend: "Currently open or in progress", trendColor: "text-green-500" },
        { title: "Pending Orders", value: stats.pending.toString(), icon: Clock, trend: "Awaiting freelancer acceptance", trendColor: "text-amber-500" },
        { title: "Completed Orders", value: stats.completed.toString(), icon: CheckCircle2, trend: "Successfully finished", trendColor: "text-green-500" },
        { title: "Total Spending", value: `$${stats.spending.toLocaleString()}`, icon: DollarSign, trend: "Across all active/completed orders", trendColor: "text-muted-foreground" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Client Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}. Here&apos;s an overview of your activity.
                    </p>
                </div>
                <Link href="/client/jobs/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                        Post a New Job <ArrowUpRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {displayStats.map((stat, i) => (
                    <Card key={i} className="border-white/5 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-primary" />
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
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <p>No recent activity right now.</p>
                        <p className="text-sm">When you interact with freelancers, updates will appear here.</p>
                    </CardContent>
                </Card>
                <Card className="col-span-3 border-white/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Need Talent Quickly?</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center text-center p-6 pt-0 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                            <Briefcase className="w-8 h-8" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Browse our top-rated freelancers and invite them directly to your active jobs.
                        </p>
                        <Link href="/client/freelancers" className="w-full">
                            <Button variant="outline" className="w-full mt-4">Browse Talent</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
