import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function OrderTrackingPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session?.user) redirect("/login")

    const order = await prisma.order.findUnique({
        where: { id: params.id },
        include: { freelancer: true }
    })

    if (!order) {
        return (
            <div className="text-center py-24">
                <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
                <Link href="/client/orders">
                    <Button variant="outline">Back to Orders</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/client/orders">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Order Details</h1>
                    <p className="text-muted-foreground text-sm">Track your order progress and milestones.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-4 border-b border-white/5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
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
                                    <CardTitle className="text-xl">{order.title}</CardTitle>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">${order.amount.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">Funded in Escrow</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-white mb-4">Milestones</h3>
                            <div className="relative border-l border-white/10 ml-3 space-y-8 pb-4">
                                <div className="relative pl-6">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500" />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-white text-sm">Order Placed & Funded</p>
                                            <p className="text-xs text-muted-foreground mt-1">Funds secured in escrow.</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                
                                <div className="relative pl-6">
                                    <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ${['ACTIVE', 'COMPLETED', 'REVIEW'].includes(order.status) ? 'bg-green-500' : 'bg-primary ring-4 ring-primary/20'}`} />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`font-medium text-sm ${['ACTIVE', 'COMPLETED', 'REVIEW'].includes(order.status) ? 'text-white' : 'text-primary'}`}>Work in Progress</p>
                                            <p className="text-xs text-muted-foreground mt-1">Freelancer is working on the order.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative pl-6">
                                    <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ${order.status === 'COMPLETED' ? 'bg-green-500' : order.status === 'REVIEW' ? 'bg-primary ring-4 ring-primary/20' : 'bg-white/10'}`} />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`font-medium text-sm ${order.status === 'COMPLETED' ? 'text-white' : order.status === 'REVIEW' ? 'text-primary' : 'text-muted-foreground'}`}>Final Review</p>
                                            <p className="text-xs text-muted-foreground mt-1">Review the delivered work.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative pl-6">
                                    <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ${order.status === 'COMPLETED' ? 'bg-green-500 ring-4 ring-green-500/20' : 'bg-white/10'}`} />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`font-medium text-sm ${order.status === 'COMPLETED' ? 'text-green-500' : 'text-muted-foreground'}`}>Completed</p>
                                            <p className="text-xs text-muted-foreground mt-1">Funds released to freelancer.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {order.status === 'COMPLETED' && (
                        <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Delivery Files</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-background/50 hover:bg-white/5 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-primary/20 text-primary flex items-center justify-center">
                                            <Download className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-white">final_deliverables.zip</p>
                                            <p className="text-xs text-muted-foreground">34.2 MB • ZIP Archive</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost">Download</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Freelancer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                                    {order.freelancer?.name?.substring(0, 2).toUpperCase() || 'FR'}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{order.freelancer?.name || order.freelancer?.email}</p>
                                    <p className="text-xs text-muted-foreground">{order.freelancer?.title || 'Freelancer'}</p>
                                </div>
                            </div>
                            <Link href={`/client/messages?user=${order.freelancerId}`} className="block w-full">
                                <Button className="w-full bg-white/5 hover:bg-white/10 text-white" variant="outline">
                                    Message Freelancer
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Order Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Order Date</span>
                                <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Deadline</span>
                                <span className="text-white">{order.deadline ? new Date(order.deadline).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-t border-white/5 mt-2">
                                <span className="text-muted-foreground font-medium">Total</span>
                                <span className="text-white font-bold text-lg">${order.amount.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
