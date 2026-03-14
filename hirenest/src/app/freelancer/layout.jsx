"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Briefcase,
    PlusCircle,
    ClipboardList,
    MessageSquare,
    Wallet,
    Settings,
    LogOut,
    Bell,
    Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const sidebarNavItems = [
    { title: "Dashboard", href: "/freelancer", icon: LayoutDashboard },
    { title: "My Profile", href: "/freelancer/profile", icon: Briefcase },
    { title: "My Gigs", href: "/freelancer/gigs", icon: Briefcase },
    { title: "Create Gig", href: "/freelancer/gigs/new", icon: PlusCircle },
    { title: "Orders", href: "/freelancer/orders", icon: ClipboardList },
    { title: "Messages", href: "/freelancer/messages", icon: MessageSquare },
    { title: "Earnings", href: "/freelancer/payments", icon: Wallet },
    { title: "Settings", href: "/settings", icon: Settings },
];

export default function FreelancerDashboardLayout({ children }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "FL";

    const handleSignOut = async () => {
        logout();
        window.location.href = "/login";
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-card/80 px-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <Link href="/" className="flex items-center space-x-2 mr-8">
                    <Briefcase className="h-6 w-6 text-accent" />
                    <span className="hidden font-bold text-lg text-white md:inline-block">HireNest Freelancer</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4 relative">
                    <Button variant="ghost" size="icon" className="relative group">
                        <Bell className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
                    </Button>
                    <Link href="/settings">
                        <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-sm font-semibold text-primary cursor-pointer hover:bg-primary/30 transition-colors" title={user?.name || "Profile"}>
                            {initials}
                        </div>
                    </Link>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden w-64 border-r bg-card/30 md:block">
                    <div className="flex h-full flex-col gap-2 p-4">
                        {user?.name && (
                            <div className="px-3 py-2 mb-2 border-b border-white/5">
                                <p className="text-xs text-muted-foreground">Logged in as</p>
                                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            </div>
                        )}
                        <nav className="flex-1 space-y-1">
                            {sidebarNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href
                                        ? "bg-accent/10 text-accent"
                                        : "text-muted-foreground hover:bg-card hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className={`h-4 w-4 ${pathname === item.href ? "text-accent" : ""}`} />
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pt-4 border-t border-white/5">
                            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" onClick={handleSignOut}>
                                <LogOut className="mr-3 h-4 w-4" />
                                Sign out
                            </Button>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
