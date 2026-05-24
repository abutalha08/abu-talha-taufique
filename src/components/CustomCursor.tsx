import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Outer circle cursor coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Fine spring physics for smooth fluid movement
  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Inner cursor follow speed
  const innerConfig = { damping: 15, stiffness: 450, mass: 0.2 };
  const innerXSpring = useSpring(cursorX, innerConfig);
  const innerYSpring = useSpring(cursorY, innerConfig);

  useEffect(() => {
    setIsMounted(true);
    
    // Prevent rendering tracking in touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    // Add custom cursor class to document body to manage cursor styles
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover bindings for interactive items
    const attachHoverSelectors = () => {
      const elements = document.querySelectorAll(
        "a, button, select, input, textarea, [role='button'], .hover-magnetic"
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    // Initial attach
    attachHoverSelectors();

    // Create an observer to auto-attach to dynamically added items
    const observer = new MutationObserver(() => {
      attachHoverSelectors();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isMounted || !isVisible) return null;

  return (
    <>
      {/* Outer ambient glow auracle tracker */}
      <motion.div
        id="cursor-glow"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          opacity: isHovered ? 0.3 : 0.15,
        }}
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-40 bg-radial from-neon-cyan/50 to-transparent blur-xl"
      />

      {/* Outer focus thin ring */}
      <motion.div
        id="cursor-ring"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1.0,
          borderColor: isHovered ? "rgba(0, 240, 255, 0.8)" : "rgba(0, 136, 255, 0.4)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-50 mix-blend-screen"
      />

      {/* Inner crisp core dot */}
      <motion.div
        id="cursor-dot"
        style={{
          x: innerXSpring,
          y: innerYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.4 : 1.0,
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-cyan pointer-events-none z-50 pointer-events-none"
      />
    </>
  );
}
