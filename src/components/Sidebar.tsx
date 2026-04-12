import { ChevronDown, ChevronRight, Folder, FileJson, FileCode, FileText, FileBarChart } from "lucide-react";
import { useState } from "react";

const files = {
  src: ["intro.md", "about.rs", "projects.ts", "skills.cpp", "game.tsx", "beauty.r"],
  config: ["contact.json"],
};

export default function Sidebar({ activeFile, onOpenFile }: { activeFile: string, onOpenFile: (f: string) => void }) {
  const [expanded, setExpanded] = useState({ src: true, config: true });

  const toggleFolder = (folder: "src" | "config") => setExpanded({ ...expanded, [folder]: !expanded[folder] });

  return (
    <div className="w-[260px] bg-[#010409]/60 border-r border-[#30363d] flex flex-col text-[13px] select-none shrink-0 backdrop-blur-md">
      <div className="px-5 py-4 mb-2 flex items-center gap-3 border-b border-[#30363d]/50 bg-[#000000]/20">
        
        <div className="flex flex-col font-mono text-[13px] leading-tight mt-0.5">
          <span className="font-bold tracking-wide text-[#e6edf3]">
            explore<span className="text-[#3fb950] px-px">@</span><span className="text-[#58a6ff]">Jawad</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#8b949e] mt-1">
            Environment
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mt-2">
        {/* SRC Directory */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => toggleFolder("src")}>
          {expanded.src ? <ChevronDown size={14} className="opacity-70" /> : <ChevronRight size={14} className="opacity-70" />}
          <Folder size={15} className="text-[#58a6ff]" />
          <span className="font-medium text-[#e6edf3]">src</span>
        </div>
        {expanded.src && files.src.map(file => (
          <div key={file} onClick={() => onOpenFile(file)} className={`flex items-center gap-2 pl-9 pr-3 py-1.5 cursor-pointer transition-colors ${activeFile === file ? "bg-[#1f6feb]/20 text-white border-l-2 border-[#58a6ff]" : "text-[#8b949e] border-l-2 border-transparent hover:bg-white/5 hover:text-[#c9d1d9]"}`}>
            {file === "beauty.r" ? (
               <FileBarChart size={14} className={activeFile === file ? "text-[#58a6ff]" : "opacity-60 text-[#276dc3]"} />
            ) : (
               <FileCode size={14} className={activeFile === file ? "text-[#58a6ff]" : "opacity-60"} />
            )}
            <span>{file}</span>
          </div>
        ))}
        {expanded.src && (
          <div 
            onClick={() => window.open("https://docs.google.com/document/d/1vgeLh9Q6GeRVgjB-yY-kT3R9QX4-nr_tWJT72Oxkc-s/edit?tab=t.0", "_blank")}
            className="flex items-center gap-2 pl-9 pr-3 py-1.5 cursor-pointer transition-colors text-[#8b949e] border-l-2 border-transparent hover:bg-white/5 hover:text-[#c9d1d9]"
          >
            <FileText size={14} className="opacity-60 text-[#f85149]" /> <span>resume.pdf</span>
          </div>
        )}
        {/* CONFIG Directory */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer hover:bg-white/5 mt-2 transition-colors" onClick={() => toggleFolder("config")}>
          {expanded.config ? <ChevronDown size={14} className="opacity-70" /> : <ChevronRight size={14} className="opacity-70" />}
          <Folder size={15} className="text-[#d2a8ff]" />
          <span className="font-medium text-[#e6edf3]">config</span>
        </div>
        {expanded.config && files.config.map(file => (
          <div key={file} onClick={() => onOpenFile(file)} className={`flex items-center gap-2 pl-9 pr-3 py-1.5 cursor-pointer transition-colors ${activeFile === file ? "bg-[#1f6feb]/20 text-white border-l-2 border-[#58a6ff]" : "text-[#8b949e] border-l-2 border-transparent hover:bg-white/5 hover:text-[#c9d1d9]"}`}>
            <FileJson size={14} className={activeFile === file ? "text-[#f0e130]" : "opacity-60 text-[#f0e130]"} /> <span>{file}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
