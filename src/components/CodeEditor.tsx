import { useState, useRef, useEffect, useCallback, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BeautyWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;

    const languages = ["Rust", "JS", "TS", "C++", "Phyton", "Java", "⚛️", "🦀", "🐍", "☕"];
    
    // Structure for floating icons emitted from excited particles
    const floatingIcons: { x: number, y: number, text: string, life: number, maxLife: number, vx: number, vy: number, color: string }[] = [];

    // Generate static particle properties so they persist across frames
    const particles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      phase: Math.random() * Math.PI * 2,
      speedX: 0.2 + Math.random() * 0.5,
      frequency: 0.01 + Math.random() * 0.02,
      amplitude: 20 + Math.random() * 50,
      colorIndex: Math.floor(Math.random() * 5),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.05;

      const colors = ['#f85149', '#58a6ff', '#3fb950', '#d2a8ff', '#a5d6ff'];

      // Draw waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        for (let x = 0; x < canvas.width; x += 5) {
          const distanceToMouse = Math.abs(x - mousePos.x);
          const mouseInfluence = Math.max(0, 100 - distanceToMouse) / 100;
          
          let y = canvas.height / 2;
          
          if (i === 0) y += Math.sin(x * 0.02 + time) * 30 * (1 + mouseInfluence);
          else if (i === 1) y += Math.cos(x * 0.015 - time) * 40 * (1 + mouseInfluence * 1.5);
          else if (i === 2) y += Math.tan((x * 0.01 + time) % Math.PI) * 10 * (1 + mouseInfluence);
          else if (i === 3) y += Math.sin(x * 0.03 + time * 2) * Math.cos(x * 0.02) * 50 * (1 + mouseInfluence * 2);
          else y += Math.sin(x * 0.01 + time) * 60 * (1 + mouseInfluence);
          
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw floating Schrodinger particles
      particles.forEach((p) => {
        // Base probability wave motion
        p.baseX -= p.speedX;
        if (p.baseX < -10) p.baseX = canvas.width + 10;
        
        // Probability amplitude offset
        const waveYOffset = Math.sin(p.baseX * p.frequency + time + p.phase) * p.amplitude;
        
        let drawX = p.baseX;
        let drawY = canvas.height / 2 + waveYOffset;

        // Observation effect / Quantum collapse when mouse is near
        const dx = drawX - mousePos.x;
        const dy = drawY - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let radius = 1.5 + Math.sin(time * 3 + p.phase) * 0.5; // Normal oscillation
        let alpha = 0.5;

        if (dist < 150) {
            const collapseFactor = (150 - dist) / 150; // closer = stronger pull
            // Particles get pulled tightly towards the cursor (observation collapse)
            drawX -= dx * collapseFactor * 0.8;
            drawY -= dy * collapseFactor * 0.8;
            
            // Excite particle state
            radius = 2 + collapseFactor * 3;
            alpha = 0.5 + collapseFactor * 0.5;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        
        // Use parsed colors or hex to add opacity
        const baseColor = colors[p.colorIndex];
        // simple hex to rgba matching
        let rgb = '255,255,255';
        if (baseColor === '#f85149') rgb = '248,81,73';
        if (baseColor === '#58a6ff') rgb = '88,166,255';
        if (baseColor === '#3fb950') rgb = '63,185,80';
        if (baseColor === '#d2a8ff') rgb = '210,168,255';
        if (baseColor === '#a5d6ff') rgb = '165,214,255';
        
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = dist < 150 ? 10 : 3;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Particles near the cursor "spark" and release an icon
        if (dist < 80 && Math.random() < 0.03 && floatingIcons.length < 40) {
           floatingIcons.push({
             x: drawX,
             y: drawY,
             text: languages[Math.floor(Math.random() * languages.length)],
             color: baseColor,
             life: 80,
             maxLife: 80,
             vx: (Math.random() - 0.5) * 1.5,
             vy: (Math.random() - 1) * 2 - 0.5,
           });
        }
      });

      // Draw floating icons
      for (let i = floatingIcons.length - 1; i >= 0; i--) {
        const icon = floatingIcons[i];
        icon.x += icon.vx;
        icon.y += icon.vy;
        icon.life -= 1;
        
        if (icon.life <= 0) {
          floatingIcons.splice(i, 1);
          continue;
        }

        const iconAlpha = icon.life / icon.maxLife;
        ctx.font = "bold 13px monospace";
        ctx.fillStyle = icon.color;
        ctx.globalAlpha = iconAlpha;
        ctx.fillText(icon.text, icon.x, icon.y);
      }
      ctx.globalAlpha = 1.0; // Reset globalAlpha

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <div className="w-full flex-col h-full flex items-center justify-center pt-8">
      <p className="text-[#8b949e] mb-4 italic">// Interactive R Data Visualizations ~ hover across quantum fields</p>
      <canvas 
        ref={canvasRef}
        width={600} 
        height={400} 
        className="bg-transparent cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })} // Move out of range when left
      />
    </div>
  );
};

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
        Hi, I'm <span className="text-[#58a6ff]">Jawad</span> 
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
  "projects.ts": () => {
    const projectsList = [
      { name: "teyrs", lang: "Rust", repo: "https://github.com/jawadr9899/teyrs", repoLabel: "github/teyrs", desc: "Terminal-based file explorer" },
      { name: "Rustle", lang: "Rust", repo: "https://github.com/jawadr9899/Rustle", repoLabel: "github/Rustle", desc: "CLI tool for saving notes" },
      { name: "ascii-c", lang: "C", repo: "https://github.com/jawadr9899/ascii-c", repoLabel: "github/ascii-c", desc: "Convert images into ASCII art" },
      { name: "Pyxoim", lang: "Python", repo: "https://github.com/jawadr9899/Pyxoim", repoLabel: "github/Pyxoim", desc: "Text Editor with Xtra functionalities" },
      { name: "servlets-admin-dashboard", lang: "Java", repo: "https://github.com/jawadr9899/webdashboard", repoLabel: "github/webdashboard", desc: "JSP/Tomcat embedded dashboard" },
      { name: "Snayke", lang: "C++", repo: "https://github.com/jawadr9899/Snayke", repoLabel: "github/Snayke", desc: "A simple snake game written in C++" },
      { name: "URL-Shortener", lang: "Unknown", repo: "https://github.com/jawadr9899/URL-Shortener", repoLabel: "github/URL-Shortener", desc: "URL Shortener" },
      { name: "Data-Structures", lang: "Unknown", repo: "https://github.com/jawadr9899/Data-Structures", repoLabel: "github/Data-Structures", desc: "Data Structures & Algorithms" },
      { name: "entry-test-system", lang: "Unknown", repo: "https://github.com/jawadr9899/entry-test-system", repoLabel: "github/entry-test-system", desc: "Entry test system" },
      { name: "teacher-feedback-system", lang: "Unknown", repo: "https://github.com/jawadr9899/teacher-feedback-system", repoLabel: "github/teacher-feedback", desc: "Teacher Feedback System" },
      { name: "faculty-hiring-system", lang: "Unknown", repo: "https://github.com/jawadr9899/faculty-hiring-system", repoLabel: "github/faculty-hiring", desc: "Faculty Hiring System" }
    ];

    return (
      <>
        <div><span className="text-[#ff7b72] font-bold">const</span> <span className="text-[#79c0ff]">projects</span>: <span className="text-[#58a6ff]">Project</span>[] = [</div>
        {projectsList.map((p, i) => (
          <div key={i} className="pl-4">
            {`{`} <span className="text-[#79c0ff]">name</span>: <span className="text-[#a5d6ff]">"{p.name}"</span>, <span className="text-[#79c0ff]">lang</span>: <span className="text-[#a5d6ff]">"{p.lang}"</span>, <span className="text-[#79c0ff]">repo</span>: <a href={p.repo} target="_blank" className="text-[#a5d6ff] underline underline-offset-4 decoration-[#a5d6ff]/40 hover:decoration-[#a5d6ff] hover:text-white transition-all">"{p.repoLabel}"</a>, <span className="text-[#79c0ff]">desc</span>: <span className="text-[#a5d6ff]">"{p.desc}"</span> {`},`}
          </div>
        ))}
        <div>];</div>
      </>
    );
  },
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
  "beauty.r": () => (
    <>
      <BeautyWaves />
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
        {Array.from({ length: activeFile === "intro.md" ? 25 : activeFile === "projects.ts" ? 60 : 40 }).map((_, i) => (
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
          className={`flex-1 leading-7 whitespace-pre-wrap pt-2 pl-6 pb-20 text-[#e6edf3] font-mono tracking-tight ${activeFile === "intro.md" ? "font-sans" : ""}`}
        >
          <ContentComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
