"use client"

import { useState } from "react"
import { Send, UploadCloud, Calendar, DollarSign, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function PostJobPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            window.location.href = "/client/orders"
        }, 1500)
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Post a New Job</h1>
                <p className="text-muted-foreground">Describe your project, budget, and timeline to attract the best talent.</p>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <form onSubmit={handleSubmit}>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Job Title
                            </label>
                            <div className="relative">
                                <Target className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g. Build a modern React Dashboard" className="pl-9 bg-background/50" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none">
                                Project Description
                            </label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Provide a detailed description of what you need done..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none">
                                Required Skills (comma separated)
                            </label>
                            <Input placeholder="e.g. React, Node.js, Tailwind CSS" className="bg-background/50" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white leading-none">
                                    Estimated Budget
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input type="number" placeholder="1000" className="pl-9 bg-background/50" required min="10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white leading-none">
                                    Project Deadline
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input type="date" className="pl-9 bg-background/50" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white leading-none">
                                Attachments (Optional)
                            </label>
                            <div className="border-2 border-dashed border-input rounded-md p-8 text-center bg-background/30 hover:bg-background/50 transition-colors cursor-pointer">
                                <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                                <p className="text-sm text-foreground font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                            </div>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 flex justify-end gap-4 border-t border-white/5 mt-6">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary text-white hover:bg-primary/90 min-w-[150px]" disabled={isSubmitting}>
                            {isSubmitting ? "Posting..." : <><Send className="w-4 h-4 mr-2" /> Post Job</>}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
