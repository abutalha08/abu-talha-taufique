import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        id="app-navbar"
        className={`fixed top-0 left-0 w-full z-30 border-b transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/70 dark:bg-charcoal-900/75 shadow-lg border-gray-100 dark:border-gray-800/60 backdrop-blur-md"
            : "py-5 bg-transparent border-gray-100/0 dark:border-gray-800/0 shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent group-hover:from-neon-cyan group-hover:to-neon-blue transition-all">
              TALHA
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 group-hover:bg-neon-blue/10 group-hover:text-neon-cyan transition-all font-semibold border border-transparent dark:border-gray-700">
              .DEV
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer group rounded-lg focus:outline-none text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-gray-100 dark:bg-neon-blue/10 border-b-2 dark:border-neon-cyan border-gray-900 rounded-lg -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Subtle link underscore hover effect for interactive styling */}
                  {!isActive && (
                    <span className="absolute bottom-1.5 left-4 right-4 h-[2px] bg-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Navbar actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-neon-blue to-neon-cyan shadow-md hover:shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-1.5 group font-display border border-transparent cursor-pointer"
            >
              Let's Connect
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center lg:hidden space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 md:left-auto md:right-8 md:w-80 top-[70px] z-20 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-charcoal-900/95 shadow-xl backdrop-blur-xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-3 rounded-xl text-md font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-gray-100 text-gray-900 dark:bg-neon-blue/10 dark:text-neon-cyan border-l-4 border-neon-cyan"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-charcoal-800/50"
                    }`}
                  >
                    {item.label}
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                      {item.href}
                    </span>
                  </a>
                );
              })}
              <hr className="border-gray-100 dark:border-gray-800/80 my-2" />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full text-center py-3.5 rounded-xl text-md font-semibold text-white bg-gradient-to-r from-neon-blue to-neon-cyan shadow-md flex items-center justify-center gap-2"
              >
                Let's Connect
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
