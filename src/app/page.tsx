"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Layers,
  ShieldCheck,
  Code2,
  ChevronRight,
  Send,
  Command,
  Hexagon,
  Orbit,
  Cpu,
  Boxes,
  Diamond,
  Activity,
  Terminal,
  Plus,
  Minus,
  MessageSquare,
  Rocket,
  Search,
  PenTool,
} from "lucide-react";

// ==========================================
// 1. AGENCY CONFIGURATION (EDIT YOUR INFO HERE)
// ==========================================
const AGENCY_CONFIG = {
  name: "VANGUARD",
  suffix: ".STUDIO",
  // Put your WhatsApp number with country code (no + or spaces, e.g., "919876543210" or "15551234567")
  whatsappNumber: "919876543210",
  email: "hello@vanguard.studio",
};

type ServiceOption = {
  id: string;
  label: string;
  price: number;
  weeks: number;
};

const SCOPE_OPTIONS: ServiceOption[] = [
  { id: "web", label: "Custom Web Platform / SaaS", price: 3500, weeks: 4 },
  { id: "mobile", label: "iOS & Android Mobile App", price: 5000, weeks: 6 },
  { id: "ecom", label: "High-Conversion Online Store", price: 2800, weeks: 3 },
  { id: "brand", label: "UI/UX Design System & Branding", price: 1500, weeks: 2 },
];

const CLIENT_LOGOS = [
  { name: "NOVAPAY", tag: "Fintech", icon: Orbit },
  { name: "AETHERIA", tag: "Luxury Commerce", icon: Diamond },
  { name: "KINETIX AI", tag: "Cloud SaaS", icon: Cpu },
  { name: "HYPERION", tag: "Mobile Banking", icon: Hexagon },
  { name: "VELOCE", tag: "D2C Streetwear", icon: Activity },
  { name: "SYNTHESIS", tag: "Enterprise Web", icon: Command },
  { name: "ORBITAL", tag: "Logistics App", icon: Boxes },
  { name: "CHRONOS", tag: "DevTools", icon: Terminal },
];

const TECH_STACK_TICKER = [
  "Next.js App Router",
  "React Native & Expo",
  "Shopify Plus Headless",
  "TypeScript Strict",
  "Tailwind CSS",
  "Framer Motion",
  "Stripe & Razorpay",
  "AWS Edge & Vercel",
  "PostgreSQL & Prisma",
  "Flutter 60fps",
];

