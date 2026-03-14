import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, ExternalLink, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function ClientOrdersPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) redirect("/login")

    const user = session.user
    
    const orders = await prisma.order.findMany({
        where: { clientId: user.id },
        include: { freelancer: true },
        orderBy: { updatedAt: "desc" }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Orders</h1>
                <p className="text-muted-foreground">Manage your active projects and billing history.</p>
            </div>

            <div className="space-y-4">
                {orders.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                        You have no orders yet.
                    </div>
                )}
                {orders.map((order) => (
                    <Card key={order.id} className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/20 transition-colors">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">

                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded">
                                            {order.id.slice(-6).toUpperCase()}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className={
                                                order.status === 'ACTIVE' ? 'text-blue-400 border-blue-400/20 bg-blue-500/10' :
                                                    order.status === 'COMPLETED' ? 'text-green-400 border-green-400/20 bg-green-500/10' :
                                                        'text-amber-400 border-amber-400/20 bg-amber-500/10'
                                            }
                                        >
                                            {order.status === 'ACTIVE' && <Clock className="w-3 h-3 mr-1" />}
                                            {order.status === 'COMPLETED' && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{order.title}</h3>
                                    <p className="text-sm text-muted-foreground">Freelancer: <span className="text-foreground">{order.freelancer?.name || order.freelancer?.email}</span></p>
                                </div>

                                <div className="w-full md:w-48 space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Progress</span>
                                        <span>{order.status === "COMPLETED" ? 100 : order.status === "ACTIVE" ? 50 : 10}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${order.status === 'COMPLETED' ? 'bg-green-500' : 'bg-primary'}`}
                                            style={{ width: `${order.status === "COMPLETED" ? 100 : order.status === "ACTIVE" ? 50 : 10}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs pt-1">
                                        <span className="text-muted-foreground">Deadline: <span className="text-foreground">{order.deadline ? new Date(order.deadline).toLocaleDateString() : 'N/A'}</span></span>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                                    <div className="font-bold text-xl text-white">${order.amount.toLocaleString()}</div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/client/messages?user=${order.freelancerId}`}>
                                            <Button size="sm" variant="outline" className="h-8 group">
                                                <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                                            </Button>
                                        </Link>
                                        <Link href={`/client/orders/${order.id}`}>
                                            <Button size="sm" className="h-8 bg-primary text-white">
                                                Track <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
