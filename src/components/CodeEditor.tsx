import { useState, useRef, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MiniGame = () => {
  const initialNodes = [
    { id: 1, val: 42 },
    { id: 2, val: 7 },
    { id: 3, val: 99 },
    { id: 4, val: 23 },
    { id: 5, val: 14 }
  ];
  
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const isSorted = nodes.every((n, i, arr) => i === 0 || arr[i - 1].val <= n.val);

  const handleClick = (idx: number) => {
    if (isSorted) return;
    
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else {
      // Swap
      if (selectedIdx !== idx) {
        const newNodes = [...nodes];
        const temp = newNodes[selectedIdx];
        newNodes[selectedIdx] = newNodes[idx];
        newNodes[idx] = temp;
        setNodes(newNodes);
      }
      setSelectedIdx(null);
    }
  };

  return (
    <div className="mt-4 font-mono">
      <AnimatePresence mode="wait">
        {isSorted ? (
          <motion.div 
            key="won"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md p-5 border border-[#3fb950] bg-[#3fb950]/10 rounded-md text-[#3fb950] shadow-[0_0_15px_rgba(63,185,80,0.15)]"
          >
            <p className="font-bold flex items-center gap-2 mb-3 text-lg">
              <span>{'>'}</span> LIST SORTED - ACCESS GRANTED
            </p>
            <div className="space-y-2 text-sm text-[#e6edf3]">
              <p>Email: <a href="mailto:jawadd.code@gmail.com" className="text-[#a5d6ff] hover:underline transition-colors text-base">jawadd.code@gmail.com</a></p>
              <p>GitHub: <a href="https://github.com/jawadr9899" className="text-[#a5d6ff] hover:underline transition-colors text-base" target="_blank">github.com/jawadr9899</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/jawad-rafique-132952388" className="text-[#a5d6ff] hover:underline transition-colors text-base" target="_blank">in/jawad-rafique-132952388</a></p>
              <p className="text-[#d2a8ff] font-bold mt-2">Phone: +923498448389</p>
            </div>
            <button onClick={() => setNodes(initialNodes)} className="mt-6 text-xs font-bold px-4 py-2 bg-[#21262d] border border-[#30363d] text-[#e6edf3] hover:bg-[#3fb950] hover:text-white rounded transition-colors uppercase tracking-wider">Lock System Layer</button>
          </motion.div>
        ) : (
          <motion.div 
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl p-6 border border-[#30363d] bg-[#010409] rounded-xl flex flex-col items-center justify-center shadow-inner"
          >
            <p className="text-[#f85149] font-bold tracking-widest text-lg animate-pulse mb-2">SYSTEM UNSORTED</p>
            <p className="text-sm text-[#8b949e] mb-6 text-center max-w-sm">
              Linked List Memory fragmented. Click two nodes to swap them. Sort in ascending order to unlock contact data.
            </p>

            <div className="flex items-center gap-3 mb-4">
              {nodes.map((node, i) => (
                <div key={node.id} className="flex items-center gap-3">
                  <motion.div 
                    layout
                    onClick={() => handleClick(i)}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold cursor-pointer transition-colors shadow-lg
                      ${selectedIdx === i 
                        ? 'bg-[#1f6feb]/30 border-2 border-[#58a6ff] text-[#58a6ff] scale-110' 
                        : 'bg-[#21262d] border border-[#30363d] text-[#e6edf3] hover:border-[#58a6ff]/50'
                      }`}
                  >
                    {node.val}
                  </motion.div>
                  {i < nodes.length - 1 && (
                    <span className="text-[#7d8590]">-&gt;</span>
                  )}
                </div>
              ))}
              <span className="text-[#7d8590] ml-2">null</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const filesContent: Record<string, () => JSX.Element> = {
  "intro.md": () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col font-sans text-sm text-[#c9d1d9] max-w-3xl ml-4 mt-2"
    >
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-white mb-1"
      >
        Hi, I'm <span className="text-[#58a6ff]">Jawad</span> 👋
      </motion.h1>
      
      <p className="text-lg text-[#8b949e] font-medium mb-4">
        Polyglot Systems & Web Engineer
      </p>
      
      <p className="text-[#e6edf3] mb-2 leading-relaxed">
        Welcome to my interactive portfolio! Here is my contact information:
      </p>

      <ul className="space-y-1 mb-4 font-mono text-[#e6edf3]">
        <li><span className="text-[#3fb950] mr-2">email:</span> <a href="mailto:jawadd.code@gmail.com" className="text-[#a5d6ff] hover:underline">jawadd.code@gmail.com</a></li>
        <li><span className="text-[#3fb950] mr-2">github:</span> <a href="https://github.com/jawadr9899" className="text-[#a5d6ff] hover:underline" target="_blank">github.com/jawadr9899</a></li>
        <li><span className="text-[#3fb950] mr-2">linkedin:</span> <a href="https://www.linkedin.com/in/jawad-rafique-132952388" className="text-[#a5d6ff] hover:underline" target="_blank">in/jawad-rafique-132952388</a></li>
      </ul>

      <p className="text-sm text-[#8b949e] mt-2 mb-4">
        Feel free to explore the files on the left to learn more about my skills, and projects!
        You can also run commands in the terminal below.
      </p>
    </motion.div>
  ),
  "projects.ts": () => (
    <>
      <div><span className="text-[#8b949e] italic">{`/**\n * @author Jawad\n * @role Polyglot Systems & Web Engineer\n */`}</span></div>
      <br />
      <div><span className="text-[#ff7b72] font-bold">const</span> <span className="text-[#79c0ff]">projects</span>: <span className="text-[#58a6ff]">Project</span>[] = [</div>
      {/* teyrs */}
      <div className="pl-4">
        {`{`} <span className="text-[#79c0ff]">name</span>: <span className="text-[#a5d6ff]">"teyrs"</span>, <span className="text-[#79c0ff]">lang</span>: <span className="text-[#a5d6ff]">"Rust"</span>, <span className="text-[#79c0ff]">repo</span>: <a href="https://github.com/jawadr9899/teyrs" target="_blank" className="text-[#a5d6ff] border-b border-transparent hover:border-[#58a6ff] hover:text-white transition-all">"github/teyrs"</a>, <span className="text-[#79c0ff]">desc</span>: <span className="text-[#a5d6ff]">"Terminal-based file explorer"</span> {`},`}
      </div>
      {/* Rustle */}
      <div className="pl-4">
        {`{`} <span className="text-[#79c0ff]">name</span>: <span className="text-[#a5d6ff]">"Rustle"</span>, <span className="text-[#79c0ff]">lang</span>: <span className="text-[#a5d6ff]">"Rust"</span>, <span className="text-[#79c0ff]">repo</span>: <a href="#" className="text-[#a5d6ff] border-b border-transparent hover:border-[#58a6ff] hover:text-white transition-all">"github/Rustle"</a>, <span className="text-[#79c0ff]">desc</span>: <span className="text-[#a5d6ff]">"CLI tool for saving notes"</span> {`},`}
      </div>
       {/* ascii-c */}
       <div className="pl-4">
        {`{`} <span className="text-[#79c0ff]">name</span>: <span className="text-[#a5d6ff]">"ascii-c"</span>, <span className="text-[#79c0ff]">lang</span>: <span className="text-[#a5d6ff]">"C"</span>, <span className="text-[#79c0ff]">repo</span>: <a href="#" className="text-[#a5d6ff] border-b border-transparent hover:border-[#58a6ff] hover:text-white transition-all">"github/ascii-c"</a>, <span className="text-[#79c0ff]">desc</span>: <span className="text-[#a5d6ff]">"Convert images into ASCII art"</span> {`},`}
      </div>
      {/* Pyxoim */}
      <div className="pl-4">
        {`{`} <span className="text-[#79c0ff]">name</span>: <span className="text-[#a5d6ff]">"Pyxoim"</span>, <span className="text-[#79c0ff]">lang</span>: <span className="text-[#a5d6ff]">"Python"</span>, <span className="text-[#79c0ff]">repo</span>: <a href="#" className="text-[#a5d6ff] border-b border-transparent hover:border-[#58a6ff] hover:text-white transition-all">"github/Pyxoim"</a>, <span className="text-[#79c0ff]">desc</span>: <span className="text-[#a5d6ff]">"Text Editor with Xtra functionalities"</span> {`},`}
      </div>
      {/* Java Servlets */}
      <div className="pl-4">
        {`{`} <span className="text-[#79c0ff]">name</span>: <span className="text-[#a5d6ff]">"servlets---admin-dashboard"</span>, <span className="text-[#79c0ff]">lang</span>: <span className="text-[#a5d6ff]">"Java"</span>, <span className="text-[#79c0ff]">repo</span>: <a href="#" className="text-[#a5d6ff] border-b border-transparent hover:border-[#58a6ff] hover:text-white transition-all">"github/webdashboard"</a>, <span className="text-[#79c0ff]">desc</span>: <span className="text-[#a5d6ff]">"JSP/Tomcat embedded dashboard"</span> {`},`}
      </div>
      <div>];</div>
    </>
  ),
  "about.rs": () => (
    <>
      <div><span className="text-[#ff7b72] font-bold">pub trait</span> <span className="text-[#d2a8ff]">Engineer</span> {'{'}</div>
      <div className="pl-4"><span className="text-[#ff7b72] font-bold">fn</span> <span className="text-[#d2a8ff]">get_skills</span>(&amp;self) -&gt; <span className="text-[#58a6ff]">Vec</span>&lt;<span className="text-[#58a6ff]">String</span>&gt;;</div>
      <div>{'}'}</div><br/>
      <div><span className="text-[#ff7b72] font-bold">impl</span> <span className="text-[#d2a8ff]">Engineer</span> <span className="text-[#ff7b72] font-bold">for</span> <span className="text-[#58a6ff]">Jawad</span> {'{'}</div>
      <div className="pl-4"><span className="text-[#8b949e] italic">// Loves Low Level Engineering Building High Performance Systems</span></div>
      <div>{'}'}</div>
    </>
  ),
  "skills.cpp": () => (
    <>
      <div><span className="text-[#ff7b72] font-bold">#include</span> <span className="text-[#a5d6ff]">&lt;vector&gt;</span></div>
      <div><span className="text-[#ff7b72] font-bold">#include</span> <span className="text-[#a5d6ff]">&lt;string&gt;</span></div>
      <br/>
      <div><span className="text-[#ff7b72] font-bold">std</span>::<span className="text-[#58a6ff]">vector</span>&lt;<span className="text-[#ff7b72] font-bold">std</span>::<span className="text-[#58a6ff]">string</span>&gt; <span className="text-[#d2a8ff]">core_competencies</span>() {'{'}</div>
      <div className="pl-4"><span className="text-[#ff7b72] font-bold">return</span> {'{'}</div>
      <div className="pl-8"><span className="text-[#a5d6ff]">"Polyglot Programming (Rust, C, C++, Python, JavaScript, TypeScript)"</span>,</div>
      <div className="pl-8"><span className="text-[#a5d6ff]">"Full-Stack Web (React, Angular, Node, Svelte)"</span>,</div>
      <div className="pl-8"><span className="text-[#a5d6ff]">"Backend Engineering"</span></div>
      <div className="pl-4">{'}'};</div>
      <div>{'}'}</div>
    </>
  ),
  "game.tsx": () => (
    <>
      <MiniGame />
    </>
  ),
  "contact.json": () => (
    <>
      <div>{'{'}</div>
      <div className="pl-4"><span className="text-[#79c0ff]">"github"</span>: <a href="https://github.com/jawadr9899" target="_blank" className="text-[#a5d6ff] hover:underline">"https://github.com/jawadr9899"</a>,</div>
      <div className="pl-4"><span className="text-[#79c0ff]">"linkedin"</span>: <a href="https://www.linkedin.com/in/jawad-rafique-132952388" className="text-[#a5d6ff] hover:underline">"https://www.linkedin.com/in/jawad-rafique-132952388"</a>,</div>
      <div className="pl-4"><span className="text-[#79c0ff]">"email"</span>:<a href="mailto:jawadd.code@gmail.com" className="text-[#a5d6ff] hover:underline">"jawadd.code@gmail.com"</a></div>
      <div>{'}'}</div>
    </>
  )
};

export default function CodeEditor({ activeFile }: { activeFile: string }) {
  if (!activeFile) return <div className="flex-1 bg-transparent flex items-center justify-center text-[#7d8590]"><span className="text-[20px] font-medium opacity-50 tracking-wide">Hmm! What are you trying to do? :{")"}</span></div>;

  const ContentComponent = filesContent[activeFile] || (() => <div className="text-[#8b949e] italic">// File empty or unsupported format</div>);

  return (
    <div className="flex-1 overflow-y-auto bg-transparent text-[14px] p-4 flex z-10 relative custom-scrollbar">
      <div className="w-12 border-r border-white/5 text-[#484f58] text-right pr-4 select-none flex flex-col pt-2 font-mono text-[13px] opacity-70">
        {Array.from({ length: activeFile === "intro.md" ? 25 : 40 }).map((_, i) => (
          <span key={i} className="leading-7">{i + 1}</span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFile}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15, transition: { duration: 0.15 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`flex-1 leading-7 whitespace-pre-wrap pt-2 pl-6 text-[#e6edf3] font-mono tracking-tight overflow-hidden ${activeFile === "intro.md" ? "font-sans" : ""}`}
        >
          <ContentComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
