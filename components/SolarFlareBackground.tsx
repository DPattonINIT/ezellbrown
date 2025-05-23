"use client";

import { useEffect, useRef } from "react";

const SolarFlareBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      if (!ctx) return;

      const time = Date.now() * 0.001;

      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 50,
        canvas.height / 2 + Math.cos(time) * 50,
        100,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );

      gradient.addColorStop(0, "rgba(255, 255, 0, 0.15)");
      gradient.addColorStop(0.5, "rgba(255, 140, 0, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default SolarFlareBackground;
