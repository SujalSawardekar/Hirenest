"use client"

import { useState } from "react"
import { Send, UploadCloud, Tag, DollarSign, Clock, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function CreateGigPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("web")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [deliveryDays, setDeliveryDays] = useState("")
    const [revisions, setRevisions] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)
        
        try {
            const res = await fetch("/api/gigs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    category,
                    description,
                    price: parseFloat(price),
                    deliveryDays: parseInt(deliveryDays),
                    revisions: parseInt(revisions)
                })
            })
            
            if (!res.ok) {
                const data = await res.json()
                setError(data.error || "Failed to create gig")
                setIsSubmitting(false)
                return
            }
            
            window.location.href = "/freelancer"
        } catch (err) {
            setError("Something went wrong.")
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create a New Gig</h1>
                <p className="text-muted-foreground">Showcase your skills and services to potential clients.</p>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <form onSubmit={handleSubmit}>
                    <CardContent className="p-8 space-y-6">
                        {error && <div className="text-sm font-medium text-destructive">{error}</div>}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none">
                                Gig Title
                            </label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. I will build a modern Next.js website" className="pl-9 bg-background/50" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none">
                                Category
                            </label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                                <option value="web">Web Development</option>
                                <option value="design">UI/UX Design</option>
                                <option value="writing">Content Writing</option>
                                <option value="marketing">Digital Marketing</option>
                                <option value="video">Video Editing</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none">
                                Description
                            </label>
                            <textarea
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Describe exactly what services you offer in this gig..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white leading-none">
                                    Price
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="100" className="pl-9 bg-background/50" required min="5" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white leading-none">
                                    Delivery Time (Days)
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)} type="number" placeholder="3" className="pl-9 bg-background/50" required min="1" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white leading-none">
                                    Revisions Included
                                </label>
                                <div className="relative">
                                    <RefreshCw className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input value={revisions} onChange={(e) => setRevisions(e.target.value)} type="number" placeholder="2" className="pl-9 bg-background/50" required min="0" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none">
                                Portfolio Images (Optional)
                            </label>
                            <div className="border-2 border-dashed border-input rounded-md p-8 text-center bg-background/30 hover:bg-background/50 transition-colors cursor-pointer">
                                <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                                <p className="text-sm text-foreground font-medium">Click to upload portfolio images</p>
                                <p className="text-xs text-muted-foreground mt-1">Showcase your best work (max 3 images)</p>
                            </div>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 flex justify-end gap-4 border-t border-white/5 mt-6">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-accent text-white hover:bg-accent/90 min-w-[150px]" disabled={isSubmitting}>
                            {isSubmitting ? "Publishing..." : <><Send className="w-4 h-4 mr-2" /> Publish Gig</>}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
