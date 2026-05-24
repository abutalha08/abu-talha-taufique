import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Server,
  Wrench,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  BookOpen,
  Award,
  Send,
  Layers,
  ChevronRight,
  ChevronUp,
  Check,
  User,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import TypingEffect from "./components/TypingEffect";
import { skillsData, projectsData, educationData, socialLinks } from "./data";
import { Skill, Project } from "./types";

// Reusable, highly performant Scroll-driven reveal animation component using Framer Motion
function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "100px 0px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Recruiter-friendly: easily swap your profile picture by changing this URL
const PROFILE_IMAGE_URL = "https://i.ibb.co.com/vvL798DX/Formal-image.png";

// Cinematic staggered reveal configurations
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // premium cinematic curve
    }
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [projectFilter, setProjectFilter] = useState<"all" | "fullstack" | "frontend" | "uiux">("all");
  const [skillFilter, setSkillFilter] = useState<"all" | "frontend" | "backend" | "tools">("all");
  
  // Navigation scrolling logic with lock
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      element.scrollIntoView({ behavior: "smooth" });

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 850);
    }
  };

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to Top State
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Section Tracking via Intersection Observer
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "education", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // Trigger when section occupies mid-screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Mimic real API latency
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto-dismiss alert after 5s
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  // Filter project arrays
  const filteredProjects = projectsData.filter(
    (proj) => projectFilter === "all" || proj.category === projectFilter
  );

  // Filter skill arrays
  const filteredSkills = skillsData.filter(
    (item) => item.category !== "soft" && (skillFilter === "all" || item.category === skillFilter)
  );

  const softSkills = skillsData.filter((item) => item.category === "soft");

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-100 bg-gray-50/50 dark:bg-charcoal-950 transition-colors duration-300 overflow-x-hidden font-sans">
      {/* Precision custom pointer cursor tracker */}
      <CustomCursor />

      {/* Elegant floating header bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Decorative background grid overlays in Dark Theme */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-transparent pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-neon-blue/5 dark:via-transparent dark:to-transparent" />
      <div className="absolute top-[30vh] left-0 right-0 h-[600px] pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-charcoal-900/40 dark:via-transparent dark:to-transparent" />

      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col space-y-6 text-left"
            >
              <motion.div
                variants={heroItemVariants}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-charcoal-900/60 backdrop-blur-md w-fit shadow-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                </span>
                <span className="text-xs font-mono font-medium tracking-wide text-gray-500 dark:text-gray-450 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-pulse" /> Available for Worldwide Projects
                </span>
              </motion.div>

              <motion.div
                variants={heroItemVariants}
                className="space-y-4"
              >
                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                  Hi! I'm{" "}
                  <span className="bg-gradient-to-r from-neon-blue via-blue-500 to-neon-cyan bg-clip-text text-transparent">
                    Md. Abu Talha Taufique
                  </span>
                  , building <br />
                  <span className="relative whitespace-nowrap">
                    Digital Experiences
                  </span>
                </h1>

                {/* Developer Designation Typewriter effect */}
                <div className="h-10 sm:h-12 flex items-center">
                  <TypingEffect
                    words={[
                      "Full Stack Engineer",
                      "MERN Stack Developer",
                      "Frontend Focused Engineer",
                      "UI/UX Enthusiast",
                    ]}
                    typingSpeed={90}
                    deletingSpeed={45}
                    pauseDuration={2200}
                  />
                </div>

                <p className="max-w-xl text-md sm:text-lg text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                  From robust prototypes to reliable, production-ready full stack systems, I turn complex business requirements into clean, scalable, and responsive web products.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-col md:items-start items-center gap-4 pt-4 w-full"
              >
                {/* Row 1 for desktop: See My Work and Download Resume side-by-side, or stacked on mobile */}
                <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-4">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate("projects");
                    }}
                    className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-neon-blue to-neon-cyan shadow-lg shadow-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-display border border-transparent w-full sm:w-auto text-center"
                  >
                    See My Work
                  </a>
                  <a
                    href="#"
                    download
                    className="px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-charcoal-900/40 hover:bg-gray-100 dark:hover:bg-charcoal-800 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all cursor-pointer font-display active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto text-center shadow-xs"
                  >
                    <Download className="w-4 h-4 text-neon-cyan" />
                    Download Resume
                  </a>
                </div>
                {/* Row 2 for desktop: Let's Connect aligned to the left below them, or stacked at bottom and centered on mobile */}
                <div className="flex justify-center md:justify-start w-full md:w-auto">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate("contact");
                    }}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-500 dark:text-gray-455 border border-dashed border-gray-300 dark:border-gray-800 hover:border-neon-cyan/40 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all cursor-pointer font-display active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto text-center"
                  >
                    Let's Connect
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Simple Tech Accents (Mini grid of MERN) - device responsive */}
              <motion.div
                variants={heroItemVariants}
                className="pt-8 flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-6"
              >
                <span className="text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase shrink-0">
                  STACK PREFERENCE:
                </span>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono font-medium text-gray-500 dark:text-gray-400">
                  <span className="px-2.5 py-1 rounded bg-gray-150/80 dark:bg-charcoal-900/60 border border-gray-200/50 dark:border-gray-800/80">MongoDB</span>
                  <span className="px-2.5 py-1 rounded bg-gray-150/80 dark:bg-charcoal-900/60 border border-gray-200/50 dark:border-gray-800/80">Express</span>
                  <span className="px-2.5 py-1 rounded bg-gray-150/80 dark:bg-charcoal-900/60 border border-gray-200/50 dark:border-gray-800/80">React</span>
                  <span className="px-2.5 py-1 rounded bg-gray-150/80 dark:bg-charcoal-900/60 border border-gray-200/50 dark:border-gray-800/80">Node.js</span>
                  <span className="px-2.5 py-1 rounded bg-gray-150/80 dark:bg-charcoal-900/60 border border-gray-200/50 dark:border-gray-800/80">Next.js</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Interactive Portfolio Illustration (Professional, minimalist profile card) */}
            <div className="lg:col-span-12 xl:col-span-5 relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[380px] sm:max-w-md min-h-[480px] flex items-center justify-center p-1"
              >
                {/* Background Ambient Radial Glow */}
                <div className="absolute inset-0 bg-radial from-neon-cyan/20 via-neon-blue/5 to-transparent rounded-full blur-3xl opacity-75 pointer-events-none" />

                {/* Minimalist Profile Card with glowing cyan/teal edge */}
                <div className="relative w-full h-full min-h-[500px] md:min-h-[520px] rounded-2xl border border-neon-cyan/30 bg-gradient-to-br from-charcoal-900 via-charcoal-950 to-black shadow-[0_0_25px_rgba(0,243,255,0.15)] hover:shadow-[0_0_35px_rgba(0,243,255,0.25)] hover:border-neon-cyan/50 overflow-hidden flex flex-col group transition-all duration-300">
                  
                  {/* Desktop Full Background Profile Image */}
                  <img
                    src={PROFILE_IMAGE_URL}
                    alt="Md. Abu Talha Taufique"
                    className="hidden md:block absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Desktop Hover Overlay: smooth semi-transparent dark overlay & social link icons at bottom center */}
                  <div className="hidden md:flex absolute inset-0 bg-black/70 backdrop-blur-xs z-10 flex-col justify-end items-center pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                    {/* Workable Social Links centered on hover */}
                    <div className="flex justify-center items-center gap-4">
                      {/* GitHub */}
                      <a
                        href="https://github.com/abutalha08"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black/60 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300"
                        aria-label="GitHub Profile"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      
                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/md-abu-talha-taufique"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black/60 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>

                      {/* Facebook */}
                      <a
                        href="https://www.facebook.com/share/1G46iHzBqh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black/60 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300"
                        aria-label="Facebook Profile"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>

                      {/* Telegram */}
                      <a
                        href="https://t.me/+8801796660101"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black/60 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300"
                        aria-label="Telegram"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M11.944 0C5.344 0 0 5.344 0 12c0 6.656 5.344 12 11.944 12C18.544 24 24 18.656 24 12c0-6.656-5.456-12-12.056-12zM18.16 8.32l-2.126 10.03c-.16.72-.592.896-1.196.56l-3.243-2.39-1.564 1.503c-.173.173-.32.32-.653.32l.233-3.3 6.01-5.426c.26-.233-.057-.363-.404-.13L8.358 13.04l-3.2-.998c-.696-.217-.71-.693.146-1.026l12.515-4.83c.58-.216 1.09.133.882.915z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Subtle top laser accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent z-20" />
                  
                  {/* Mobile-only Content Layer */}
                  <div className="md:hidden relative z-20 flex flex-col h-full justify-between flex-1 p-6 sm:p-8">
                    {/* Header visual decoration */}
                    <div className="flex items-center justify-between border-b border-gray-800/60 pb-3 mb-6">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-neon-cyan/70 uppercase">
                        profile_host.sys
                      </span>
                    </div>

                    {/* Core Profile Area */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                      {/* Mobile-Only Circular Frame with Glowing Cyan Halo Effect */}
                      <div className="relative w-36 h-36 rounded-full border-2 border-neon-cyan/80 p-1 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,243,255,0.3)] bg-black/45 overflow-hidden">
                        <div className="absolute inset-0 rounded-full bg-neon-cyan/5 animate-pulse" />
                        <img
                          src={PROFILE_IMAGE_URL}
                          alt="Md. Abu Talha Taufique"
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Name and Title */}
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white text-center tracking-tight leading-tight">
                        Md. Abu Talha Taufique
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-neon-cyan font-bold tracking-widest text-center mt-2.5 uppercase">
                        FULL STACK MERN DEVELOPER
                      </p>

                      {/* Workable Social Links */}
                      <div className="flex justify-center items-center gap-4 mt-6">
                        {/* GitHub */}
                        <a
                          href="https://github.com/abutalha08"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-charcoal-950/85 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all duration-300"
                          aria-label="GitHub Profile"
                        >
                          <Github className="w-4 h-4 sm:w-5 h-5" />
                        </a>
                        
                        {/* LinkedIn */}
                        <a
                          href="https://www.linkedin.com/in/md-abu-talha-taufique"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-charcoal-950/85 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all duration-300"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin className="w-4 h-4 sm:w-5 h-5" />
                        </a>

                        {/* Facebook */}
                        <a
                          href="https://www.facebook.com/share/1G46iHzBqh/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-charcoal-950/85 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all duration-300"
                          aria-label="Facebook Profile"
                        >
                          <Facebook className="w-4 h-4 sm:w-5 h-5" />
                        </a>

                        {/* Telegram */}
                        <a
                          href="https://t.me/+8801796660101"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-charcoal-950/85 border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all duration-300"
                          aria-label="Telegram"
                        >
                          <svg className="w-4 h-4 sm:w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M11.944 0C5.344 0 0 5.344 0 12c0 6.656 5.344 12 11.944 12C18.544 24 24 18.656 24 12c0-6.656-5.456-12-12.056-12zM18.16 8.32l-2.126 10.03c-.16.72-.592.896-1.196.56l-3.243-2.39-1.564 1.503c-.173.173-.32.32-.653.32l.233-3.3 6.01-5.426c.26-.233-.057-.363-.404-.13L8.358 13.04l-3.2-.998c-.696-.217-.71-.693.146-1.026l12.515-4.83c.58-.216 1.09.133.882.915z" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div className="border-t border-gray-800/60 pt-4 mt-6 flex justify-between items-center text-xs font-mono text-gray-400">
                      <span>IP: STATIC_SECURE</span>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                        </span>
                        <span className="text-emerald-500 animate-pulse">STABLE_ONLINE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
     <section
  id="about"
  className="py-24 border-t border-gray-100 dark:border-gray-900 bg-white/30 dark:bg-charcoal-950/20 scroll-mt-24"
