"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Linkedin, Mail, Globe, BarChart3, Database, Brain, Filter, ChevronRight, Download, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

// ====== TYPES ======
type CaseStudyWriteup = {
  problem: string;
  approach: string;
  outcome: string;
  link?: string; // optional external long-form link
};

type Project = {
  title: string;
  blurb: string;
  cover: string;
  tags: string[];
  links: { live: string; repo: string; caseStudy: string };
  impact: string[];
  caseStudyWriteup?: CaseStudyWriteup; // optional per-project popup content
};

// ====== CONTENT CONFIG (Edit this to make it yours) ======
const PROFILE = {
  name: "Billy Analytics",
  title: "Data Analyst",
  location: "Dublin, IL",
  tagline:
    "I turn messy data into crisp, decision-ready insights. Specialised in Excel, Power BI, SQL, and storytelling dashboards.",
  headshot: "/me.png", // replace with your photo
  resumeUrl: "#", // add a resume PDF link when ready
  email: "nwekeobinna099@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/obinna-nweke-b9945b377/",
    github: "https://github.com/nwekeobinna099-eng",
    website: "https://medium.com/@nwekeobinna099"
  }
};

// ====== PROJECTS ======
const PROJECTS: Project[] = [
  {
    title: "Gym Membership Analytics – Retention & Revenue",
    blurb: "Fitness Membership Analytics: Optimizing Retention, Revenue, and Engagement.",
    cover: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop",
    tags: ["Excel", "Churn", "DAX", "Segmentation"],
    links: {
      live: "https://github.com/nwekeobinna099-eng/fitness-membership/blob/5f732008810cac36ce05bc87b89aa32b6726ee6e/Gym.xlsx",
      repo: "#",
      caseStudy: "https://medium.com/@nwekeobinna099/fitness-membership-analytics-optimizing-retention-revenue-and-engagement-b384ee482a90"
    },
    impact: [
      "Built an interactive Excel dashboard analyzing 1,998 members across multiple gym locations to uncover insights on retention, revenue, and engagement.",
      "Identified key patterns in churn, pricing models, and member behavior, highlighting Premium and Basic tiers as priority segments for retention strategies.",
      "Delivered actionable recommendations on loyalty programs, discount optimization, and location-based staffing to maximize profitability and customer experience."
    ],
    caseStudyWriteup: {
      problem: "Retention and engagement were declining across membership tiers; leadership needed clarity on drivers and quick wins.",
      approach: "Cleaned and modelled 1,998 member rows in Excel; built measures and interactive pivots/charts to segment churn risk, tenure and plan types.",
      outcome: "Prioritised Premium & Basic tiers; proposed loyalty offers and targeted outreach that modelled a revenue uplift scenario.",
      link: "https://medium.com/@nwekeobinna099/fitness-membership-analytics-optimizing-retention-revenue-and-engagement-b384ee482a90"
    }
  },
  {
    title: "Bank Churn Analysis",
    blurb: "Bank Customer Churn Analysis: Insights to Drive Retention and Reduce Attrition.",
    cover: "bankchurn.png",
    tags: ["Excel", "Finance", "DAX", "Churn"],
    links: { 
      live: "https://github.com/nwekeobinna099-eng/Bank-churn-analysis/blob/421a6d8d843bfe92f98b4a0e10e53427002a01f6/bank%20churn.xlsx", 
      repo: "#", 
      caseStudy: "https://medium.com/@nwekeobinna099/bank-churn-analysis-why-are-customers-ghosting-the-bank-711386c653f9"
     },

    impact: [
      "Unresolved complaints directly cause 100% churn, making customer support and issue resolution the most urgent priority.",
      "Germany’s churn rate is double that of other regions, signaling a critical need for region-specific strategies.",
      "High-balance customers are leaving more often than low-balance ones, meaning the bank risks losing its most valuable clients without targeted retention programs."
    ],
    caseStudyWriteup: {
      problem: "The bank is facing a rising churn rate of 20%, with unclear reasons behind customer departures.",
      approach: "We analyzed demographics, satisfaction scores, complaints, balances, and product usage to uncover churn drivers.",
      outcome: "The insights revealed complaint handling, regional disparities, and high-value customer attrition as key areas for targeted retention strategies.",
    }
  },
  {
    title: "Executive Sales Dashboard",
    blurb: "Exploratory analysis of sales performance by product category, location, and time. Outlier detection with clear visuals.",
    cover: "sales.png",
    tags: ["Excel", "EDA", "Sales"],
    links: {
       live: "https://github.com/nwekeobinna099-eng/sales-executive-dashboard/blob/15d5549ffe2707bf84696c1bea512e2d8e6bbb8c/Executive%20Sales%20Dashboard.xlsx", 
      repo: "#", 
      caseStudy: "https://medium.com/@nwekeobinna099/driving-insights-with-carls-cycle-sales-dashboard-4cdd89c75a05" },
    impact: [
      "Identified high-value products and categories driving revenue growth",
      "Simplified sales insights for executives and non-technical stakeholders",
      "Enabled fairer performance evaluation across stores and salespeople"
    ],
    caseStudyWriteup: {
      problem: "Stakeholders needed clarity on which products, locations, and salespeople were truly driving performance to guide strategy and resource allocation.",
      approach: "Developed an executive sales dashboard with product, geographic, and temporal breakdowns; highlighted top performers, revenue concentration, and seasonal trends.",
      outcome: "Revealed high-value categories and regions, simplified sales insights for decision-makers, and enabled fairer performance evaluations across stores and sales teams."
    }
  },
  {
    title: "Hospital Emergency Room Analysis",
    blurb: "What 9,216 Emergency Room Visits Reveal About Patient Flow, Referrals & Satisfaction.",
    cover: "hospital.png",
    tags: ["Power BI", "Healthcare", "DAX", "Time Series"],
    links: {
      live: "https://app.powerbi.com/links/qIX9oAFRzK?ctid=6fdcbc14-69ad-4f8c-83e8-6c20118316be&pbi_source=linkShare",
      repo: "#",
      caseStudy: "https://medium.com/@nwekeobinna099/what-9-216-emergency-room-visits-reveal-about-patient-flow-referrals-satisfaction-4eae5270e4e4"
    },
    impact: [
      "Identify patient flow inefficiencies.",
      "Understand demographic patterns",
      "Optimize resource planning",
      "Improve patient satisfaction and service delivery",
      "Executive-ready KPI tiles and storytelling flow"
    ],
    caseStudyWriteup: {
      problem: "Patients experienced long ER wait times and referral friction; leadership needed evidence to improve throughput without compromising care.",
      approach: "Cleaned and modelled 9,216 ER records; built Power BI flows for arrival triage → treatment → discharge; peak-hour and bottleneck visuals.",
      outcome: "Highlighted peak congestion windows and staffing mismatches; proposed rota changes that modelled a 15% wait-time reduction.",
      link: "https://medium.com/@nwekeobinna099/what-9-216-emergency-room-visits-reveal-about-patient-flow-referrals-satisfaction-4eae5270e4e4"
    }
  }
];

