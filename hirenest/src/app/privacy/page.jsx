import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  const sections = [
    { h: "Information We Collect", c: "We collect information you provide directly to us when you create an account, complete your profile, or communicate with us. This includes your name, email, payment information, and any project-related files." },
    { h: "How We Use Data", c: "We use the information we collect to operate and maintain HireNest, facilitate project collaborations, process payments, and protect our platform from fraud and abuse." },
    { h: "Security of Information", c: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure." },
    { h: "Cookies & Tracking", c: "We use cookies to improve your experience and analyze platform performance. You can manage your cookie preferences in your browser settings." },
  ];

  return (
    <div className="flex flex-col min-h-screen text-white bg-background">
      <Navbar />
      <main className="flex-1 mt-16 pb-24">
        <section className="pt-32 pb-24 border-b border-white/5">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">Last updated: March 12, 2026</p>
          </div>
        </section>

        <section className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="space-y-16">
              {sections.map((s, i) => (
                <div key={i} className="space-y-6">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                    <span className="text-primary font-black opacity-30">{String(i + 1).padStart(2, '0')}</span>
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
