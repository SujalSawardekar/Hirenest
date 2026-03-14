"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, User, Mail, Lock, CreditCard, Bell, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function SettingsForm({ 
    userData, 
    userRole, 
    dashboardLink 
}) {
    const router = useRouter()
    
    // Form States
    const [name, setName] = useState(userData.name || "")
    const [title, setTitle] = useState(userData.title || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [hourlyRate, setHourlyRate] = useState(userData.hourlyRate?.toString() || "")
    const [skills, setSkills] = useState(userData.skills || "")

    // UI States
    const [isSaving, setIsSaving] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [error, setError] = useState("")

    const handleSave = async () => {
        setIsSaving(true)
        setSuccessMessage("")
        setError("")

        try {
            const res = await fetch("/api/user", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    title,
                    bio,
                    hourlyRate,
                    skills
                })
            })

            if (!res.ok) {
                const data = await res.json()
                setError(data.error || "Failed to save settings.")
            } else {
                setSuccessMessage("Settings saved successfully!")
                router.refresh()
            }
        } catch (err) {
            setError("Something went wrong.")
        } finally {
            setIsSaving(false)
            // Clear success message after 3 seconds
            if (!error) {
                setTimeout(() => setSuccessMessage(""), 3000)
            }
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Account Settings</h1>
                        <p className="text-muted-foreground">Manage your personal information and security preferences.</p>
                    </div>
                    <Link href={dashboardLink}>
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-[250px_1fr] gap-8">
                    {/* Settings Navigation Sidebar */}
                    <nav className="flex flex-col space-y-1">
                        <Button variant="ghost" className="justify-start bg-white/5 text-white">
                            <User className="mr-2 h-4 w-4" /> Profile
                        </Button>
                        <Button variant="ghost" className="justify-start text-muted-foreground hover:text-white">
                            <Lock className="mr-2 h-4 w-4" /> Security
                        </Button>
                        <Button variant="ghost" className="justify-start text-muted-foreground hover:text-white">
                            <CreditCard className="mr-2 h-4 w-4" /> Billing
                        </Button>
                        <Button variant="ghost" className="justify-start text-muted-foreground hover:text-white">
                            <Bell className="mr-2 h-4 w-4" /> Notifications
                        </Button>
                    </nav>

                    {/* Settings Content Areas */}
                    <div className="space-y-6">
                        {/* Profile Settings */}
                        <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your public profile details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-md">{error}</div>}
                                {successMessage && (
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-md flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> {successMessage}
                                    </div>
                                )}
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white leading-none">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-9 bg-background/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white leading-none">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input defaultValue={userData.email || ""} disabled className="pl-9 bg-background/50 opacity-50" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Your email address cannot be changed directly.</p>
                                </div>

                                {userRole === "FREELANCER" && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white leading-none">Professional Title</label>
                                            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-background/50" placeholder="e.g. Senior Backend Engineer" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white leading-none">Bio</label>
                                            <textarea 
                                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                value={bio} onChange={(e) => setBio(e.target.value)}
                                                placeholder="Write a short summary about yourself..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white leading-none">Hourly Rate ($)</label>
                                                <Input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="bg-background/50" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white leading-none">Skills</label>
                                                <Input value={skills} onChange={(e) => setSkills(e.target.value)} className="bg-background/50" placeholder="React, Node, UI/UX" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <Button className="bg-primary text-white mt-4 disabled:opacity-50 min-w-32" onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Security Settings Area Placeholder */}
                        <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>Update your password to keep your account secure.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white leading-none">Current Password</label>
                                    <Input type="password" placeholder="••••••••" className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white leading-none">New Password</label>
                                    <Input type="password" placeholder="••••••••" className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white leading-none">Confirm New Password</label>
                                    <Input type="password" placeholder="••••••••" className="bg-background/50" />
                                </div>
                                <Button variant="outline" className="mt-2 text-muted-foreground">Update Password</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
