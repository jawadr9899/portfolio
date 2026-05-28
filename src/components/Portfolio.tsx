import { useState, useEffect } from "react";
import {
  NAV_LINKS,
  CONTACT_LINKS,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  HERO_STATS,
  PROJECTS,
  SKILLS,
} from "../store";
import ProjectCard from "./ProjectCard";
import ContactCard from "./ContactCard";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.25 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div className="font-sans bg-[#FAFAFA] text-black overflow-x-hidden selection:bg-black selection:text-[#FAFAFA]">
      {/* ── NAV ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-[clamp(20px,5vw,80px)] transition-all duration-350 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]"
            : "bg-transparent border-b-transparent"
        }`}
      >
        <button
          onClick={() => scrollTo("about")}
          className="bg-none border-none cursor-pointer font-serif font-bold text-[17px] text-black tracking-tight p-0"
        >
          Jawad<span className="italic font-normal"> Rafique</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`bg-none border-none cursor-pointer py-1.5 px-4.5 text-[13px] font-sans capitalize tracking-wide transition-colors relative ${
                activeSection === l
                  ? "text-black font-medium"
                  : "text-[#999] font-normal"
              }`}
            >
              {l}
              {activeSection === l && (
                <span className="absolute -bottom-[1px] left-4 right-4 h-[1px] bg-black" />
              )}
            </button>
          ))}
          <a
            href="https://docs.google.com/document/d/1vgeLh9Q6GeRVgjB-yY-kT3R9QX4-nr_tWJT72Oxkc-s"
            target="_blank"
            rel="noreferrer"
            className="ml-5 py-2 px-5 bg-black text-[#FAFAFA] text-[13px] font-sans no-underline tracking-wider border border-black transition-colors duration-200 hover:bg-transparent hover:text-black"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden bg-transparent border border-[#CCC] cursor-pointer py-1.5 px-2.5 text-black text-base leading-none font-sans"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="absolute top-[60px] left-0 right-0 bg-[#FAFAFA] border-b border-[#EAEAEA] px-6 pb-5 flex flex-col md:hidden">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`bg-transparent border-none cursor-pointer text-left py-3 border-b border-[#EAEAEA] text-[15px] font-sans capitalize tracking-wide ${
                  activeSection === l
                    ? "text-black font-medium"
                    : "text-[#888] font-normal"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center pt-[120px] pb-20 px-[clamp(20px,6vw,100px)] text-center relative border-b border-[#EAEAEA]"
      >
        <div className="absolute top-20 left-[clamp(20px,6vw,100px)] right-[clamp(20px,6vw,100px)] h-[1px] bg-[#EAEAEA]" />

        <div className="inline-flex items-center gap-2 py-1.5 px-4 border border-[#CCC] mb-12 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-black block" />
          <span className="text-[#555] text-xs font-sans tracking-[0.06em] uppercase">
            Open to full-time &amp; contract roles
          </span>
        </div>

        <h1 className="font-serif font-extrabold text-[clamp(60px,18vw,96px)] md:text-[clamp(72px,13vw,136px)] leading-[0.88] tracking-tight text-black mb-10 animate-fade-up delay-100">
          Jawad
          <br />
          <span className="italic font-normal">Rafique</span>
        </h1>

        <p className="font-sans text-[clamp(14px,1.8vw,18px)] text-[#888] font-light tracking-widest uppercase mb-7 animate-fade-up delay-200">
          Polyglot Engineer &amp; Backend Specialist — Axiolink Systems
        </p>

        <p className="max-w-lg text-[15px] text-[#666] leading-relaxed font-sans font-light mb-12 animate-fade-up delay-300">
          Building high-performance systems from low-level C&nbsp;/&nbsp;Rust to
          full-stack web. Specializing in geospatial APIs, scalable backend
          services, and clean system architecture.
        </p>

        <div className="flex gap-3 flex-wrap justify-center animate-fade-up delay-400">
          <button
            onClick={() => scrollTo("projects")}
            className="py-3 px-8 bg-black border border-black text-[#FAFAFA] text-[13px] font-sans tracking-wide uppercase transition-colors hover:bg-transparent hover:text-black cursor-pointer"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="py-3 px-8 bg-transparent border border-[#CCC] text-[#555] text-[13px] font-sans tracking-wide uppercase transition-colors hover:border-black hover:text-black cursor-pointer"
          >
            Get in Touch
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-20 w-full max-w-3xl border-t border-l border-[#EAEAEA] animate-fade-up delay-500">
          {HERO_STATS.map(({ n, label }) => (
            <div
              key={label}
              className="py-7 px-5 border-r border-b border-[#EAEAEA] text-center"
            >
              <p className="font-serif font-bold text-2xl text-black tracking-tight leading-none">
                {n}
              </p>
              <p className="text-[11px] text-[#999] font-sans tracking-wider uppercase mt-1.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-[clamp(20px,6vw,100px)] right-[clamp(20px,6vw,100px)] h-[1px] bg-[#EAEAEA]" />
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────── */}
      <section
        id="experience"
        className="py-24 px-[clamp(20px,6vw,100px)] bg-[#FAFAFA]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline gap-5 mb-16 pb-6 border-b border-black">
            <span className="font-serif italic text-sm text-[#AAA]">01</span>
            <h2 className="font-serif font-bold text-[clamp(28px,3.5vw,40px)] text-black tracking-tight leading-none">
              Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 gap-y-10 pb-14 border-b border-[#EAEAEA]">
            <div className="pt-1.5">
              <p className="font-sans text-xs text-[#999] tracking-wider uppercase mb-2.5">
                {EXPERIENCE_DATA.date}
              </p>
              <p className="font-sans text-xs text-[#BBB] font-light leading-relaxed">
                {EXPERIENCE_DATA.type}
                <br />
                {EXPERIENCE_DATA.location}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-6">
                {EXPERIENCE_DATA.tags.map((t) => (
                  <span
                    key={t}
                    className="font-sans text-[10.5px] text-[#555] border border-[#CCC] py-1 px-2 tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-[clamp(20px,2.5vw,26px)] text-black tracking-tight mb-1.5">
                {EXPERIENCE_DATA.role}
              </h3>
              <p className="font-sans text-sm text-[#888] font-light mb-7 tracking-wide">
                {EXPERIENCE_DATA.company}
              </p>

              <div className="flex flex-col gap-4">
                {EXPERIENCE_DATA.bullets.map((b, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <span className="font-serif italic text-xs text-[#CCC] pt-0.5 shrink-0 w-5 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-[14.5px] text-[#444] leading-relaxed font-light">
                      {b}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-9 flex items-center justify-between flex-wrap gap-3">
            <p className="font-sans text-[13px] text-[#AAA] font-light italic">
              More roles &amp; freelance work on the way.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-transparent border-none cursor-pointer font-sans text-[13px] text-black tracking-wide underline decoration-[#CCC] p-0"
            >
              Let's work together →
            </button>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────── */}
      <section
        id="projects"
        className="py-24 px-[clamp(20px,6vw,100px)] bg-white border-y border-[#EAEAEA]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline gap-5 pb-6 border-b border-black">
            <span className="font-serif italic text-sm text-[#AAA]">02</span>
            <h2 className="font-serif font-bold text-[clamp(28px,3.5vw,40px)] text-black tracking-tight leading-none">
              Projects
            </h2>
          </div>

          <div className="md:-mx-10">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} p={p} index={i} />
            ))}
          </div>
          <div className="h-[1px] bg-black w-full" />
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────── */}
      <section
        id="skills"
        className="py-24 px-[clamp(20px,6vw,100px)] bg-[#FAFAFA]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline gap-5 mb-16 pb-6 border-b border-black">
            <span className="font-serif italic text-sm text-[#AAA]">03</span>
            <h2 className="font-serif font-bold text-[clamp(28px,3.5vw,40px)] text-black tracking-tight leading-none">
              Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-[#EAEAEA]">
            {SKILLS.map((cat) => (
              <div
                key={cat.label}
                className="py-8 px-7 border-r border-b border-[#EAEAEA]"
              >
                <p className="font-sans font-medium text-[10.5px] text-[#AAA] tracking-widest uppercase mb-5 ">
                  {cat.label}
                </p>
                <div className="flex flex-col gap-2.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="group font-sans text-[13.5px] text-[#444] font-light py-1 px-0 hover:px-2.5 hover:text-[#FAFAFA] hover:bg-black hover:font-normal cursor-default transition-all duration-150 block"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ───────────────────────────────────── */}
      <section className="py-24 px-[clamp(20px,6vw,100px)] bg-white border-t border-[#EAEAEA]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline gap-5 mb-16 pb-6 border-b border-black">
            <span className="font-serif italic text-sm text-[#AAA]">04</span>
            <h2 className="font-serif font-bold text-[clamp(28px,3.5vw,40px)] text-black tracking-tight leading-none">
              Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-16 gap-y-10 items-start">
            <div>
              <h3 className="font-serif font-bold text-[clamp(20px,2.5vw,26px)] text-black tracking-tight mb-1.5">
                {EDUCATION_DATA.degree}
              </h3>
              <p className="font-sans text-sm text-[#888] font-light mb-1">
                {EDUCATION_DATA.university}
              </p>
              <p className="font-sans text-xs text-[#BBB] font-light tracking-wide mb-9">
                {EDUCATION_DATA.timeline}
              </p>

              <p className="font-sans text-[10.5px] text-[#AAA] font-medium tracking-widest uppercase mb-3.5">
                Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION_DATA.coursework.map((c) => (
                  <span
                    key={c}
                    className="font-sans text-[12.5px] text-[#666] border border-[#DDD] py-1 px-3.5 font-light"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-[#EAEAEA] py-7 px-9 text-center shrink-0">
              <p className="font-serif font-extrabold text-[52px] text-black tracking-tighter leading-none">
                {EDUCATION_DATA.gpa}
              </p>
              <p className="font-sans text-[11px] text-[#AAA] font-normal tracking-wider uppercase mt-2">
                GPA / 4.0
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section
        id="contact"
        className="pt-24 pb-24 px-[clamp(20px,6vw,100px)] bg-black"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 pb-8 border-b border-[#2A2A2A]">
            <p className="font-sans text-[10.5px] text-[#555] tracking-widest uppercase mb-5">
              05 — Contact
            </p>
            <h2 className="font-serif font-bold text-[clamp(36px,5vw,64px)] text-[#FAFAFA] tracking-tight leading-[1.05] max-w-xl">
              Let's build something{" "}
              <span className="italic font-normal">great</span> together.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-16 border-l border-t border-[#222]">
            {CONTACT_LINKS.map((link) => (
              <ContactCard key={link.label} link={link} />
            ))}
          </div>

          <div className="pt-9 border-t border-[#222] flex justify-between items-center flex-wrap gap-3">
            <p className="font-sans text-xs text-[#555] font-light tracking-wide">
              Based in{" "}
              <span className="text-[#888]">Rawalpindi, Punjab, PK</span> · Open
              to remote worldwide
            </p>
            <p className="font-serif italic text-[13px] text-[#444]">
              © 2026 Jawad Rafique
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
