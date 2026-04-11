import { useState, useRef, useEffect, type ReactNode, type FormEvent } from "react";

interface TerminalProps {
  history: { command: string; output: ReactNode }[];
  setHistory: React.Dispatch<React.SetStateAction<{ command: string; output: ReactNode }[]>>;
}

export default function Terminal({ history, setHistory }: TerminalProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let output: ReactNode = "";
    const cmd = input.trim().toLowerCase();

    switch (cmd) {
      case "help":
        output = "Available commands: whoami, clear, ls, cat <file>, fetch_repos";
        break;
      case "whoami":
        output = "Jawad - Polyglot Engineer";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "ls":
        output = <span className="text-[#79c0ff]">src/ config/ package.json</span>;
        break;
      default:
        output = <span className="text-[#ff7b72]">bash: {cmd}: command not found</span>;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <div className="h-[32vh] bg-[#010409]/60 border-t border-[#30363d] p-3 text-[13px] flex flex-col font-mono relative z-20 shrink-0 backdrop-blur-md">
      <div className="flex gap-6 border-b border-[#30363d] pb-2 px-3 text-[#7d8590] text-[11px] uppercase tracking-wider font-semibold">
        <span className="border-b-[3px] border-transparent cursor-pointer hover:text-[#c9d1d9] transition-colors pb-2 -mb-2.5">Problems</span>
        <span className="border-b-[3px] border-transparent cursor-pointer hover:text-[#c9d1d9] transition-colors pb-2 -mb-2.5">Output</span>
        <span className="border-b-[3px] border-[#58a6ff] text-[#e6edf3] cursor-pointer pb-2 -mb-2.5">Terminal</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 text-[#e6edf3] custom-scrollbar">
        {history.map((entry, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex gap-2.5 items-center">
              <span className="text-[#3fb950] font-semibold">jawadr9899<span className="text-[#7d8590] font-normal">@</span>linux</span>
              <span className="text-[#d2a8ff] font-semibold">~/portfolio</span>
              <span className="text-[#7d8590]">$</span>
              <span className="text-[#e6edf3] ml-1">{entry.command}</span>
            </div>
            {entry.output && <div className="mt-2 text-[#c9d1d9] pl-1">{entry.output}</div>}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2.5 items-center mt-1">
          <span className="text-[#3fb950] font-semibold">jawadr9899<span className="text-[#7d8590] font-normal">@</span>linux</span>
          <span className="text-[#d2a8ff] font-semibold">~/portfolio</span>
          <span className="text-[#7d8590]">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#e6edf3] caret-[#58a6ff] ml-1"
            autoFocus
            spellCheck={false}
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
