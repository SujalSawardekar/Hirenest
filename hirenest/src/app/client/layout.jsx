"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
    LayoutDashboard,
    Search,
    PlusCircle,
    ClipboardList,
    MessageSquare,
    CreditCard,
    Settings,
    LogOut,
    Bell,
    Menu,
    Briefcase,
    X,
    CheckCircle2,
    Package,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarNavItems = [
    { title: "Dashboard", href: "/client", icon: LayoutDashboard },
    { title: "Browse Freelancers", href: "/client/freelancers", icon: Search },
    { title: "Post Job", href: "/client/jobs/new", icon: PlusCircle },
    { title: "My Orders", href: "/client/orders", icon: ClipboardList },
    { title: "Messages", href: "/client/messages", icon: MessageSquare },
    { title: "Payments", href: "/client/payments", icon: CreditCard },
    { title: "My Profile", href: "/client/profile", icon: Briefcase },
    { title: "Settings", href: "/settings", icon: Settings },
];

const MOCK_NOTIFICATIONS = [
    { id: 1, icon: CheckCircle2, color: "text-green-400 bg-green-500/10", title: "Work submitted!", body: "Alex Johnson submitted work for E-commerce Redesign.", time: "2h ago", read: false },
    { id: 2, icon: MessageSquare, color: "text-blue-400 bg-blue-500/10", title: "New message", body: "Samantha Lee sent you a message about the logo guidelines.", time: "5h ago", read: false },
    { id: 3, icon: Package, color: "text-primary bg-primary/10", title: "Order started", body: "David Chen has started working on Smart Contract Audit.", time: "Yesterday", read: true },
    { id: 4, icon: Zap, color: "text-amber-400 bg-amber-500/10", title: "Job has applicants!", body: "3 freelancers applied to your Frontend Dashboard job.", time: "2 days ago", read: true },
];

export default function ClientDashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const unreadCount = notifications.filter(n => !n.read).length;

    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "JD";

    const handleSignOut = async () => {
        logout();
        router.push("/login");

    };

    const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-card/80 px-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <Link href="/" className="flex items-center space-x-2 mr-8">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="hidden font-bold text-lg text-white md:inline-block">HireNest</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4 relative">
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative group"
                            onClick={() => setNotifOpen(!notifOpen)}
                        >
                            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                            )}
                        </Button>

                        {notifOpen && (
                            <div className="absolute right-0 top-12 w-80 bg-card border border-white/10 rounded-xl shadow-2xl z-50">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                    <span className="font-semibold text-white text-sm">Notifications</span>
                                    <div className="flex items-center gap-2">
                                        {unreadCount > 0 && (
                                            <button onClick={markAllRead} className="text-xs text-primary hover:text-primary/80">
                                                Mark all read
                                            </button>
                                        )}
                                        <button onClick={() => setNotifOpen(false)}>
                                            <X className="h-4 w-4 text-muted-foreground hover:text-white" />
                                        </button>
                                    </div>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map(n => (
                                        <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/5 cursor-pointer ${!n.read ? "bg-primary/5" : ""}`}
                                            onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}`}>
                                                <n.icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white">{n.title}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
                                                <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
                                            </div>
                                            {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/client/profile">
                        <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-sm font-semibold text-accent cursor-pointer hover:bg-accent/30 transition-colors" title={user?.name || "Profile"}>
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
                                        ? "bg-primary text-white"
                                        : "text-muted-foreground hover:bg-card hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className={`h-4 w-4 ${pathname === item.href ? "text-white" : ""}`} />
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pt-4 border-t border-white/5">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-muted-foreground hover:text-destructive"
                                onClick={handleSignOut}
                            >
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
