import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Zap, Globe, Search, Eye, Accessibility, type LucideIcon } from 'lucide-react';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Zap,
  Globe,
  Search,
  Eye,
  Accessibility,
  Camera: Eye,
  Diamond: Zap,
  Users: Globe,
  Sparkles: Brain,
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!servicesConfig.titleLine1 && servicesConfig.services.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — slide up
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Service cards — staggered slide up
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
              }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ backgroundColor: 'var(--tech-dark)' }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column - Heading */}
          <div ref={headingRef} className="opacity-0">
            {servicesConfig.subtitle && (
              <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
                {servicesConfig.subtitle}
              </p>
            )}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              {servicesConfig.titleLine1}
              <br />
              <span className="font-serif italic font-normal opacity-80" style={{ color: 'var(--neon-lime)' }}>
                {servicesConfig.titleLine2Italic}
              </span>
            </h2>
            {servicesConfig.description && (
              <p className="mt-6 text-base md:text-lg max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {servicesConfig.description}
              </p>
            )}
          </div>

          {/* Right Column - Services Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicesConfig.services.map((service, index) => {
              const Icon = iconMap[service.iconName] || Brain;
              return (
                <div
                  key={index}
                  className="service-card group tech-card p-6 md:p-8 opacity-0 transition-all duration-500 cursor-pointer"
                >
                  <div className="mb-4">
                    <Icon 
                      className="w-8 h-8 transition-colors duration-300" 
                      strokeWidth={1.5}
                      style={{ color: 'var(--neon-lime)' }}
                    />
                  </div>
                  <h3 
                    className="text-lg md:text-xl font-semibold mb-3 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {service.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--neon-lime)' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div 
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(183, 255, 58, 0.2), transparent)' }}
      />
    </section>
  );
}
