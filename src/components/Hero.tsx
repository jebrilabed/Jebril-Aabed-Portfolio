import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden neon-grid pt-20 pb-32 md:pb-20"
    >
      {/* Radial Glow Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-left md:text-center">
        <div
          className="inline-block mb-6 border-l-2 border-secondary pl-4 py-1 animate-fade-in-up"
        >
          <span className="font-label text-secondary tracking-[0.2em] uppercase text-sm">
            Transmitting Data...
          </span>
        </div>

        <h1
          className="font-headline text-5xl md:text-8xl font-extrabold tracking-[-0.04em] mb-4 text-foreground max-w-5xl mx-auto leading-tight animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Hello, I am{" "}
          <span className="text-primary glow-text animate-typing inline-flex align-bottom h-[1.1em] overflow-hidden whitespace-nowrap border-r-4 border-primary">
            {portfolioData.name}
          </span>
        </h1>

        <p
          className="font-body text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: "500ms", animationFillMode: "both" }}
        >
          Building <span className="text-secondary italic">fast, scalable, and AI-integrated</span> web applications using Next.js, React, and modern technologies.
        </p>

        <div
          className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up"
          style={{ animationDelay: "800ms", animationFillMode: "both" }}
        >
          <a
            href="#projects"
            className="w-full md:w-auto px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-label font-bold tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(196,192,255,0.4)] transition-all duration-300 active:scale-95 text-center"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="w-full md:w-auto px-10 py-5 bg-transparent border border-outline-variant text-foreground font-label font-bold tracking-widest uppercase rounded-lg hover:bg-surface-high hover:border-secondary transition-all duration-300 active:scale-95 text-center"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce-y"
      >
        <span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
