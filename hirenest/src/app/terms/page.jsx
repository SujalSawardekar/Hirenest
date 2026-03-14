import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  const sections = [
    { h: "The Platform", c: "HireNest is a marketplace platform that connects clients with freelance professionals. We do not provide the services themselves and are not responsible for the quality of work beyond our dispute resolution process." },
    { h: "Account Registration", c: "You must be at least 18 years old to use HireNest. You are responsible for all activity that occurs under your account and for maintaining the security of your password." },
    { h: "Payments & Escrow", c: "Clients agree to fund project milestones in advance. Funds are held in escrow and released to the freelancer upon client approval of the work. HireNest charges a service fee for facilitating these transactions." },
    { h: "Prohibited Content", c: "Users may not post jobs or services that involve illegal activity, adult content, or harassment. We reserve the right to suspend accounts that violate these terms." },
  ];

  return (
    <div className="flex flex-col min-h-screen text-white bg-background">
      <Navbar />
      <main className="flex-1 mt-16 pb-24">
        <section className="pt-32 pb-24 border-b border-white/5">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">Last updated: March 12, 2026</p>
          </div>
        </section>

        <section className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="space-y-16">
              {sections.map((s, i) => (
                <div key={i} className="space-y-6">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                    <span className="text-accent font-black opacity-30">{String(i + 1).padStart(2, '0')}</span>
                    {s.h}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line bg-card/30 p-8 rounded-3xl border border-white/5">
                    {s.c}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
