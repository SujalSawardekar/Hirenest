"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, UploadCloud, Clock, CheckCircle } from "lucide-react"

const activeOrders = [
    {
        id: "ORD-9821",
        client: "GlobalTech Inc.",
        title: "E-commerce Redesign & Frontend",
        deadline: "Oct 25, 2026",
        status: "In Progress",
        amount: "$4,500"
    },
    {
        id: "ORD-9830",
        client: "Sarah Jenkins",
        title: "Logo & Brand Identity",
        deadline: "Oct 22, 2026",
        status: "Review",
        amount: "$850"
    }
]

export default function FreelancerOrdersPage() {
    const [selectedOrder, setSelectedOrder] = useState(null)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Orders</h1>
                <p className="text-muted-foreground">Manage your active projects and submit completed work.</p>
            </div>

            <div className="space-y-4">
                {activeOrders.map((order) => (
                    <Card key={order.id} className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-accent/20 transition-colors">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">

                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded">{order.id}</span>
                                        <Badge
                                            variant="outline"
                                            className={
                                                order.status === 'In Progress' ? 'text-blue-400 border-blue-400/20 bg-blue-500/10' :
                                                    'text-amber-400 border-amber-400/20 bg-amber-500/10'
                                            }
                                        >
                                            {order.status === 'In Progress' && <Clock className="w-3 h-3 mr-1" />}
                                            {order.status === 'Review' && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{order.title}</h3>
                                    <p className="text-sm text-muted-foreground">Client: <span className="text-foreground">{order.client}</span></p>
                                </div>

                                <div className="w-full md:w-auto text-left md:text-right space-y-1">
                                    <p className="text-sm text-muted-foreground">Deadline</p>
                                    <p className="font-semibold text-white">{order.deadline}</p>
                                </div>

                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                                    <div className="font-bold text-xl text-white">{order.amount}</div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="outline" className="h-8 p-2 group">
                                            <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-8 bg-accent text-white hover:bg-accent/90"
                                            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                                        >
                                            {order.status === 'Review' ? 'View Feedback' : 'Submit Work'}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Inline Submit Work Form (Expands) */}
                            {selectedOrder === order.id && order.status === 'In Progress' && (
                                <div className="bg-background/50 p-6 border-t border-white/5 space-y-4">
                                    <h4 className="font-semibold text-white">Submit Work for Review</h4>
                                    <p className="text-sm text-muted-foreground">Upload your source files, deliverables, or provide a link to the finished project.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-dashed border-input rounded-md p-6 text-center cursor-pointer hover:bg-white/5 transition-colors">
                                            <UploadCloud className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-foreground">Upload Files (.zip, .pdf)</p>
                                        </div>
                                        <div>
                                            <textarea
                                                className="w-full h-full min-h-[100px] rounded-md border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                                                placeholder="Add a link to the project, drive folder, or any notes for the client..."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
                                            <CheckCircle className="w-4 h-4" /> Submit for Approval
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