>
  <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* w-full এবং mx-auto নিশ্চিত করে যে এটি সব স্ক্রিন সাইজে সেন্টারেড এবং রেসপন্সিভ থাকবে */}
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* 🌟 Left Info Column (Biography & Vision) - Increased from col-span-5 to col-span-7 */}
      <div className="lg:col-span-7 space-y-6 w-full">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-neon-blue uppercase bg-neon-blue/10 px-3 py-1 rounded w-fit">
            BIOGRAPHY & VISION
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Who is Md. Abu Talha Taufique?
          </h2>
        </div>
        
        <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-charcoal-900/70 p-6 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 rounded-full blur-xl pointer-events-none" />
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
            Hello! I am a passionate <strong className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">Full Stack Engineer</strong> and <strong className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">MERN Stack Developer</strong> with a sharp eye for responsive interfaces and solid server structures. Over the years, I have programmed secure backend modules, connected high-velocity <strong className="font-semibold text-neon-blue dark:text-neon-cyan">NoSQL schemas</strong>, and polished elegant front-end grids ensuring speed and flawless device adaptability. In today's <strong className="font-bold text-gray-900 dark:text-white bg-neon-blue/10 dark:bg-neon-blue/20 text-neon-blue dark:text-neon-cyan border-b-2 border-neon-blue/30 dark:border-neon-cyan/30 px-1">AI-driven tech world</strong>, I also specialize in integrating <strong className="font-semibold text-gray-900 dark:text-white">smart AI capabilities</strong> and <strong className="font-semibold text-gray-900 dark:text-white">interactive automation</strong> into web applications, making them more intelligent, highly efficient, and future-ready.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-charcoal-900/40">
            <h4 className="text-xs font-mono font-bold text-neon-cyan uppercase">
              Core Speciality
            </h4>
            <p className="text-sm font-semibold text-gray-850 dark:text-white mt-1">
              MERN Architectures
            </p>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-charcoal-900/40">
            <h4 className="text-xs font-mono font-bold text-neon-cyan uppercase">
              Accents & UX
            </h4>
            <p className="text-sm font-semibold text-gray-850 dark:text-white mt-1">
              Tactile motion design
            </p>
          </div>
        </div>
      </div>

      {/* 🌟 Right Bullet Column (Engineering Principles) - Decreased from col-span-7 to col-span-5 */}
      <div className="lg:col-span-5 space-y-6 w-full">
        <h3 className="text-xl sm:text-2xl font-semibold font-display text-gray-800 dark:text-white">
          Core engineering principles I operate by:
        </h3>

        <div className="space-y-4">
          {/* Principle 1 */}
          <div className="flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/60 bg-white/50 dark:bg-charcoal-900/30">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0">
              <Code className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                Modular Code & Extensibility
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Writing micro-services and component patterns that can adapt to changing user demands without costly structural rewrites.
              </p>
            </div>
          </div>

          {/* Principle 2 */}
          <div className="flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/60 bg-white/50 dark:bg-charcoal-900/30">
            <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                Responsiveness & Universal Fluidity
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Ensuring every layout adapts seamlessly from ultra-wide displays to ultra-compact smartphones, keeping font scale, click elements, and views beautiful.
              </p>
            </div>
          </div>

          {/* Principle 3 */}
          <div className="flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/60 bg-white/50 dark:bg-charcoal-900/30">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Server className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                Secure databases, quick request cycles
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Optimizing MongoDB indices and Node Express middle-layers to process user tasks fast, protecting credential flows.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </ScrollReveal>
</section>

      {/* 3. SKILLS SECTION */}
      <section
        id="skills"
        className="py-24 border-t border-gray-100 dark:border-gray-900 bg-gray-50/20 dark:bg-charcoal-950/40 relative scroll-mt-24"
      >
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-center mb-12 gap-6 md:gap-0">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase bg-neon-cyan/10 px-3 py-1 rounded w-fit">
                TECHNICAL CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                Backend, Frontend & Tools
              </h2>
            </div>

            {/* Interactive Filters */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 bg-white/80 dark:bg-charcoal-900/60 border border-gray-105 dark:border-gray-800 p-1.5 rounded-xl backdrop-blur-md">
              {[
                { label: "All Stack", value: "all", icon: <Layers className="w-3.5 h-3.5" /> },
                { label: "Frontend", value: "frontend", icon: <Code className="w-3.5 h-3.5" /> },
                { label: "Backend", value: "backend", icon: <Server className="w-3.5 h-3.5" /> },
                { label: "Tools", value: "tools", icon: <Wrench className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSkillFilter(tab.value as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 focus:outline-none ${
                    skillFilter === tab.value
                      ? "bg-gray-900 text-white dark:bg-neon-blue/20 dark:text-neon-cyan border border-transparent dark:border-neon-cyan/20"
                      : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className="p-5 rounded-2xl border border-gray-150/80 dark:border-gray-800/60 bg-white dark:bg-charcoal-900/50 hover:border-gray-300 dark:hover:border-neon-blue/30 shadow-xs hover:shadow-cyan-500/5 group transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-charcoal-800 flex items-center justify-center text-lg shadow-inner group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white font-display text-md">
                          {skill.name}
                        </h3>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-neon-blue">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-gray-400 dark:text-neon-cyan">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Level Slider Bar */}
                  <div className="w-full h-2 bg-gray-100 dark:bg-charcoal-850 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-linear-to-r from-neon-blue to-neon-cyan rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dedicated Soft Skills Sub-section */}
          <div className="mt-16 pt-12 border-t border-gray-150 dark:border-gray-800/60">
            <div className="flex items-center gap-2.5 mb-8">
              <span className="p-1.5 rounded-lg bg-neon-blue/10 text-neon-blue dark:text-neon-cyan shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 dark:text-white">
                Soft Skills
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-5 rounded-2xl border border-gray-150/80 dark:border-gray-800/60 bg-white dark:bg-charcoal-900/50 hover:border-gray-300 dark:hover:border-neon-cyan/30 shadow-xs hover:shadow-cyan-500/5 group transition-all"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-charcoal-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner shrink-0">
                      {skill.icon}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white font-display text-md">
                        {skill.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Attribute</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400 mt-4 leading-none">
                    <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Checked
                    </span>
                    <span>{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section
        id="projects"
        className="py-24 border-t border-gray-100 dark:border-gray-900 bg-white/20 dark:bg-charcoal-950/20 scroll-mt-24"
      >
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-center mb-12 gap-6 md:gap-0">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-neon-blue uppercase bg-neon-blue/10 px-3 py-1 rounded">
                PROJECT SHOWCASE
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                My Recent Creations & Built Projects
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 bg-white/80 dark:bg-charcoal-900/60 border border-gray-105 dark:border-gray-800 p-1.5 rounded-xl backdrop-blur-md">
              {[
                { label: "All Cases", value: "all" },
                { label: "Full Stack", value: "fullstack" },
                { label: "Frontend", value: "frontend" },
                { label: "UI / UX", value: "uiux" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setProjectFilter(btn.value as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all focus:outline-none ${
                    projectFilter === btn.value
                      ? "bg-gray-900 text-white dark:bg-neon-blue/20 dark:text-neon-cyan border border-transparent dark:border-neon-cyan/20"
                      : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  key={proj.id}
                  className="rounded-3xl border border-gray-150/80 dark:border-gray-800 bg-white dark:bg-charcoal-900/50 shadow-xs hover:shadow-lg dark:hover:border-neon-blue/30 overflow-hidden flex flex-col group transition-all"
                >
                  {/* Card Visual Graphic Area */}
                  <div
                    style={{ background: proj.image }}
                    className="h-48 sm:h-52 w-full flex items-center justify-center p-6 relative overflow-hidden text-white"
                  >
                    {/* Floating Badge */}
                    <span className="absolute top-4 left-4 bg-charcoal-950/85 text-neon-cyan border border-white/5 px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase">
                      {proj.category}
                    </span>

                    {/* Coding mockup wireframe decoration inside graphic mimicking Leo Carter reference */}
                    <div className="absolute inset-x-8 bottom-0 top-12 bg-charcoal-950/50 border-t border-x border-neon-blue/20 rounded-t-xl p-3 font-mono text-[9px] text-gray-400 overflow-hidden select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="flex gap-1.5 pb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-neon-cyan">const</span> MernController = () =&gt; &#123; <br />
                      &nbsp;&nbsp;console.log(<span className="text-teal-400">"{proj.title}"</span>); <br />
                      &nbsp;&nbsp;<span className="text-gray-500">// compiled_stable</span> <br />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/20 to-transparent opacity-90" />
                  </div>

                  {/* Info Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white group-hover:text-neon-blue dark:group-hover:text-neon-cyan transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                        {proj.description}
                      </p>

                      {/* Technology Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-gray-700 dark:text-gray-800 border border-gray-200/60 dark:border-gray-850 bg-gray-50 dark:bg-charcoal-850/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social connection & link footer */}
                    <div className="flex items-center space-x-4 border-t border-gray-100 dark:border-gray-800/80 pt-6 mt-6">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-xs font-mono font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-xs font-mono font-medium text-neon-blue dark:text-neon-cyan hover:underline transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Preview
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. EDUCATION SECTION */}
      <section
        id="education"
        className="py-24 border-t border-gray-100 dark:border-gray-900 bg-gray-50/20 dark:bg-charcoal-950/40 scroll-mt-24"
      >
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto flex flex-col items-center md:items-start text-center md:text-left space-y-2 mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase bg-neon-cyan/10 px-3 py-1 rounded w-fit">
              ACADEMIC JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
              Education & Academy Steps
            </h2>
          </div>

          {/* Education list timeline layout */}
          <div className="max-w-3xl mx-auto relative border-l border-gray-200 dark:border-gray-800 pl-6 sm:pl-10 space-y-12">
            {educationData.map((edu, idx) => (
              <div key={edu.id} className="relative group">
                {/* Visual marker node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full border-4 border-white dark:border-charcoal-950 bg-neon-blue group-hover:bg-neon-cyan transition-all duration-300 shadow-sm" />

                <div className="p-6 sm:p-8 rounded-2xl border border-gray-150/80 dark:border-gray-800 bg-white dark:bg-charcoal-900/40 shadow-xs group-hover:border-neon-cyan/25 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-neon-blue/15 text-neon-blue dark:text-neon-cyan">
                        {edu.period}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold font-display text-gray-900 dark:text-white mt-2">
                        {edu.degree}
                      </h3>
                    </div>
                    {edu.grade && (
                      <span className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/10 h-fit self-start sm:self-center">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-gray-400" /> {edu.institution}
                  </h4>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed font-sans">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 6. CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 border-t border-gray-100 dark:border-gray-900 bg-white/20 dark:bg-charcoal-950/20 scroll-mt-24"
      >
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Connect Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-neon-blue uppercase bg-neon-blue/10 px-3 py-1 rounded w-fit font-bold">
                  LET'S COMMUNICATE
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                  Start a Collaboration
                </h2>
              </div>

              <p className="text-md text-gray-600 dark:text-gray-450 leading-relaxed font-sans">
                Do you have a project blueprint, code design, or questions on MERN Stack optimizations? Drop me a message! I respond within 24 working hours.
              </p>

              {/* Direct Info list */}
              <div className="space-y-4 pt-4 text-sm font-mono text-gray-550 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-neon-cyan shrink-0" />
                  <a
                    href="mailto:taufique752@gmail.com"
                    className="hover:text-neon-cyan transition-colors duration-200 decoration-none"
                  >
                    taufique752@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Social Integration - requested specifically (Facebook, LinkedIn, GitHub, WhatsApp, Telegram) */}
              <div className="pt-6 space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">
                  SOCIAL NETWORKS LINK
                </h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link) => {
                    let iconNode = null;
                    let hoverClass = "";

                    if (link.platform === "GitHub") {
                      iconNode = <Github className="w-5 h-5" />;
                      hoverClass = "hover:text-neon-cyan dark:hover:text-neon-cyan hover:border-neon-cyan/40";
                    } else if (link.platform === "LinkedIn") {
                      iconNode = <Linkedin className="w-5 h-5" />;
                      hoverClass = "hover:text-neon-blue dark:hover:text-neon-blue hover:border-neon-blue/40";
                    } else if (link.platform === "Facebook") {
                      iconNode = <Facebook className="w-5 h-5" />;
                      hoverClass = "hover:text-blue-600 dark:hover:text-blue-500 hover:border-blue-500/40";
                    } else if (link.platform === "WhatsApp") {
                      iconNode = (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      );
                      hoverClass = "hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40";
                    } else if (link.platform === "Telegram") {
                      iconNode = (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M11.944 0C5.344 0 0 5.344 0 12c0 6.656 5.344 12 11.944 12C18.544 24 24 18.656 24 12c0-6.656-5.456-12-12.056-12zM18.16 8.32l-2.126 10.03c-.16.72-.592.896-1.196.56l-3.243-2.39-1.564 1.503c-.173.173-.32.32-.653.32l.233-3.3 6.01-5.426c.26-.233-.057-.363-.404-.13L8.358 13.04l-3.2-.998c-.696-.217-.71-.693.146-1.026l12.515-4.83c.58-.216 1.09.133.882.915z" />
                        </svg>
                      );
                      hoverClass = "hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-400/40";
                    }

                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        aria-label={`${link.platform} profile link`}
                        className={`w-12 h-12 rounded-xl bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-all shadow-sm cursor-pointer hover-magnetic hover:scale-110 active:scale-95 ${hoverClass}`}
                      >
                        {iconNode}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7 bg-white dark:bg-charcoal-900/60 p-6 sm:p-8 rounded-3xl border border-gray-150/80 dark:border-gray-800 shadow-sm relative">
              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0 bg-emerald-500/20 p-0.5 rounded-full" />
                    Thank you! Your inquiry was sent successfully. Md. Abu Talha Taufique will get in touch soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label id="lbl-name" htmlFor="txt-name" className="text-xs font-mono text-gray-450 dark:text-gray-400 font-bold uppercase">
                      Your Name *
                    </label>
                    <input
                      id="txt-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue dark:focus:ring-neon-cyan transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label id="lbl-email" htmlFor="txt-email" className="text-xs font-mono text-gray-450 dark:text-gray-400 font-bold uppercase">
                      Email Address *
                    </label>
                    <input
                      id="txt-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="e.g. name@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue dark:focus:ring-neon-cyan transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label id="lbl-subject" htmlFor="txt-subject" className="text-xs font-mono text-gray-450 dark:text-gray-400 font-bold uppercase">
                    Topic Subject
                  </label>
                  <input
                    id="txt-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleFormChange}
                    placeholder="e.g. Scale project quote / Consultation"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue dark:focus:ring-neon-cyan transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label id="lbl-msg" htmlFor="txt-msg" className="text-xs font-mono text-gray-450 dark:text-gray-400 font-bold uppercase">
                    Your Message Statement *
                  </label>
                  <textarea
                    id="txt-msg"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Describe how I can support your development timeline..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue dark:focus:ring-neon-cyan transition-all resize-none"
                  />
                </div>

                <button
                  id="btn-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-neon-blue to-neon-cyan shadow-md hover:shadow-cyan-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer font-display disabled:opacity-75 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/35 border-t-white animate-spin" />
                      Sending Statement...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Secure Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-gray-150 dark:border-gray-900 bg-white dark:bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-lg sm:text-xl bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              TALHA
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-105 dark:bg-charcoal-900 text-gray-500 font-bold border border-transparent dark:border-gray-800">
              .DEV
            </span>
          </div>

          <p className="text-xs text-gray-400 font-mono">
            &copy; {new Date().getFullYear()} Md. Abu Talha Taufique. All Rights Reserved.
          </p>

          <div className="flex space-x-4 text-xs font-mono text-gray-400">
            <a href="#about" className="hover:text-neon-cyan transition-colors">About</a>
            <span>&middot;</span>
            <a href="#projects" className="hover:text-neon-cyan transition-colors">Projects</a>
            <span>&middot;</span>
            <a href="#contact" className="hover:text-neon-cyan transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-charcoal-950/90 text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center justify-center"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
