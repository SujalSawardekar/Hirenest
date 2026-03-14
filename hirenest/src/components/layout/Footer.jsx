import Link from "next/link";
import { Briefcase } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-card text-card-foreground">
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Briefcase className="h-6 w-6 text-primary" />
                            <span className="inline-block font-bold text-xl tracking-tight text-white">HireNest</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            The modern freelance marketplace connecting top talent with amazing clients in a secure environment.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider text-white">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/freelancers" className="hover:text-foreground transition">Browse Freelancers</Link></li>
                            <li><Link href="/jobs" className="hover:text-foreground transition">Browse Jobs</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-foreground transition">How It Works</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider text-white">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-foreground transition">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-foreground transition">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-foreground transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider text-white">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/help" className="hover:text-foreground transition">Help Center</Link></li>
                            <li><Link href="/support" className="hover:text-foreground transition">Support</Link></li>
                            <li><Link href="/trust" className="hover:text-foreground transition">Trust & Safety</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-border pt-8 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} HireNest. All rights reserved.</p>
                    <p className="mt-4 md:mt-0 max-w-sm text-center md:text-right">
                        Built dynamically with Next.js, React, and Tailwind CSS.
                    </p>
                </div>
            </div>
        </footer>
    );
}
