import { useEffect, useRef } from "react";

export default function BackgroundMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const keywords = ["impl", "fn", "public", "std::", "async", "await", "mut", "const", "trait"];
    const columns = Math.floor(canvas.width / 120);
    // Initialize drops randomly on the screen to avoid empty start
    const drops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * (canvas.height / 20)));

    const draw = () => {
      ctx.fillStyle = "rgba(13, 17, 23, 0.1)"; // Fading trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(88, 166, 255, 0.15)";
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = keywords[Math.floor(Math.random() * keywords.length)];
        ctx.fillText(text, i * 120, drops[i] * 20);
        
        // Float upwards
        if (drops[i] * 20 < 0 && Math.random() > 0.95) {
          drops[i] = canvas.height / 20; 
        }
        drops[i]--;
      }
    };
    const interval = setInterval(draw, 100);
    
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);
    
    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50" />;
}
