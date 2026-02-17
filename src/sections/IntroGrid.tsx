import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { introGridConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

// Per-image animation config: unique direction, rotation, parallax depth, stagger order
const imageAnimConfigs = [
  // img0: tall left — sweeps in from the left
  { clipFrom: 'inset(0% 100% 0% 0%)', rotation: -2, parallax: [-6, 6], delay: 0 },
  // img1: top center — drops in from above
  { clipFrom: 'inset(0% 0% 100% 0%)', rotation: 1.5, parallax: [-3, 3], delay: 0.12 },
  // img2: top right — slides in from the right
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.2, parallax: [-5, 5], delay: 0.08 },
  // img3: tall center — rises from below
  { clipFrom: 'inset(100% 0% 0% 0%)', rotation: 1, parallax: [-4, 4], delay: 0.22 },
  // img4: bottom right — slides in from the right
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.5, parallax: [-7, 7], delay: 0.18 },
];

export function IntroGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusAreasRef = useRef<HTMLDivElement>(null);

  const hasContent = Boolean(
    introGridConfig.titleLine1 || introGridConfig.titleLine2 || introGridConfig.portfolioImages.length > 0
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Title: mask-reveal per line ──
      const titleWrap = titleLine1Ref.current?.parentElement?.parentElement;
      if (titleWrap) {
        ScrollTrigger.create({
          trigger: titleWrap,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(
              [titleLine1Ref.current, titleLine2Ref.current],
              {
                yPercent: 0,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.13,
              }
            );
          },
          once: true,
        });
      }

      // ── Description: fade up ──
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            textRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.35 }
          );
        },
        once: true,
      });

      // ── Focus areas: stagger reveal ──
      if (focusAreasRef.current) {
        const items = focusAreasRef.current.querySelectorAll('.focus-item');
        ScrollTrigger.create({
          trigger: focusAreasRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              items,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }

      // ── Grid images: per-image directional reveal + rotation + scale + parallax ──
      const gridItems = gridRef.current?.querySelectorAll('.grid-item');
      if (gridItems) {
        gridItems.forEach((item, i) => {
          const img = item.querySelector('img');
          const cfg = imageAnimConfigs[i];
          if (!cfg) return;

          // One-shot reveal on scroll-enter
          ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
              // Unhide (Tailwind opacity-0 used as pre-GSAP fallback)
              gsap.set(item, { opacity: 1 });

              // Clip-path directional reveal
              gsap.fromTo(
                item,
                { clipPath: cfg.clipFrom },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.3,
                  ease: 'power4.inOut',
                  delay: cfg.delay,
                }
              );

              if (img) {
                // Scale zoom-out (Ken Burns)
                gsap.fromTo(
                  img,
                  { scale: 1.45, rotate: cfg.rotation },
                  {
                    scale: 1.12,
                    rotate: 0,
                    duration: 1.8,
                    ease: 'power3.out',
                    delay: cfg.delay,
                  }
                );
              }
            },
            once: true,
          });

          // Continuous parallax (varied depth per image → layered 3D feel)
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: cfg.parallax[0] },
              {
                yPercent: cfg.parallax[1],
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!hasContent) return null;

  const focusAreas = [
    "AI systems architecture",
    "Model optimization and deployment",
    "Multilingual speech and vision models",
    "Retrieval-augmented generation (RAG)",
    "Accessibility technology",
    "Computer vision for biomechanical analysis",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ backgroundColor: 'var(--tech-mid)' }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Title with split-line mask reveal ── */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div className="mb-6">
            <div className="overflow-hidden">
              <div
                ref={titleLine1Ref}
                className="translate-y-[110%]"
              >
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {introGridConfig.titleLine1}
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                ref={titleLine2Ref}
                className="translate-y-[110%]"
              >
                <span className="block text-3xl md:text-4xl lg:text-5xl font-serif italic font-normal opacity-70" style={{ color: 'var(--neon-lime)' }}>
                  {introGridConfig.titleLine2}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              About me
            </h2>
          </div>

          <p
            ref={textRef}
            className="text-base md:text-lg leading-relaxed opacity-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            {introGridConfig.description}
          </p>
        </div>

        {/* ── Core Focus Areas ── */}
        <div ref={focusAreasRef} className="mb-16 md:mb-24">
          <h3 className="font-mono text-xs tracking-[0.15em] uppercase mb-8 text-center" style={{ color: 'var(--neon-lime)' }}>
            Core Focus Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="focus-item tech-card p-5 rounded-lg opacity-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--neon-lime)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {area}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Masonry Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]"
        >
          {introGridConfig.portfolioImages.map((image, index) => (
            <div
              key={index}
              className={`grid-item relative overflow-hidden rounded-lg group cursor-pointer opacity-0 ${
                index === 0 ? 'md:col-span-1 md:row-span-2' : ''
              } ${index === 3 ? 'row-span-2' : ''}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

              {/* Viewfinder corners on hover */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-lime)]/0 group-hover:border-[var(--neon-lime)]/80 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-lime)]/0 group-hover:border-[var(--neon-lime)]/80 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--neon-lime)]/0 group-hover:border-[var(--neon-lime)]/80 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--neon-lime)]/0 group-hover:border-[var(--neon-lime)]/80 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Floating accent text */}
        {introGridConfig.accentText && (
          <div className="mt-12 md:mt-16 flex justify-end">
            <p className="text-sm font-mono tracking-wider uppercase" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
              {introGridConfig.accentText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