const PROJECTS = [
  {
    title: "NovaPay Fintech App",
    category: "Mobile App",
    metric: "+340% User Retention",
    desc: "Cross-platform React Native wallet with biometric checkout and real-time analytics.",
    tags: ["React Native", "TypeScript", "Node.js"],
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
  },
  {
    title: "Aether Luxury Streetwear",
    category: "Online Store",
    metric: "0.4s Page Load / +190% Sales",
    desc: "Headless Shopify storefront with 3D product previews and instant global checkout.",
    tags: ["Next.js", "Shopify Plus", "Tailwind"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    title: "Vortex AI Cloud Console",
    category: "Web Platform",
    metric: "$4.2M Seed Raised",
    desc: "Enterprise SaaS dashboard and marketing architecture built for high-throughput data.",
    tags: ["Next.js App Router", "WebSockets", "Framer Motion"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Architecture",
    desc: "We map out your user journeys, database schema, and conversion funnel in a clear blueprint within 48 hours.",
    icon: Search,
  },
  {
    step: "02",
    title: "Interactive UI/UX Prototyping",
    desc: "You test every screen in Figma before a single line of code is written—zero guesswork, 100% visual alignment.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Agile Full-Stack Sprints",
    desc: "We build your web platform, mobile app, or online store with weekly live preview links you can test on your phone.",
    icon: Code2,
  },
  {
    step: "04",
    title: "QA, Launch & Growth Handover",
    desc: "Payment gateway testing, SEO indexing, App Store deployment, and 30 days of dedicated post-launch support.",
    icon: Rocket,
  },
];

const FAQS = [
  {
    q: "How long does it take to launch an online store or website?",
    a: "High-converting e-commerce stores and custom marketing websites typically launch in 2 to 4 weeks. Full-scale iOS/Android mobile apps take 5 to 8 weeks depending on custom integrations.",
  },
  {
    q: "Do I own 100% of the source code and accounts?",
    a: "Yes. Upon project completion, you own 100% of the GitHub repository, Figma design files, domain, Shopify/cloud accounts, and intellectual property.",
  },
  {
    q: "Can you integrate local and international payment gateways?",
    a: "Absolutely. We integrate Stripe, PayPal, Razorpay, Cashfree, UPI, Apple Pay, and Google Pay with automated tax and invoice generation.",
  },
  {
    q: "How do payments work?",
    a: "We work on milestone-based transparency: 40% to kick off architecture & design, 30% upon interactive prototype approval, and 30% upon final live deployment.",
  },
];

export default function AgencyLandingPage() {
  const [selectedScope, setSelectedScope] = useState<string[]>(["web"]);
  const [fastTrack, setFastTrack] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // --- Interactive Cursor Glow Engine ---
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const springX = useSpring(mouseX, { stiffness: 140, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 28, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cursorSpotlight = useMotionTemplate`radial-gradient(650px circle at ${springX}px ${springY}px, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.06) 40%, transparent 80%)`;

  const toggleScope = (id: string) => {
    setSelectedScope((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const selectedLabels = SCOPE_OPTIONS.filter((o) =>
    selectedScope.includes(o.id)
  ).map((o) => o.label);

  const baseCost = SCOPE_OPTIONS.filter((o) =>
    selectedScope.includes(o.id)
  ).reduce((sum, item) => sum + item.price, 0);
  const totalCost = fastTrack ? Math.round(baseCost * 1.25) : baseCost;

  const baseWeeks = SCOPE_OPTIONS.filter((o) =>
    selectedScope.includes(o.id)
  ).reduce((sum, item) => sum + item.weeks, 0);
  const totalWeeks = fastTrack
    ? Math.max(2, Math.round(baseWeeks * 0.65))
    : baseWeeks;

  // Pre-fills the contact form when user clicks "Lock In This Estimate"
  const handleLockEstimate = () => {
    const summary = `Selected Scope: ${selectedLabels.join(", ")} | Est. Budget: $${totalCost.toLocaleString()} (~${totalWeeks} weeks)${fastTrack ? " [Priority Fast-Track]" : ""}. `;
    setProjectNotes(summary);
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Generates a direct WhatsApp message with all project details
  const handleWhatsAppSend = () => {
    const text = `Hi ${AGENCY_CONFIG.name}! I'm ${clientName || "a prospective client"} (${clientEmail || "no email provided"}).\n\n*Project Scope:* ${selectedLabels.join(", ")}\n*Est. Budget:* $${totalCost.toLocaleString()} (~${totalWeeks} wks)\n*Details:* ${projectNotes || "I'd like to discuss a new project."}`;
    const url = `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      {/* Interactive Cursor Spotlight Overlay */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{ background: cursorSpotlight }}
      />

      {/* Sleek Trailing Cursor Halo (Desktop Only) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-8 h-8 -ml-4 -mt-4 rounded-full border border-indigo-400/40 bg-indigo-500/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(99,102,241,0.45)]"
        style={{ x: springX, y: springY }}
      />

      {/* Static Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-12%] left-[15%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Sticky Glass Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070709]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-black shadow-lg shadow-indigo-500/25">
              V
            </div>
            <span className="font-bold text-xl tracking-tight">
              {AGENCY_CONFIG.name}
              <span className="text-indigo-400">{AGENCY_CONFIG.suffix}</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#process" className="hover:text-white transition">Process</a>
            <a href="#estimator" className="hover:text-white transition">Estimator</a>
            <a href="#work" className="hover:text-white transition">Work</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              2 Slots Open This Month
            </div>
            <a
              href="#contact"
              className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition flex items-center gap-1.5"
            >
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Gen Web, Mobile App & E-Commerce Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.08]"
          >
            We build digital products that{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              print revenue.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            From lightning-fast custom websites and native iOS/Android apps to automated online stores—we turn ambitious brands into market leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#estimator"
              className="px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition shadow-xl shadow-indigo-600/30 flex items-center gap-2"
            >
              Calculate Your Instant Quote <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#work"
              className="px-7 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 font-semibold transition"
            >
              Explore Live Case Studies
            </a>
          </motion.div>

          {/* Authority Metrics Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-10 bg-white/[0.01]">
            {[
              { value: "99.9%", label: "Uptime & Lighthouse Speed" },
              { value: "$48M+", label: "Client E-Commerce GMV" },
              { value: "65+", label: "Apps & Stores Launched" },
              { value: "3.2x", label: "Avg. Conversion Lift" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Infinite Scrolling Client Logo & Tech Marquee */}
        <section className="py-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Trusted by high-growth startups & global commerce brands
            </p>
          </div>

          <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <motion.div
              className="flex gap-5 pr-5 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
            >
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => {
                const IconComponent = logo.icon;
                return (
                  <div
                    key={idx}
                    className="group flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-indigo-500/40 transition-all duration-300 cursor-pointer shrink-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold tracking-wider text-sm text-zinc-200 group-hover:text-white">
                        {logo.name}
                      </div>
                      <div className="text-[11px] text-zinc-500">{logo.tag}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="relative flex overflow-hidden mt-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              className="flex gap-3 pr-3 w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 34 }}
            >
              {[...TECH_STACK_TICKER, ...TECH_STACK_TICKER].map((tech, idx) => (
                <div
                  key={idx}
                  className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.015] text-xs text-zinc-400 flex items-center gap-2 shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                  {tech}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Our Capabilities</p>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2">Everything you need to scale online.</h2>
            </div>
            <p className="text-zinc-400 max-w-md mt-4 md:mt-0 text-sm">
              Engineered from the ground up for sub-second speed, mobile-first ergonomics, and frictionless checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">High-Velocity Websites & Web Apps</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Custom Next.js and React platforms engineered for instant page loads, technical SEO dominance, and interactive motion storytelling that leaves template competitors behind.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js App Router", "Tailwind CSS", "SEO Architecture", "Headless CMS", "SaaS Portals"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">iOS & Android Mobile Apps</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Sleek, 60fps cross-platform and native mobile apps with push notifications, biometric login, and offline resilience.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React Native", "Flutter", "App Store Launch"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-cyan-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Online Store & E-Commerce Setup</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Turnkey Shopify Plus, WooCommerce, and custom headless storefronts with automated inventory, UPI/Stripe gateways, and 1-click checkout.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Shopify Plus", "Payment Gateways", "Conversion Optimization"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-purple-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Chatbots, CRM & Workflow Automation</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                We don&apos;t just launch and leave. We wire your website and store directly into AI support agents, WhatsApp order alerts, and automated lead pipelines.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AI Concierge", "WhatsApp API", "Stripe Billing", "Analytics Dashboards"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Engineering Process Section */}
        <section id="process" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">How We Deliver</p>
            <h2 className="text-3xl sm:text-5xl font-bold mt-2">From idea to live product in 4 sprints.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-7 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/40 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-extrabold text-indigo-400/40">{item.step}</span>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Project Estimator */}
        <section id="estimator" className="max-w-7xl mx-auto px-6 py-20">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-b from-indigo-950/20 to-black/60 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  Interactive Transparency
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                  Build Your Custom Project Scope
                </h2>
                <p className="text-zinc-400 mt-2 text-sm">
                  Select the deliverables you need below to preview an instant timeline and investment estimate.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SCOPE_OPTIONS.map((item) => {
                    const active = selectedScope.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleScope(item.id)}
                        className={`p-4 rounded-2xl border text-left transition flex items-start justify-between ${
                          active
                            ? "border-indigo-500 bg-indigo-500/15 text-white"
                            : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25"
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-sm">{item.label}</div>
                          <div className="text-xs text-zinc-400 mt-1">
                            +${item.price.toLocaleString()} • ~{item.weeks} wks
                          </div>
                        </div>
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 ${
                            active ? "text-indigo-400" : "text-zinc-700"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-semibold">Priority Fast-Track Delivery</div>
                    <div className="text-xs text-zinc-400">Dedicated sprint team to cut delivery time by 35%</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFastTrack(!fastTrack)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      fastTrack
                        ? "bg-emerald-400 text-black"
                        : "bg-white/10 text-zinc-300 hover:bg-white/20"
                    }`}
                  >
                    {fastTrack ? "Enabled (+25%)" : "Add Fast-Track"}
                  </button>
                </div>
              </div>

              {/* Live Output Card */}
              <div className="lg:col-span-5 p-8 rounded-3xl border border-white/15 bg-[#0c0c12] shadow-2xl">
                <div className="text-xs uppercase tracking-wider text-zinc-400">Estimated Investment</div>
                <div className="text-5xl font-extrabold text-white mt-2">
                  ${totalCost.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-emerald-400 font-medium">
                  Estimated Launch: ~{totalWeeks} Weeks
                </div>

                <div className="my-6 border-t border-white/10 pt-6 space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" /> Full source code & IP ownership
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" /> Responsive across Mobile, Tablet & Desktop
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" /> 30 days of free post-launch support
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLockEstimate}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition cursor-pointer"
                >
                  Lock In This Estimate <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filterable Case Studies */}
        <section id="work" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Proven Results</p>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2">Selected Client Launches</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Web Platform", "Mobile App", "Online Store"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    activeFilter === cat
                      ? "bg-white text-black"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={project.title}
                  className={`p-8 rounded-3xl border border-white/10 bg-gradient-to-b ${project.gradient} flex flex-col justify-between hover:border-white/30 transition`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                      <span>{project.category}</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold">
                        {project.metric}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{project.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {project.tags.map((t) => (
                      <span key={t} className="text-xs text-zinc-300 bg-black/40 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Interactive FAQ Accordion */}
        <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Got Questions?</p>
            <h2 className="text-3xl sm:text-5xl font-bold mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-semibold text-base sm:text-lg hover:text-indigo-300 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-indigo-400 shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-zinc-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact / Lead Capture Section */}
        <section id="contact" className="max-w-4xl mx-auto px-6 py-24">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-white/[0.02] text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold">Ready to build something iconic?</h2>
            <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
              Tell us about your website, app, or online store vision. Send your brief via Email or chat directly on WhatsApp.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold space-y-4">
                <div>🎉 Your email client has been opened with your project brief!</div>
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold text-sm inline-flex items-center gap-2 hover:bg-emerald-400 transition"
                >
                  <MessageSquare className="w-4 h-4" /> Also Send Instant Copy on WhatsApp
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const subject = encodeURIComponent(`New Project Inquiry from ${clientName}`);
                  const body = encodeURIComponent(
                    `Name: ${clientName}\nEmail: ${clientEmail}\nSelected Quote: $${totalCost.toLocaleString()} (~${totalWeeks} weeks)\n\nProject Notes:\n${projectNotes}`
                  );
                  window.location.href = `mailto:${AGENCY_CONFIG.email}?subject=${subject}&body=${body}`;
                  setSubmitted(true);
                }}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
              >
                <input
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your Name"
                  className="px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-sm focus:outline-none focus:border-indigo-500"
                />
                <input
                  required
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Work Email"
                  className="px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-sm focus:outline-none focus:border-indigo-500"
                />
                <textarea
                  required
                  rows={4}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Tell us about your project goals, timeline, or store setup needs..."
                  className="sm:col-span-2 px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-sm focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className=" py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  Send Brief via Email <Send className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="py-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" /> Send Quote to WhatsApp
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Professional Agency Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050507] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-black text-xs">
              V
            </div>
            <span className="font-bold text-zinc-300">
              {AGENCY_CONFIG.name}
              <span className="text-indigo-400">{AGENCY_CONFIG.suffix}</span>
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} {AGENCY_CONFIG.name}{AGENCY_CONFIG.suffix}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
