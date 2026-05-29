export type Project = ({
  name: string;
  stack: string[];
  tag: string;
  desc: string;
  repo: string;
  featured: boolean;
} | {
  name: string;
  stack: string[];
  tag: string;
  desc: string;
  repo: string;
  featured?: undefined;
});
export type ContactLink = {
  label: string;
  value: string;
  href: string;
  note: string;
};




export const NAV_LINKS = ["about", "experience", "projects", "skills", "contact"];

export const HERO_STATS = [
  { n: "3.7 / 4.0", label: "GPA · NUTECH" },
  { n: "2+", label: "Years building" },
  { n: "8+", label: "Core technologies" },
  { n: "6+", label: "Open-source projects" },
];

export const EXPERIENCE_DATA = {
  date: "Apr 2026 – Present",
  type: "Contract · Hybrid",
  location: "Lahore, Pakistan",
  tags: ["ExpressJS", "PostgreSQL", "Uber H3", "REST APIs"],
  role: "Backend Developer",
  company: "Axiolink Systems (Pvt) Ltd",
  bullets: [
    "Implemented nearest rider matching with Uber H3 geospatial indexing, querying drivers within a configurable radius in under 5ms.",
    "Developed and integrated REST APIs for real-time, location-aware driver lookup features used in production.",
    "Maintaining backend services with ExpressJS & PostgreSQL, including schema design and query optimization.",
  ],
};


export const PROJECTS:Project[] = [
  {
    name: "Teacher Feedback System",
    stack: ["NestJS", "Angular", "Go", "PostgreSQL", "JWT"],
    tag: "Full-Stack",
    desc: "Scalable academic evaluation platform with JWT auth, RBAC for students, faculty & admins, and Go microservices for inter-service communication.",
    repo: "https://github.com/jawadr9899/teacher-feedback-system",
    featured: true,
  },
  {
    name: "Teyrs — Terminal File Explorer",
    stack: ["Rust"],
    tag: "Systems",
    desc: "TUI-based file explorer with keyboard-driven navigation, directory traversal, and live file previews built on a custom event loop.",
    repo: "https://github.com/jawadr9899/teyrs",
    featured: true,
  },
  {
    name: "URL Shortener Service",
    stack: ["Node.js", "Express", "MongoDB"],
    tag: "Backend",
    desc: "REST API with collision-resistant slug generation, user auth, per-link analytics, and indexed MongoDB for fast lookups.",
    repo: "https://github.com/jawadr9899/URL-Shortener",
  },
  {
    name: "Pyxoim & PyResumay",
    stack: ["Python", "PyQt5"],
    tag: "Desktop",
    desc: "Two desktop apps demonstrating OOP principles — inheritance, encapsulation, polymorphism — with responsive PyQt5 UIs.",
    repo: "https://github.com/jawadr9899/Pyxoim",
  },
  {
    name: "ascii-c",
    stack: ["C"],
    tag: "Systems",
    desc: "Converts raster images to ASCII art using pixel brightness mapping in pure C with zero dependencies.",
    repo: "https://github.com/jawadr9899/ascii-c",
  },
  {
    name: "Entry Test System",
    stack: ["Python", "Tkinter"],
    tag: "Desktop",
    desc: "Desktop app for test workflows: question bank, timed sessions, score reporting, session management via JSON/CSV.",
    repo: "https://github.com/jawadr9899/entry-test-system",
  },
];

export const SKILLS = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Rust", "Golang", "C / C++", "HTML & CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "Gin/Echo","Axum", "FastAPI (learning)"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Angular", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Data & Tooling",
    items: ["PostgreSQL", "MongoDB", "Git / GitHub", "Docker (learning)", "Uber H3", "Agile / Scrum"],
  },
];

export const EDUCATION_DATA = {
  degree: "B.S. Computer Science",
  university: "National University of Technology, Islamabad",
  timeline: "2025 – Present",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Linear Algebra",
    "Statistics",
    "Calculus I & II",
  ],
  gpa: "3.7",
};


export const CONTACT_LINKS:ContactLink[] = [
  { label: "Email", value: "jawadd.code@gmail.com", href: "mailto:jawadd.code@gmail.com", note: "Preferred contact" },
  { label: "GitHub", value: "github.com/jawadr9899", href: "https://github.com/jawadr9899", note: "Open-source work" },
  { label: "LinkedIn", value: "linkedin/jawad-rafique", href: "https://www.linkedin.com/in/jawad-rafique-132952388", note: "Professional profile" },
  { label: "Phone", value: "+92 349 844 8389", href: "tel:+923498448389", note: "WhatsApp available" },
];
