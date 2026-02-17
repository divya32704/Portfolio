import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Server, Brain, Container, Terminal } from 'lucide-react';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Frontend: Code,
  Backend: Server,
  'AI & ML': Brain,
  DevOps: Container,
  Languages: Terminal,
};

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!testimonialsConfig.titleRegular && testimonialsConfig.testimonials.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — slide up
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Skill cards — staggered reveal
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
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
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--tech-dark)' }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div ref={headerRef} className="text-center opacity-0">
          {testimonialsConfig.subtitle && (
            <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
              {testimonialsConfig.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {testimonialsConfig.titleRegular}{' '}
            <span className="font-serif italic font-normal opacity-80" style={{ color: 'var(--neon-lime)' }}>
              {testimonialsConfig.titleItalic}
            </span>
          </h2>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsConfig.testimonials.map((skill) => {
            const Icon = iconMap[skill.name] || Code;
            const skillsList = skill.quote.split(', ');
            
            return (
              <div
                key={skill.id}
                className="skill-card tech-card p-8 rounded-lg opacity-0 group hover:border-[var(--neon-lime)]/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon 
                    className="w-10 h-10 transition-colors duration-300" 
                    strokeWidth={1.5}
                    style={{ color: 'var(--neon-lime)' }}
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {skill.name}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                  {skill.role}
                </p>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((s, index) => (
                    <span key={index} className="tech-tag">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative element */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div 
          className="h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(183, 255, 58, 0.2), transparent)' }}
        />
      </div>
    </section>
  );
}