const SERVICES = [
  { icon: <BarChart3 className="h-5 w-5" />, title: "Dashboarding & BI", desc: "Interactive executive dashboards in Power BI with clean DAX and usability-first design." },
  { icon: <Database className="h-5 w-5" />, title: "Data Modeling", desc: "Star-schema modeling, measures layer, and documentation for long-term maintainability." },
  { icon: <Brain className="h-5 w-5" />, title: "Insights & Strategy", desc: "From descriptive to diagnostic: trend drivers, segment performance, and actionable recommendations." }
];

const SKILLS = [
  "Power BI", "DAX", "Power Query", "Excel", "SQL", "Data Modeling", "ETL", "Time Series", "Churn Analysis", "A/B Testing", "Storytelling"
];

// ====== THEME HELPERS ======
const gold = {
  text: "text-yellow-300",
  accent: "text-yellow-400",
  border: "border-yellow-700",
  bgSoft: "bg-yellow-900/20",
  pill: "bg-yellow-900/40 border border-yellow-700 text-yellow-300",
};

function useDarkMode(){
  const [dark, setDark] = React.useState(true); // default dark
  React.useEffect(()=>{ document.documentElement.classList.toggle('dark', dark); },[dark]);
  return {dark, setDark};
}

// ====== UI SECTIONS ======
function Header(){
  const {dark, setDark} = useDarkMode();
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-black/70 border-b border-yellow-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-bold text-lg text-yellow-400">{PROFILE.name}<span className="text-yellow-600"> · {PROFILE.title}</span></a>
        <nav className="flex items-center gap-2">
          <a href="#projects" className="px-3 py-2 rounded-xl hover:bg-yellow-900/30 text-yellow-300">Projects</a>
          <a href="#services" className="px-3 py-2 rounded-xl hover:bg-yellow-900/30 text-yellow-300">Services</a>
          <a href="#about" className="px-3 py-2 rounded-xl hover:bg-yellow-900/30 text-yellow-300">About</a>
          <a href="#contact" className="px-3 py-2 rounded-xl hover:bg-yellow-900/30 text-yellow-300">Contact</a>
          <Button variant="ghost" size="icon" className="ml-2 text-yellow-400" onClick={()=>setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
          </Button>
        </nav>
      </div>
    </header>
  );
}

