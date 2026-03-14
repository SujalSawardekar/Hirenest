import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import {
    Users,
    Search,
    ShieldCheck,
    MoreVertical,
    Mail,
    Calendar,
    Briefcase
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function AdminUsersPage({
    searchParams
}) {
    const session = await getServerSession(authOptions)
    if (!session?.user) redirect("/login")

    const sessionUser = session.user
    if (sessionUser.role !== "ADMIN") redirect("/login")

    const search = searchParams?.search || ""
    const roleFilter = searchParams?.role || ""

    // Build Prisma query condition
    const whereCondition = {}
    if (search) {
        whereCondition.OR = [
            { name: { contains: search } },
            { email: { contains: search } }
        ]
    }
    if (roleFilter && roleFilter !== "ALL") {
        whereCondition.role = roleFilter
    }

    const users = await prisma.user.findMany({
        where: whereCondition,
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: {
                    jobs: true,
                    gigs: true,
                    ordersAsClient: true,
                    ordersAsFreelancer: true
                }
            }
        }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">User Directory</h1>
                    <p className="text-muted-foreground">Manage and view all registered accounts on the platform.</p>
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <form action="/admin/users" method="GET" className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        name="search"
                                        placeholder="Search by name or email..."
                                        className="pl-9 bg-background/50"
                                        defaultValue={search}
                                    />
                                </div>
                                <select 
                                    name="role" 
                                    defaultValue={roleFilter || "ALL"}
                                    className="flex h-10 w-[150px] rounded-md border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                >
                                    <option value="ALL">All Roles</option>
                                    <option value="CLIENT">Clients</option>
                                    <option value="FREELANCER">Freelancers</option>
                                    <option value="ADMIN">Admins</option>
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
                                        <th className="px-6 py-4 font-medium">User Info</th>
                                        <th className="px-6 py-4 font-medium">Role</th>
                                        <th className="px-6 py-4 font-medium">Joined Date</th>
                                        <th className="px-6 py-4 font-medium text-right">Activity Stats</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                                No users found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                    {users.map((user) => (
                                        <tr key={user.id} className="bg-background/20 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                                                        ${user.role === 'ADMIN' ? 'bg-destructive/20 text-destructive' : 
                                                          user.role === 'CLIENT' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'}
                                                    `}>
                                                        {user.name?.substring(0, 2).toUpperCase() || user.email.substring(0,2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">{user.name || "Unknown"}</div>
                                                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                            <Mail className="w-3 h-3" /> {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        user.role === 'ADMIN' ? 'border-destructive/30 text-destructive bg-destructive/10' :
                                                        user.role === 'CLIENT' ? 'border-blue-500/30 text-blue-500 bg-blue-500/10' :
                                                        'border-green-500/30 text-green-500 bg-green-500/10'
                                                    }
                                                >
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {user.createdAt.toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="text-xs space-y-1">
                                                    {user.role === "CLIENT" || user.role === "ADMIN" ? (
                                                        <>
                                                            <div className="text-muted-foreground">Jobs Posted: <span className="text-white font-medium">{user._count.jobs}</span></div>
                                                            <div className="text-muted-foreground">Orders Made: <span className="text-white font-medium">{user._count.ordersAsClient}</span></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="text-muted-foreground">Gigs Active: <span className="text-white font-medium">{user._count.gigs}</span></div>
                                                            <div className="text-muted-foreground">Orders Done: <span className="text-white font-medium">{user._count.ordersAsFreelancer}</span></div>
                                                        </>
                                                    )}
                                                </div>
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
