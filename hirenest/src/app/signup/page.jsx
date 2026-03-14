"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Briefcase, Mail, Lock, User, Phone, Code, LineChart, FileText, BadgeDollarSign, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SignupPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams?.get("role") === "freelancer" ? "freelancer" : "client";

    const [role, setRole] = useState(initialRole);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form state
    const { login } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (step === 1 && role === "freelancer") {
            setStep(2);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email,
                    phone,
                    password,
                    role: role.toUpperCase(),
                    skills: role === "freelancer" ? skills : undefined,
                    hourlyRate: role === "freelancer" ? Number(hourlyRate) : undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed. Please try again.");
                setIsLoading(false);
                return;
            }

            login(data);
        } catch {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[0%] -left-[10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-xl relative z-10">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="flex justify-center mb-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Briefcase className="h-8 w-8 text-primary" />
                        <span className="font-bold text-2xl tracking-tight text-white">HireNest</span>
                    </Link>
                </div>

                <Card className="border-white/5 bg-card/50 backdrop-blur-xl mb-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                        <CardDescription>
                            Join the most trusted freelance marketplace
                        </CardDescription>
                    </CardHeader>

                    {step === 1 && (
                        <div className="px-6 pb-6 pt-0 flex bg-background/50 rounded-lg mx-6 p-1 relative border border-white/5">
                            <button
                                type="button"
                                onClick={() => setRole("client")}
                                className={cn(
                                    "relative w-full py-2 text-sm font-medium transition-all rounded-md z-10",
                                    role === "client" ? "text-white" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                {role === "client" && (
                                    <motion.div layoutId="role-bg" className="absolute inset-0 bg-primary rounded-md -z-10" />
                                )}
                                I want to Hire
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("freelancer")}
                                className={cn(
                                    "relative w-full py-2 text-sm font-medium transition-all rounded-md z-10",
                                    role === "freelancer" ? "text-white" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                {role === "freelancer" && (
                                    <motion.div layoutId="role-bg" className="absolute inset-0 bg-primary rounded-md -z-10" />
                                )}
                                I want to Work
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    {error}
                                </div>
                            )}
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4 pt-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input id="fname" placeholder="First Name" className="pl-9 bg-background/50" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input id="lname" placeholder="Last Name" className="pl-9 bg-background/50" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="email" type="email" placeholder="Email address" className="pl-9 bg-background/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="phone" type="tel" placeholder="Phone number" className="pl-9 bg-background/50" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="password" type="password" placeholder="Create password" className="pl-9 bg-background/50" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && role === "freelancer" && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4 pt-4"
                                    >
                                        <h3 className="text-lg font-medium text-white mb-2">Build Your Profile</h3>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Code className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="skills" placeholder="Skills (e.g. React, UI Design)" className="pl-9 bg-background/50" value={skills} onChange={(e) => setSkills(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="portfolio" placeholder="Portfolio URL" className="pl-9 bg-background/50" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <LineChart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input id="experience" type="number" placeholder="Years of Exp." className="pl-9 bg-background/50" required min="0" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <BadgeDollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input id="rate" type="number" placeholder="Hourly Rate ($)" className="pl-9 bg-background/50" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} required min="5" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 border-t border-white/5 pt-6 mt-2">
                            <div className="flex w-full space-x-4">
                                {step > 1 && (
                                    <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(step - 1)}>
                                        Back
                                    </Button>
                                )}
                                <Button type="submit" className="w-full text-white" disabled={isLoading}>
                                    {isLoading
                                        ? "Creating account..."
                                        : (step === 1 && role === "freelancer")
                                            ? "Continue"
                                            : "Create Account"
                                    }
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">Already have an account? </span>
                                <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupPageContent />
        </Suspense>
    );
}
