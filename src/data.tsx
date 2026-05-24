import React from "react";
import { Skill, Project, Education, SocialLink } from "./types";
import { 
  FaReact, 
  FaHtml5, 
  FaNodeJs, 
  FaGithub, 
  FaLaptop 
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiNextdotjs, 
  SiExpress, 
  SiMongodb, 
  SiVercel, 
  SiNetlify, 
  SiPostman, 
  SiFigma, 
  SiVite, 
  SiFramer
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { IoLogoJavascript } from "react-icons/io5";
import { TbApi } from "react-icons/tb";
import { RiShieldKeyholeLine, RiBrush4Line, RiCodeBoxLine, RiTeamLine, RiLightbulbLine } from "react-icons/ri";

export const skillsData: Skill[] = [
  // Frontend
  { name: "React", icon: <FaReact color="#61DAFB" size={20} />, level: 95, category: "frontend" },
  { name: "JavaScript", icon: <IoLogoJavascript color="#F7DF1E" size={20} />, level: 96, category: "frontend" },
  { name: "Fetch API", icon: <TbApi color="#0052CC" size={20} />, level: 90, category: "frontend" },
  { name: "Next.js", icon: <SiNextdotjs size={20} />, level: 88, category: "frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" size={20} />, level: 95, category: "frontend" },
  { name: "HTML5 & CSS3", icon: <FaHtml5 color="#E34F26" size={20} />, level: 98, category: "frontend" },
  
  // Backend
  { name: "Node.js", icon: <FaNodeJs color="#339933" size={20} />, level: 92, category: "backend" },
  { name: "Express.js", icon: <SiExpress size={20} />, level: 90, category: "backend" },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" size={20} />, level: 88, category: "backend" },
  { name: "REST APIs", icon: <TbApi color="#FF5733" size={20} />, level: 95, category: "backend" },
  { name: "Mongoose", icon: <SiMongodb color="#880000" size={20} />, level: 88, category: "backend" },

  // Tools & Technologies
  { name: "Git & GitHub", icon: <FaGithub size={20} />, level: 92, category: "tools" },
  { name: "BetterAuth", icon: <RiShieldKeyholeLine color="#FF1493" size={20} />, level: 86, category: "tools" },
  { name: "Hero UI", icon: <SiFramer color="#A855F7" size={20} />, level: 88, category: "tools" },
  { name: "Shadcn", icon: <RiCodeBoxLine size={20} />, level: 85, category: "tools" },
  { name: "Daisy UI", icon: <RiBrush4Line color="#4A90E2" size={20} />, level: 90, category: "tools" },
  { name: "Vercel", icon: <SiVercel size={20} />, level: 90, category: "tools" },
  { name: "Netlify", icon: <SiNetlify color="#00C7B7" size={20} />, level: 88, category: "tools" },
  { name: "Postman", icon: <SiPostman color="#FF6C37" size={20} />, level: 90, category: "tools" },
  { name: "Figma", icon: <SiFigma color="#F24E1E" size={20} />, level: 82, category: "tools" },
  { name: "Vite", icon: <SiVite color="#646CFF" size={20} />, level: 94, category: "tools" },
  { name: "VS Code", icon: <VscVscode color="#007ACC" size={20} />, level: 96, category: "tools" },

  // Soft Skills
  { name: "Problem Solving", icon: <RiLightbulbLine color="#F59E0B" size={20} />, level: 94, category: "soft" },
  { name: "Responsive Web Design", icon: <FaLaptop color="#3B82F6" size={20} />, level: 96, category: "soft" },
  { name: "Team Collaboration", icon: <RiTeamLine color="#10B981" size={20} />, level: 92, category: "soft" }
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "SunCart – Summer Essentials Store",
    description: "A high-performance modern eCommerce platform built with Next.js, secure auth, smart filtering and clean UI.",
    tags: ["Next.js", "BetterAuth", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/abutalha08/sun-cart-a08",
    liveUrl: "https://sun-cart-a08.vercel.app/",
    image: "linear-gradient(135deg, #0f172a 0%, #080f25 100%)",
    featured: true,
    category: "frontend",
    stats: [
      { label: "Active Users", value: "2.5K+" },
      { label: "Data Pipeline", value: "99.9%" }
    ]
  },
  {
    id: "proj-2",
    title: "KeenKeeper",
    description: "KeenKeeper is a relationship management app that helps you maintain meaningful connections by tracking interactions, setting engagement goals, and reminding you to stay in touch with important people.",
    tags: ["React", "ES6+", "Recharts", "Tailwind CSS", "DaisyUI"],
    githubUrl: "https://github.com/abutalha08/keen-keeper-A07",
    liveUrl: "https://keen-keeper-a7-project-ph.netlify.app/",
    image: "linear-gradient(135deg, #090e1a 0%, #1e1b4b 100%)",
    featured: true,
    category: "frontend",
    stats: [
      { label: "Charts Render", value: "<16ms" },
      { label: "Visual Fidelity", value: "100%" }
    ]
  },
  {
    id: "proj-3",
    title: "DigiTools Platform",
    description: "A modern digital marketplace where users can explore, manage, and purchase high-quality digital tools with a seamless experience.",
    tags: ["React", "ES6+","Tailwind CSS", "DaisyUI"],
    githubUrl: "https://github.com/abutalha08/digi-tools-platform-A06",
    liveUrl: "https://digi-tools-platform-a6-ph.netlify.app/",
    image: "linear-gradient(135deg, #020617 0%, #111827 100%)",
    featured: false,
    category: "frontend",
    stats: [
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Compliance", value: "Certified" }
    ]
  },
];

export const educationData: Education[] = [
  {
    id: "edu-1",
    degree: "Secondary School Certificate (SSC) - Science",
    institution: "Gaibandha Government Boys' High School, Gaibandha",
    period: "2016 - 2017",
    description: "Completed SSC in Science group with GPA 5.00/5.00. Had a strong interest in technology and gadgets alongside academic studies.",
    grade: " GPA 5.00/5.00"
  },
  {
    id: "edu-2",
    degree: "Higher Secondary Certificate (HSC) - Science",
    institution: "Gaibandha Government College, Gaibandha",
    period: "2018 - 2019",
    description: "Completed Higher Secondary Certificate with a perfect GPA in Science group. Developed strong foundations in Mathematics and Physics, which later contributed to logical thinking and problem-solving skills in programming.",
    grade: "GPA 5.00/5.00"
  },
  {
    id: "edu-3",
    degree: "Bachelor of Science (Engineering) in Computer Science and Engineering",
    institution: "Hajee Mohammad Danesh Science and Technology University, Dinajpur",
    period: "2020 - 2023",
    description: "Completed undergraduate studies in Computer Science and Engineering with a focus on software development, algorithms, and modern web technologies. Graduation was completed in 2025 due to academic delays caused by COVID-19.",
    grade: "CGPA 3.242/4.00"
  }
];

export const socialLinks: SocialLink[] = [
  {
    platform: "WhatsApp",
    url: "https://wa.me/8801796660101",
    icon: "whatsapp"
  },
  {
    platform: "Telegram",
    url: "https://t.me/+8801796660101",
    icon: "telegram"
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/share/1GABdy3EzP/",
    icon: "facebook"
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/md-abu-talha-taufique/",
    icon: "linkedin"
  },
  {
    platform: "GitHub",
    url: "https://github.com/abutalha08",
    icon: "github"
  }
];
