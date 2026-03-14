"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    ShieldAlert,
    ShieldCheck,
    Activity,
    CreditCard,
    Settings,
    LogOut,
    Bell,
    Briefcase
} from "lucide-react"

import { Button } from "@/components/ui/button"

const sidebarNavItems = [
    { title: "Overview", href: "/admin", icon: LayoutDashboard },
    { title: "User Management", href: "/admin/users", icon: Users },
    { title: "Freelancer Verification", href: "/admin/verification", icon: ShieldCheck },
    { title: "Order Monitoring", href: "/admin/orders", icon: Activity },
    { title: "Transactions", href: "/admin/transactions", icon: CreditCard },
    { title: "Disputes & Spam", href: "/admin/disputes", icon: ShieldAlert },
    { title: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminDashboardLayout({ children }) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Top Header */}
            <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-destructive/10 px-6 backdrop-blur-sm">
                <Link href="/" className="flex items-center space-x-2 mr-8">
                    <ShieldCheck className="h-6 w-6 text-destructive" />
                    <span className="hidden font-bold text-lg text-white md:inline-block">HireNest Admin</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <Button variant="ghost" size="icon" className="relative group">
                        <Bell className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                    </Button>
                    <div className="h-8 w-8 rounded bg-destructive/20 border border-destructive flex items-center justify-center text-sm font-semibold text-destructive">
                        AD
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 border-r bg-card/30 hidden md:block">
                    <div className="flex h-full flex-col gap-2 p-4">
                        <nav className="flex-1 space-y-1">
                            {sidebarNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href
                                            ? "bg-destructive/10 text-destructive"
                                            : "text-muted-foreground hover:bg-card hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className={`h-4 w-4 ${pathname === item.href ? "text-destructive" : ""}`} />
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pt-4 border-t border-white/5">
                            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white">
                                <LogOut className="mr-3 h-4 w-4" />
                                Sign out Admin
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
