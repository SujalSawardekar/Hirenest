import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, LifeBuoy, Book, ShieldCheck, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const categories = [
    { icon: User, title: "Getting Started", count: "12 articles" },
    { icon: CreditCard, title: "Payments & Fees", count: "8 articles" },
    { icon: ShieldCheck, title: "Account Security", count: "5 articles" },
    { icon: Book, title: "Platform Rules", count: "10 articles" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        <section className="relative pt-32 pb-24 overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center text-white">
            <Badge className="bg-primary/20 text-primary mb-6 px-6 py-2 rounded-full font-bold">HELP CENTER</Badge>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">help?</span></h1>
            
            <div className="max-w-3xl mx-auto relative mb-16">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <input 
                type="text" 
                placeholder="Search for articles, guides..." 
                className="w-full h-16 pl-16 pr-8 rounded-3xl bg-card border border-white/10 text-lg focus:outline-none focus:border-primary/50 transition-all shadow-2xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <div key={i} className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <cat.icon size={32} />
                  </div>
                  <h3 className="font-bold text-xl mb-1">{cat.title}</h3>
                  <p className="text-muted-foreground font-medium">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-card/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center">Top Questions</h2>
            <Accordion type="single" collapsible className="space-y-6">
              {[
                { q: "How do I withdraw my earnings?", a: "Earnings are automatically transferred to your connected bank account or PayPal after the standard 5-day security clearance period. You can manage your payout methods in Account Settings." },
                { q: "Is my personal data encrypted?", a: "Yes, HireNest uses AES-256 encryption for all sensitive data and private communications. We never share your data with third parties without your explicit consent." },
                { q: "What should I do if a client stops responding?", a: "If a client is unresponsive on an active milestone for more than 48 hours, you can initiate a 'Follow Up' request via the project dashboard. If they remain unresponsive, our support team can intervene." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white/5 border border-white/10 rounded-[2rem] px-8 py-2">
                  <AccordionTrigger className="text-white hover:text-primary transition-colors text-xl font-bold py-6 no-underline text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg pb-8">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-24 bg-background border-t border-white/5">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8 text-accent">
              <LifeBuoy size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Still need assistance?</h2>
            <p className="text-muted-foreground text-lg mb-10">Our global support team is available 24/7 to help you resolve any issues or answer specific questions.</p>
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 h-16 px-12 font-bold text-lg">Contact Support</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
