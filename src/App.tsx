import { useState, type ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import Terminal from "./components/Terminal";
import StatusBar from "./components/StatusBar";
import BackgroundMatrix from "./components/BackgroundMatrix";
import { FileCode, X } from "lucide-react";

export default function App() {
  const [activeFile, setActiveFile] = useState<string>("intro.md");
  const [openTabs, setOpenTabs] = useState<string[]>(["intro.md", "projects.ts"]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalHistory, setTerminalHistory] = useState<
    { command: string; output: ReactNode }[]
  >([{ command: "whoami", output: "jawadr9899 - Polyglot Engineer" }]);

  const handleOpenFile = (filename: string) => {
    if (!openTabs.includes(filename)) setOpenTabs([...openTabs, filename]);
    setActiveFile(filename);
  };

  const closeTab = (e: React.MouseEvent, filename: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((t) => t !== filename);
    setOpenTabs(newTabs);
    if (activeFile === filename) {
      setActiveFile(newTabs.length > 0 ? newTabs[newTabs.length - 1] : "");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-mono text-slate-300 bg-[#0d1117] relative selection:bg-blue-500/30 selection:text-blue-200">
      <BackgroundMatrix />

      <div className="flex flex-1 overflow-hidden z-10 bg-[#0d1117]/85 backdrop-blur-md">
        <Sidebar activeFile={activeFile} onOpenFile={handleOpenFile} />

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Bar (Tabs) */}
          <div className="h-8 flex flex-row items-end bg-[#010409]/80 border-b border-[#30363d] overflow-x-auto shrink-0 shadow-sm">
            {openTabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveFile(tab)}
                className={`flex items-center gap-2 px-3 py-1 cursor-pointer border-r border-[#30363d] group transition-colors duration-150 ${
                  activeFile === tab
                    ? "bg-[#0d1117]/80 border-t-2 border-t-[#58a6ff] text-[#e6edf3]"
                    : "bg-transparent border-t-2 border-t-transparent text-[#7d8590] hover:bg-[#0d1117]/50"
                }`}
              >
                <FileCode size={13} className={activeFile === tab ? "text-[#58a6ff]" : "opacity-70"} />
                <span className="text-[12px]">{tab}</span>
                <X
                  size={13}
                  className="opacity-0 group-hover:opacity-100 hover:bg-[#30363d] rounded-md p-[1px] transition-opacity"
                  onClick={(e) => closeTab(e, tab)}
                />
              </div>
            ))}
          </div>

          {/* Breadcrumbs */}
          {activeFile && (
            <div className="h-6 bg-[#0d1117]/60 flex items-center px-4 text-[11px] text-[#7d8590] shrink-0 border-b border-white/5">
              portfolio <span className="mx-2 opacity-50">&gt;</span> src <span className="mx-2 opacity-50">&gt;</span>{" "}
              <span className="text-[#e6edf3]">{activeFile}</span>
            </div>
          )}

          <CodeEditor activeFile={activeFile} />
          {isTerminalOpen && <Terminal history={terminalHistory} setHistory={setTerminalHistory} />}
        </div>
      </div>
      <StatusBar onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)} />
    </div>
  );
}