function Hero(){
  return (
    <section id="home" className="max-w-6xl mx-auto px-4 pt-16 pb-10">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="md:col-span-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight"><span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{PROFILE.name}</span></h1>
          <p className={`mt-2 text-lg ${gold.text}`}>{PROFILE.title} · {PROFILE.location}</p>
          <p className="mt-6 text-yellow-200 leading-relaxed">{PROFILE.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-black"><a href="#projects">View Projects <ChevronRight className="ml-1 h-4 w-4"/></a></Button>
            <Button variant="secondary" asChild className="bg-black border border-yellow-700 text-yellow-400"><a href={`mailto:${PROFILE.email}`}>Hire Me <Mail className="ml-1 h-4 w-4"/></a></Button>
            <Button variant="outline" asChild className="border-yellow-700 text-yellow-400"><a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">Resume <Download className="ml-1 h-4 w-4"/></a></Button>
          </div>
          <div className="mt-6 flex gap-4 text-yellow-400">
            <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-80"><Linkedin/></a>
            <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="hover:opacity-80"><Github/></a>
            <a href={PROFILE.social.website} target="_blank" rel="noreferrer" className="hover:opacity-80"><Globe/></a>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.6, delay:0.1}} className="order-first md:order-last">
          <img src={PROFILE.headshot} alt="Headshot" className="w-full aspect-square object-cover rounded-3xl border-4 border-yellow-600 shadow-xl"/>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({icon, title, desc}:{icon: React.ReactNode; title: string; desc: string;}){
  return (
    <Card className={`rounded-2xl shadow-sm bg-black ${gold.border} border`}>
      <CardHeader>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 mb-2"/>
        <CardTitle className={`flex items-center gap-2 text-base ${gold.accent}`}>{icon}{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-yellow-200">{desc}</p>
      </CardContent>
    </Card>
  );
}

function Services(){
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">Services</h2>
      <p className="mt-2 text-yellow-300">Clear scope, clean delivery, and measurable impact.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {SERVICES.map((s, i)=> <ServiceCard key={i} {...s}/>)}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const hasWriteup = Boolean(project.caseStudyWriteup);
  const hasLink = project.links.caseStudy && project.links.caseStudy !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* FIXED HEIGHT + vertical layout */}
      <Card className={`h-[560px] flex flex-col rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-black ${gold.border} border`}>
        {/* Fixed image band */}
        <div className="relative">
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-52 object-cover opacity-90"
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            {project.tags.map((t, i) => (
              <Badge key={i} className={gold.pill}>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Title area (clamped to 2 lines) */}
        <CardHeader className="pb-0">
          <CardTitle
            className="text-lg text-yellow-400"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.title}
          </CardTitle>
        </CardHeader>

        {/* CONTENT fills remaining space; BUTTONS pinned at bottom */}
        <CardContent className="flex flex-col flex-1">
          {/* Text zone (clamped / limited so it never pushes buttons down) */}
          <div className="flex-1 overflow-hidden">
            {/* Blurb (clamp ~3 lines) */}
            <p
              className="text-sm text-yellow-200"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.blurb}
            </p>

            {/* Impact bullets (limit to 3 for consistent heights) */}
            <ul className="mt-3 list-disc list-inside text-sm text-yellow-200 space-y-1">
              {project.impact.slice(0, 3).map((i, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons row — always at bottom */}
          <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-yellow-800/40">
            {project.links.live !== "#" && (
              <Button
                asChild
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 text-black"
              >
                <a href={project.links.live} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </Button>
            )}

            {/* Case Study: popup if writeup, else external link */}
            {hasWriteup ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-black border border-yellow-700 text-yellow-400"
                  >
                    Case Study
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-black text-yellow-200 border border-yellow-700">
                  <DialogHeader>
                    <DialogTitle className="text-yellow-400">
                      {project.title} – Case Study
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 text-sm">
                    <p><strong>Problem:</strong> {project.caseStudyWriteup!.problem}</p>
                    <p><strong>Approach:</strong> {project.caseStudyWriteup!.approach}</p>
                    <p><strong>Outcome:</strong> {project.caseStudyWriteup!.outcome}</p>
                    {(project.caseStudyWriteup!.link || hasLink) && (
                      <p className="italic">
                        Read the full write-up{" "}
                        <a
                          href={(project.caseStudyWriteup!.link || project.links.caseStudy)!}
                          target="_blank"
                          rel="noreferrer"
                          className="underline text-yellow-400 hover:text-yellow-300"
                        >
                          here
                        </a>.
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ) : hasLink ? (
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="bg-black border border-yellow-700 text-yellow-400"
              >
                <a href={project.links.caseStudy} target="_blank" rel="noreferrer">
                  Case Study
                </a>
              </Button>
            ) : null}

            {project.links.repo !== "#" && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-yellow-700 text-yellow-400"
              >
                <a href={project.links.repo} target="_blank" rel="noreferrer">
                  Repo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

}

function Projects(){
  const [query, setQuery] = useState("");
  const tags = useMemo(()=>Array.from(new Set(PROJECTS.flatMap(p=>p.tags))).sort(), []);
  const [active, setActive] = useState("All");

  const filtered = useMemo(()=>{
    return PROJECTS.filter(p=>
      (active === "All" || p.tags.includes(active)) &&
      (p.title.toLowerCase().includes(query.toLowerCase()) || p.blurb.toLowerCase().includes(query.toLowerCase()))
    );
  }, [active, query]);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">Projects</h2>
        <div className="flex items-center gap-2">
          <Input placeholder="Search projects…" value={query} onChange={e=>setQuery(e.target.value)} className={`w-56 bg-black ${gold.border} border ${gold.text} placeholder-yellow-700`} />
          <Filter className="h-4 w-4 text-yellow-500"/>
          <Tabs value={active} onValueChange={setActive}>
            <TabsList className="grid grid-cols-4 w-[16rem] bg-black border border-yellow-800">
              <TabsTrigger value="All" className="data-[state=active]:bg-yellow-900/40 data-[state=active]:text-yellow-300">All</TabsTrigger>
              {tags.slice(0,3).map(t=> <TabsTrigger key={t} value={t} className="data-[state=active]:bg-yellow-900/40 data-[state=active]:text-yellow-300">{t}</TabsTrigger>)}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {filtered.map((p, i)=> <ProjectCard key={i} project={p}/>) }
      </div>
    </section>
  );
}

function About(){
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">About</h2>
          <p className="mt-3 text-yellow-200 leading-relaxed">
            I’m a data analyst who blends business context with technical rigor. I design BI models, craft clear visuals,
            and translate patterns into practical recommendations. My toolbelt: Power BI (DAX + Power Query), SQL, Excel,
            and a relentless focus on usability.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((s,i)=> <Badge key={i} className={gold.pill}>{s}</Badge>)}
          </div>
        </div>
        <Card className={`rounded-3xl bg-black ${gold.border} border`}>
          <CardHeader>
            <CardTitle className="text-lg text-yellow-400">How I Work</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-200 space-y-2">
            <p><strong>1. Understand:</strong> clarify the decision, constraints, and success metrics.</p>
            <p><strong>2. Prepare:</strong> clean, model, and validate data for trustable metrics.</p>
            <p><strong>3. Build:</strong> iterate on visuals with stakeholders, prioritising clarity.</p>
            <p><strong>4. Deliver:</strong> document logic, train users, and support handover.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">Contact</h2>
      <p className="mt-2 text-yellow-300">Ready to discuss your project? Send a message and I’ll get back to you.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card className={`rounded-3xl bg-black ${gold.border} border`}>
          <CardHeader>
            <CardTitle className="text-lg text-yellow-400">Email Me</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={`mailto:${PROFILE.email}`} method="get">
              <div className="space-y-3">
                <Input name="subject" placeholder="Subject" required className={`bg-black ${gold.border} border ${gold.text} placeholder-yellow-700`} />
                <Textarea name="body" placeholder="Hi, I’d like help with…" rows={6} className={`bg-black ${gold.border} border ${gold.text} placeholder-yellow-700`} />
              </div>
              <Button type="submit" className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-black">Open Email Client</Button>
            </form>
            <p className="mt-3 text-sm text-yellow-300">Or email directly: <a className="underline text-yellow-400" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></p>
          </CardContent>
        </Card>
        <Card className={`rounded-3xl bg-black ${gold.border} border`}>
          <CardHeader>
            <CardTitle className="text-lg text-yellow-400">FAQs</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-200 space-y-2">
            <p><strong>Availability:</strong> Taking on 1–2 new clients this month.</p>
            <p><strong>Deliverables:</strong> Power BI reports, datasets, documentation, and training videos.</p>
            <p><strong>Rates:</strong> Fixed-price per project with milestones; contact for a quote.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="border-t border-yellow-800 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-sm text-yellow-400 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-80 inline-flex items-center gap-1"><Linkedin className="h-4 w-4"/>LinkedIn</a>
          <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="hover:opacity-80 inline-flex items-center gap-1"><Github className="h-4 w-4"/>GitHub</a>
          <a href={`mailto:${PROFILE.email}`} className="hover:opacity-80 inline-flex items-center gap-1"><Mail className="h-4 w-4"/>Email</a>
        </div>
      </div>
    </footer>
  );
}

// ---------- Lightweight Dev Tests (run only in dev) ----------
function runDevTests(){
  try {
    console.assert(Array.isArray(PROJECTS) && PROJECTS.length > 0, "[TEST] PROJECTS should contain at least one project");
    console.assert(typeof PROFILE.email === 'string' && PROFILE.email.includes('@'), "[TEST] PROFILE.email should contain '@'");
    const allTags = PROJECTS.flatMap(p=>p.tags);
    console.assert(allTags.length > 0, "[TEST] Projects should expose tags");
  } catch (e) {
    console.error("[TEST] Error during dev tests:", e);
  }
}

export default function Portfolio(){
  React.useEffect(()=>{
    const isDev = (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production');
    if (typeof window !== 'undefined' && isDev) { runDevTests(); }
  }, []);

  return (
    <div className="min-h-screen bg-black text-yellow-200">
      <Header/>
      <main>
        <Hero/>
        <Services/>
        <Projects/>
        <About/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  );
}
