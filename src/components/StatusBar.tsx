import { GitBranch, XCircle, AlertTriangle, CheckCheck, TerminalSquare } from "lucide-react";

export default function StatusBar({ onToggleTerminal }: { onToggleTerminal: () => void }) {
  return (
    <div className="h-6 bg-[#010409] border-t border-[#30363d] text-[#7d8590] flex justify-between px-4 text-[11px] items-center shrink-0 z-30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#e6edf3] hover:bg-white/5 px-2 py-[2px] rounded transition-all">
          <GitBranch size={12} className="text-[#58a6ff]" /> main*
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#e6edf3] hover:bg-white/5 px-2 py-[2px] rounded transition-all">
          <CheckCheck size={13} className="text-[#3fb950]" /> Prettier
        </div>
        <div className="flex items-center gap-3 cursor-pointer hover:text-[#e6edf3] hover:bg-white/5 px-2 py-[2px] rounded transition-all">
          <span className="flex items-center gap-1.5"><XCircle size={12} /> 0</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={12} /> 0</span>
        </div>
        <div 
          onClick={onToggleTerminal}
          className="flex items-center gap-1.5 cursor-pointer hover:text-[#e6edf3] hover:bg-[#1f6feb]/20 text-[#58a6ff] px-2 py-[2px] rounded transition-all"
        >
          <TerminalSquare size={13} /> Toggle Terminal
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="cursor-pointer hover:text-[#e6edf3] hover:bg-white/5 px-2 py-[2px] rounded transition-all">UTF-8</span>
        <span className="cursor-pointer hover:text-[#e6edf3] hover:bg-white/5 px-2 py-[2px] rounded transition-all">Ln 14, Col 3</span>
        <span className="cursor-pointer hover:text-[#e6edf3] hover:bg-white/5 px-2 py-[2px] rounded transition-all">TypeScript React</span>
      </div>
    </div>
  );
}
