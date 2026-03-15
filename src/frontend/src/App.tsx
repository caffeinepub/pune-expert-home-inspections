import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera,
  CheckCircle2,
  ClipboardList,
  DoorOpen,
  FileText,
  Home,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

function useScrollSpy() {
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const handler = () => {
      const sections = ["services", "inspection", "areas", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return activeSection;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const services = [
  {
    icon: <Home className="w-7 h-7" />,
    title: "Wall & Ceiling Inspection",
    description:
      "We meticulously examine all walls and ceilings for cracks, dampness, seepage, and water leakage — including hidden moisture that could lead to structural damage.",
  },
  {
    icon: <DoorOpen className="w-7 h-7" />,
    title: "Door & Window Inspection",
    description:
      "Every door and window is checked for cracks, physical damage, improper alignment, and faulty seals that could compromise security or energy efficiency.",
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: "Flooring Inspection",
    description:
      "Our experts tap and assess every floor tile to identify loose, hollow, or cracked tiles — catching issues before they become expensive repairs.",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Electrical Checks",
    description:
      "All switchboards, plug sockets, and wiring are thoroughly tested for safety compliance, proper earthing, and signs of overloading or faulty connections.",
  },
];

const checkpoints = [
  {
    icon: <CheckCircle2 className="w-5 h-5 text-accent" />,
    text: "100+ individual checkpoints per property",
  },
  {
    icon: <ClipboardList className="w-5 h-5 text-accent" />,
    text: "Detailed written inspection report delivered",
  },
  {
    icon: <Camera className="w-5 h-5 text-accent" />,
    text: "Photo documentation of every issue found",
  },
  {
    icon: <FileText className="w-5 h-5 text-accent" />,
    text: "Room-by-room structured assessment",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-accent" />,
    text: "Certified inspector with local expertise",
  },
  {
    icon: <Star className="w-5 h-5 text-accent" />,
    text: "Post-inspection consultation included",
  },
];

export default function App() {
  const activeSection = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Why Choose Us", id: "inspection" },
    { label: "Areas We Serve", id: "areas" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Navigation ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-nav" : "bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full amber-gradient flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-primary text-lg leading-tight">
              Pune Expert
              <span className="block text-xs font-body font-medium text-muted-foreground tracking-widest uppercase">
                Home Inspections
              </span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.${link.id}.link`}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === link.id
                    ? "text-accent bg-accent/10"
                    : "text-foreground/70 hover:text-primary hover:bg-secondary"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              data-ocid="nav.book_inspection.primary_button"
              size="sm"
              className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollTo("contact")}
            >
              Book Inspection
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border shadow-lg">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.mobile.${link.id}.link`}
                onClick={() => {
                  scrollTo(link.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-6 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary border-b border-border/50 last:border-0"
              >
                {link.label}
              </button>
            ))}
            <div className="p-4">
              <Button
                data-ocid="nav.mobile.book_inspection.primary_button"
                className="w-full bg-primary text-primary-foreground"
                onClick={() => {
                  scrollTo("contact");
                  setMenuOpen(false);
                }}
              >
                Book Inspection
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-inspection.dim_1200x600.jpg')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative container mx-auto px-4 py-24 max-w-3xl">
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 text-xs font-semibold tracking-wider uppercase">
            Pune's #1 Home Inspection Service
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Pune's Trusted
            <span className="block text-accent">Home Inspection</span>
            Experts
          </h1>
          <p className="text-white/85 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed">
            Know every corner of your home before you move in. We inspect every
            surface, wire, and tile — so you can move in with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              data-ocid="hero.book_inspection.primary_button"
              size="lg"
              className="amber-gradient text-white border-0 hover:opacity-90 shadow-lg text-base font-semibold px-8"
              onClick={() => scrollTo("contact")}
            >
              Book an Inspection
            </Button>
            <Button
              data-ocid="hero.our_services.secondary_button"
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white/60 backdrop-blur-sm text-base font-semibold px-8"
              onClick={() => scrollTo("services")}
            >
              Our Services
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap gap-6">
            {[
              {
                label: "100+ Checkpoints",
                icon: <ClipboardList className="w-4 h-4" />,
              },
              { label: "Photo Reports", icon: <Camera className="w-4 h-4" /> },
              {
                label: "All Pune Covered",
                icon: <MapPin className="w-4 h-4" />,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-white/80 text-sm font-medium"
              >
                <span className="text-accent">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-semibold tracking-wider uppercase">
              What We Check
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Inspection Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A structured, methodical inspection across four critical areas of
              your home — nothing is missed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                data-ocid={`services.item.${i + 1}`}
                className="group p-6 rounded-xl border border-border bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/8 text-primary flex items-center justify-center mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comprehensive Indoor Inspection ── */}
      <section id="inspection" className="py-24 section-alt">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Summary */}
            <div>
              <Badge className="mb-4 bg-accent/15 text-accent border-accent/25 text-xs font-semibold tracking-wider uppercase">
                Deep-Dive Assessment
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Comprehensive
                <span className="block text-primary">Indoor Inspection</span>
              </h2>
              <p className="text-foreground/75 text-base leading-relaxed mb-6">
                Our inspection process goes far beyond a quick visual
                walk-through. We move room by room, evaluating every surface,
                fixture, and fitting with precision. Each property receives a
                structured assessment that leaves nothing to guesswork.
              </p>
              <p className="text-foreground/75 text-base leading-relaxed mb-8">
                At the end of your inspection, you receive a comprehensive
                written report with photographic evidence of every issue
                identified — giving you the information you need to negotiate,
                repair, or simply move in with peace of mind.
              </p>
              <Button
                data-ocid="inspection.book.primary_button"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={() => scrollTo("contact")}
              >
                Schedule Your Inspection
              </Button>
            </div>

            {/* Right: Checkpoints */}
            <div className="grid sm:grid-cols-2 gap-4">
              {checkpoints.map((item, i) => (
                <div
                  key={item.text}
                  data-ocid={`inspection.checkpoint.item.${i + 1}`}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white border border-border shadow-xs"
                >
                  <span className="shrink-0 mt-0.5">{item.icon}</span>
                  <span className="text-sm font-medium text-foreground/85 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Areas We Serve ── */}
      <section id="areas" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-semibold tracking-wider uppercase">
              Service Coverage
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Areas We Serve
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Wherever you are in Pune, we come to you.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Main callout */}
            <div className="rounded-2xl bg-primary p-8 text-center mb-8">
              <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                We Cover All of Pune
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                From Hinjewadi to Viman Nagar, Kothrud to Wagholi — and
                everywhere in between. No matter which neighbourhood your
                property is in, our inspectors are ready to visit.
              </p>
            </div>

            {/* Area badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "Hinjewadi",
                "Viman Nagar",
                "Kothrud",
                "Wagholi",
                "Baner",
                "Wakad",
                "Aundh",
                "Hadapsar",
                "Pimple Saudagar",
                "Kondhwa",
                "Katraj",
                "Magarpatta",
                "Koregaon Park",
                "Shivajinagar",
                "Pune Camp",
                "Deccan",
              ].map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="px-3 py-1.5 text-sm font-medium border-primary/25 text-primary bg-primary/5"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/25 text-xs font-semibold tracking-wider uppercase">
              Let's Talk
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Ready to book an inspection or have questions? Reach out to us —
              we're just a call or message away.
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-6">
            {/* Phone / WhatsApp */}
            <a
              data-ocid="contact.whatsapp.button"
              href="https://wa.me/918149384610"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-xl bg-white border border-border shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  WhatsApp / Call
                </p>
                <p className="font-display font-semibold text-foreground text-lg">
                  81493 84610
                </p>
                <p className="text-xs text-green-600 font-medium mt-0.5">
                  Chat on WhatsApp →
                </p>
              </div>
            </a>

            {/* Phone call */}
            <a
              data-ocid="contact.phone.button"
              href="tel:+918149384610"
              className="flex items-center gap-4 p-6 rounded-xl bg-white border border-border shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="font-display font-semibold text-foreground text-lg">
                  81493 84610
                </p>
                <p className="text-xs text-primary font-medium mt-0.5">
                  Tap to call →
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              data-ocid="contact.email.button"
              href="mailto:inspections@puneexperthomeinspections.com"
              className="sm:col-span-2 flex items-center gap-4 p-6 rounded-xl bg-white border border-border shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0 group-hover:bg-accent/25 transition-colors">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  Email Us
                </p>
                <p className="font-display font-semibold text-foreground">
                  inspections@puneexperthomeinspections.com
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  We respond within 24 hours
                </p>
              </div>
            </a>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-8 max-w-md mx-auto">
            Available Monday – Saturday, 9 AM to 7 PM. We serve all areas across
            Pune with prompt scheduling.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full amber-gradient flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg">
                  Pune Expert Home Inspections
                </span>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Pune's trusted home inspection service — thorough, professional,
                and reliable. Know your home inside out before you commit.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-primary-foreground/90 mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      data-ocid={`footer.${link.id}.link`}
                      onClick={() => scrollTo(link.id)}
                      className="text-primary-foreground/65 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-primary-foreground/90 mb-4 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/918149384610"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                  81493 84610 (WhatsApp)
                </a>
                <a
                  href="tel:+918149384610"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  81493 84610
                </a>
                <a
                  href="mailto:inspections@puneexperthomeinspections.com"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  inspections@puneexperthomeinspections.com
                </a>
                <div className="flex items-start gap-2 text-primary-foreground/70 text-sm">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Covering all areas across Pune
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
            <span>
              © {new Date().getFullYear()} Pune Expert Home Inspections. All
              rights reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/75 transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
