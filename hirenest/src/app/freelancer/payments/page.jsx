"use client"

import { useState } from "react"
import { DollarSign, ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const transactions = [
    { id: "TRX-482", date: "Oct 12, 2026", type: "withdrawal", amount: "$2,400.00", status: "Completed" },
    { id: "TRX-491", date: "Oct 15, 2026", type: "release", amount: "$1,200.00", status: "Completed", project: "Smart Contract Audit" },
    { id: "TRX-495", date: "Today, 10:42 AM", type: "pending", amount: "$850.00", status: "Pending", project: "Logo Design & Branding" },
]

export default function FreelancerPaymentsPage() {
    const [isWithdrawing, setIsWithdrawing] = useState(false)

    const handleWithdrawal = () => {
        setIsWithdrawing(true)
        setTimeout(() => {
            setIsWithdrawing(false)
            alert("Withdrawal request submitted successfully. Funds will arrive in 1-2 business days.")
        }, 1500)
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Earnings & Payments</h1>
                <p className="text-muted-foreground">Track your revenue and withdraw funds to your bank account.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-2 border-white/5 bg-gradient-to-br from-card/80 to-accent/5 backdrop-blur-sm relative overflow-hidden">

                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

                    <CardContent className="p-8 pb-10 flex flex-col h-full relative z-10">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Available Balance</p>
                        <div className="text-5xl font-bold text-white tracking-tight mb-8">
                            $1,200.<span className="text-muted-foreground text-3xl">00</span>
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-4">
                            <Button
                                className="bg-accent text-white hover:bg-accent/90 w-full font-semibold h-12 text-base"
                                onClick={handleWithdrawal}
                                disabled={isWithdrawing}
                            >
                                {isWithdrawing ? "Processing..." : "Withdraw Funds"}
                            </Button>
                            <Button variant="outline" className="w-full font-semibold h-12 text-base border-white/10 hover:bg-white/5">
                                Manage Methods
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">Earnings Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-muted-foreground">Pending Escrow</span>
                                <span className="font-semibold text-amber-500">$850.00</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Funds secured by clients, awaiting your delivery.</p>
                        </div>
                        <div className="border-t border-white/5 pt-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-muted-foreground">Total Withdrawn</span>
                                <span className="font-semibold text-white">$11,250.00</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Total earnings transferred to your bank.</p>
                        </div>
                        <div className="border-t border-white/5 pt-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-foreground">Active Bank Account</span>
                            </div>
                            <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border border-white/5">
                                <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                                    <span className="text-xs font-bold text-blue-900">CHASE</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Chase Checking</p>
                                    <p className="text-xs text-muted-foreground">**** 9821</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-0">
                        {transactions.map((trx, i) => (
                            <div key={trx.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trx.type === 'withdrawal' ? 'bg-background text-foreground border border-white/10' :
                                            trx.type === 'release' ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'
                                        }`}>
                                        {trx.type === 'withdrawal' && <ArrowUpRight className="w-5 h-5" />}
                                        {trx.type === 'release' && <ArrowDownLeft className="w-5 h-5" />}
                                        {trx.type === 'pending' && <Clock className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white text-sm">
                                            {trx.type === 'withdrawal' ? 'Withdrawal to Bank' :
                                                trx.type === 'release' ? `Payment Released: ${trx.project}` :
                                                    `Payment in Escrow: ${trx.project}`}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground">{trx.date}</span>
                                            <span className="text-[10px] text-muted-foreground/50">•</span>
                                            <span className="text-xs text-muted-foreground font-mono">{trx.id}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-semibold ${trx.type === 'withdrawal' ? 'text-foreground' : 'text-white'}`}>
                                        {trx.type === 'withdrawal' ? '-' : '+'}{trx.amount}
                                    </p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                        {trx.status === 'Completed' ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Clock className="w-3 h-3 text-amber-500" />}
                                        <span className={`text-xs ${trx.status === 'Completed' ? 'text-green-500' : 'text-amber-500'}`}>{trx.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
