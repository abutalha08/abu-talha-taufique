import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage or default to dark mode
    const stored = localStorage.getItem("portfolio-theme");
    const defaultValue = stored ? stored === "dark" : true;
    setIsDark(defaultValue);
    
    if (defaultValue) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextValue = !isDark;
    setIsDark(nextValue);
    if (nextValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  };

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle visual theme"
      className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-md hover:bg-gray-100 dark:hover:bg-charcoal-800 transition-all cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-neon-blue"
    >
      <motion.div
        animate={{ y: isDark ? 0 : -30, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center text-neon-cyan"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <motion.div
        animate={{ y: !isDark ? 0 : 30, opacity: !isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center text-amber-500"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
    </button>
  );
}
