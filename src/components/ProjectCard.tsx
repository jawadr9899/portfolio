
import { type Project } from "../store";

export default function ProjectCard({ p, index }: { p: Project, index: number }) {
  return (
    <div className="group border-t border-black py-8 -mx-10 px-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start cursor-default transition-colors duration-200 hover:bg-black">
      {/* Left column */}
      <div>
        <div className="flex items-center gap-4 mb-3.5">
          <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#888] border border-[#CCC] group-hover:border-[#444] rounded-sm py-1 px-2.5 transition-colors duration-200">
            {p.tag}
          </span>
          {p.featured && (
            <span className="font-sans text-[9px] font-semibold tracking-[0.15em] uppercase text-white group-hover:text-black bg-black group-hover:bg-white py-1 px-2.5 rounded-sm transition-all duration-200">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-serif font-bold text-[clamp(18px,2.2vw,23px)] text-black group-hover:text-white tracking-tight leading-tight mb-3 transition-colors duration-200">
          {p.name}
        </h3>

        <p className="font-sans text-sm text-[#666] group-hover:text-[#AAA] leading-relaxed font-light max-w-xl transition-colors duration-200">
          {p.desc}
        </p>

        <div className="flex gap-2 flex-wrap mt-5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="font-sans text-[11.5px] text-[#888] border border-[#DDD] group-hover:border-[#333] py-1 px-2.5 rounded-sm tracking-wide transition-colors duration-200"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col items-end gap-6">
        <span className="font-serif italic text-sm text-[#CCC] group-hover:text-[#555] transition-colors duration-200">
          {String(index + 1).padStart(2, "0")}
        </span>
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-11 h-11 border border-[#CCC] group-hover:border-white rounded-sm text-[#555] group-hover:text-white text-lg no-underline transition-all duration-200 flex-shrink-0 hover:bg-black hover:!text-white hover:!border-black"
        >
          ↗
        </a>
      </div>
    </div>
  );
}
