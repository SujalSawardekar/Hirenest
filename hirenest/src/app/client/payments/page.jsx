"use client"

import { useState } from "react"
import { ShieldCheck, CreditCard, Building, Wallet, CheckCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ClientPaymentsPage() {
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handlePayment = () => {
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            setIsSuccess(true)
        }, 2000)
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Fund Escrow Account</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Your funds are securely held in an audited smart contract until you approve the work.
                </p>
            </div>

            {isSuccess ? (
                <Card className="border-green-500/30 bg-green-500/10 backdrop-blur-sm text-center py-12 px-6">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        Your funds ($4,725.00) have been securely deposited into the escrow wallet for order ORD-9821.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={() => setIsSuccess(false)}>Fund Another Project</Button>
                        <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => window.location.href = '/client/orders'}>
                            View My Orders
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Payment Details Form */}
                    <div className="space-y-6">
                        <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Select Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setPaymentMethod("card")}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-background/50 text-muted-foreground hover:bg-white/5'}`}
                                    >
                                        <CreditCard className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-medium">Card</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("upi")}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${paymentMethod === 'upi' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-background/50 text-muted-foreground hover:bg-white/5'}`}
                                    >
                                        <Wallet className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-medium">UPI</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("net")}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${paymentMethod === 'net' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-background/50 text-muted-foreground hover:bg-white/5'}`}
                                    >
                                        <Building className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-medium">Net Banking</span>
                                    </button>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-foreground">Card Number</label>
                                            <Input placeholder="0000 0000 0000 0000" className="bg-background/50 font-mono" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm text-foreground">Expiry (MM/YY)</label>
                                                <Input placeholder="MM/YY" className="bg-background/50" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-foreground">CVC</label>
                                                <Input type="password" placeholder="123" className="bg-background/50" maxLength={4} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-foreground">Name on Card</label>
                                            <Input placeholder="John Doe" className="bg-background/50" />
                                        </div>
                                    </div>
                                )}
                                {paymentMethod === 'upi' && (
                                    <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-4 text-center pb-4">
                                        <p className="text-sm text-muted-foreground mb-4">Scan QR Code or enter your UPI ID.</p>
                                        <div className="w-40 h-40 bg-white rounded-xl mx-auto flex items-center justify-center text-background font-bold opacity-80 mb-4">
                                            [QR CODE]
                                        </div>
                                        <Input placeholder="username@bank" className="bg-background/50 text-center" />
                                    </div>
                                )}

                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary Form */}
                    <div>
                        <Card className="border-primary/20 bg-card/60 backdrop-blur-xl shadow-[0_0_30px_rgba(79,70,229,0.1)] sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>Order ID: ORD-9821</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-foreground">Project Cost</span>
                                    <span className="font-semibold text-white">$4,500.00</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                                        Platform Fee (5%)
                                    </span>
                                    <span className="text-white">$225.00</span>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <span className="text-lg font-bold text-white">Total Payment</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-primary block">$4,725.00</span>
                                        <span className="text-xs text-muted-foreground">Incl. of all taxes</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full h-12 text-base font-semibold bg-primary text-white hover:bg-primary/90 mt-2"
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? "Processing Payment..." : "Proceed to Secure Payment"}
                                </Button>
                            </CardFooter>
                            <div className="p-4 bg-primary/5 text-xs text-center text-muted-foreground border-t border-primary/10 rounded-b-xl flex justify-center items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-primary" /> End-to-end 256-bit encryption
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
