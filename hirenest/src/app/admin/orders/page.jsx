import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import {
    Activity,
    Search,
    MoreVertical,
    Clock,
    CheckCircle,
    ArrowRightLeft,
    AlertCircle
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function AdminOrdersPage({
    searchParams
}) {
    const session = await getServerSession(authOptions)
    if (!session?.user) redirect("/login")

    const sessionUser = session.user
    if (sessionUser.role !== "ADMIN") redirect("/login")

    const search = searchParams?.search || ""
    const statusFilter = searchParams?.status || ""

    // Build Prisma query condition
    const whereCondition = {}
    if (search) {
        whereCondition.OR = [
            { id: { contains: search } },
            { title: { contains: search } },
            { client: { name: { contains: search } } },
            { freelancer: { name: { contains: search } } }
        ]
    }
    if (statusFilter && statusFilter !== "ALL") {
        whereCondition.status = statusFilter
    }

    const orders = await prisma.order.findMany({
        where: whereCondition,
        orderBy: { updatedAt: "desc" },
        include: {
            client: true,
            freelancer: true
        }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Platform Orders</h1>
                    <p className="text-muted-foreground">Monitor all transactions and active work across HireNest.</p>
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <form action="/admin/orders" method="GET" className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        name="search"
                                        placeholder="Search by Order ID, Title or User..."
                                        className="pl-9 bg-background/50"
                                        defaultValue={search}
                                    />
                                </div>
                                <select 
                                    name="status" 
                                    defaultValue={statusFilter || "ALL"}
                                    className="flex h-10 w-[150px] rounded-md border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                >
                                    <option value="ALL">All Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                                <Button type="submit" variant="secondary">Filter</Button>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-md border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground bg-background/50 uppercase border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Order Details</th>
                                        <th className="px-6 py-4 font-medium">Client <ArrowRightLeft className="w-3 h-3 inline mx-1" /> Freelancer</th>
                                        <th className="px-6 py-4 font-medium">Escrow Value</th>
                                        <th className="px-6 py-4 font-medium text-right">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                                No orders found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                    {orders.map((order) => (
                                        <tr key={order.id} className="bg-background/20 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <span className="text-xs font-mono text-muted-foreground bg-background px-1.5 py-0.5 rounded">
                                                        {order.id.slice(0, 8).toUpperCase()}
                                                    </span>
                                                    <h4 className="font-semibold text-white truncate max-w-[200px]">{order.title}</h4>
                                                    <div className="text-xs text-muted-foreground">Created {new Date(order.createdAt).toLocaleDateString()}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2 text-xs">
                                                    <div className="flex items-center justify-between p-1.5 rounded border border-blue-500/20 bg-blue-500/5">
                                                        <span className="text-muted-foreground pr-4">Client:</span>
                                                        <span className="font-medium text-blue-400 capitalize max-w-[120px] truncate">{order.client.name || order.client.email}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-1.5 rounded border border-green-500/20 bg-green-500/5">
                                                        <span className="text-muted-foreground pr-4">Talent:</span>
                                                        <span className="font-medium text-green-400 capitalize max-w-[120px] truncate">{order.freelancer?.name || order.freelancer?.email || "Unknown"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white text-lg">${order.amount.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        order.status === 'ACTIVE' ? 'text-blue-400 border-blue-400/20 bg-blue-500/10' :
                                                        order.status === 'COMPLETED' ? 'text-green-400 border-green-400/20 bg-green-500/10' :
                                                        order.status === 'CANCELLED' ? 'text-destructive border-destructive/20 bg-destructive/10' :
                                                        'text-amber-400 border-amber-400/20 bg-amber-500/10'
                                                    }
                                                >
                                                    {order.status === 'ACTIVE' && <Clock className="w-3 h-3 mr-1" />}
                                                    {order.status === 'COMPLETED' && <CheckCircle className="w-3 h-3 mr-1" />}
                                                    {order.status === 'CANCELLED' && <AlertCircle className="w-3 h-3 mr-1" />}
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
