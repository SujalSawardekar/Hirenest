import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, AlertTriangle, FileCheck } from "lucide-react";

export default function TrustPage() {
  const pillars = [
    { icon: Shield, title: "Identity Verification", desc: "Every high-value professional on our platform undergoes a multi-layer KYC check." },
    { icon: Lock, title: "Secure Escrow", desc: "Funds are protected from the moment a project starts until you approve the work." },
    { icon: FileCheck, title: "Milestone Protection", desc: "Break projects into stages to ensure quality and payment security at every step." },
    { icon: Eye, title: "Transparency", desc: "Verified reviews and project history for every freelancer and client." },
  ];

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Navbar />
      <main className="flex-1 mt-16">
        <section className="relative pt-32 pb-24 overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center">
            <Badge className="bg-accent/20 text-accent mb-6 px-6 py-2 rounded-full font-bold">TRUST & SAFETY</Badge>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">Your safety is our <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary italic tracking-widest uppercase">priority</span></h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We've built a multi-layered security infrastructure to ensure HireNest remains the world's most secure freelance marketplace.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white/5 border-y border-white/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((p, i) => (
                <div key={i} className="bg-card rounded-[2.5rem] p-10 border border-white/5 hover:border-accent/40 transition-all group">
                   <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 text-accent group-hover:scale-110 transition-transform shadow-xl">
                      <p.icon size={32} />
                   </div>
                   <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                   <p className="text-muted-foreground leading-relaxed font-medium">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl bg-card border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-3xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-8 text-red-500">
               <AlertTriangle size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-8">Anti-Fraud & Payment Security</h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Our automated anti-fraud engines monitor millions of data points across every transaction to detect and prevent unauthorized activity. We are PCI-DSS Level 1 compliant, ensuring your financial information never touches our servers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale">
               <span className="font-bold tracking-widest">PCI-DSS COMPLIANT</span>
               <span className="font-bold tracking-widest">SSL ENCRYPTED</span>
               <span className="font-bold tracking-widest">SECURE ESCROW</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
