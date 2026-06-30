"use client";
import { cn } from "@/lib/utils";
import { Github, ExternalLink } from "lucide-react";

export interface CardDemoProps {
  title?: string;
  description?: string;
  coverImage?: string;
  hoverGif?: string;
  tech?: string[];
  github?: string;
  live?: string;
  className?: string;
}

export default function CardDemo({
  title = "Background Overlays",
  description = "This card is for some special elements, like displaying background gifs on hover only.",
  coverImage = "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  hoverGif = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif",
  tech = [],
  github,
  live,
  className,
}: CardDemoProps) {
  return (
    <div className={cn("w-full h-full flex", className)}>
      <div
        style={{
          "--cover-image": `url(${coverImage})`,
          "--hover-gif": `url(${hoverGif})`,
        } as React.CSSProperties}
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-[28rem] rounded-xl shadow-xl mx-auto flex flex-col justify-between p-6 border border-transparent dark:border-neutral-800",
          "bg-[image:var(--cover-image)] bg-cover bg-top",
          // Preload hover image by setting it in a pseudo-element
          "before:bg-[image:var(--hover-gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
          "hover:bg-[image:var(--hover-gif)]",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black/60 hover:after:z-10",
          "transition-all duration-500"
        )}
      >
        {/* Strong gradient overlay between the image/gif and the text content */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-300"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.95) 100%)"
          }}
        />

        {/* Link Icons - Hidden by default, fade in on hover */}
        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-20">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 transition-all border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 transition-all border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        {/* Text and Tech Stack - Styled beautifully */}
        <div className="text relative z-20 flex flex-col gap-3 mt-auto">
          <h1 
            className="font-bold text-xl md:text-2xl text-gray-50 transition-transform duration-300 group-hover:-translate-y-1"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)" }}
          >
            {title}
          </h1>
          <p 
            className="font-normal text-sm text-gray-200 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}
          >
            {description}
          </p>

          {/* Tech stack badges */}
          {tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 backdrop-blur-[10px] text-white border border-white/15 shadow-sm transition-all duration-300 group-hover:bg-white/20"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
