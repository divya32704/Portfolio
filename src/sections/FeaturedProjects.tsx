import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { featuredProjectsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  if (!featuredProjectsConfig.titleRegular && featuredProjectsConfig.projects.length === 0) return null;

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

      // Project cards — clip-path reveal + scale + parallax + text stagger
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        projectCards.forEach((card, index) => {
          const imageWrap = card.querySelector('.project-image-wrap') as HTMLElement;
          const img = card.querySelector('.project-image') as HTMLElement;
          const content = card.querySelector('.project-content') as HTMLElement;
          const textEls = content?.querySelectorAll('.project-text-item');

          // Alternate clip-path direction: even from left, odd from right
          const fromClip = index % 2 === 0
            ? 'inset(0 100% 0 0)'
            : 'inset(0 0 0 100%)';

          // Image wrapper — clip-path reveal
          if (imageWrap) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 80%',
              onEnter: () => {
                gsap.set(imageWrap, { opacity: 1 });
                gsap.fromTo(
                  imageWrap,
                  { clipPath: fromClip },
                  {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.4,
                    ease: 'power4.inOut',
                  }
                );
                // Inner image scale
                if (img) {
                  gsap.fromTo(
                    img,
                    { scale: 1.35 },
                    { scale: 1.1, duration: 1.8, ease: 'power3.out' }
                  );
                }
              },
              once: true,
            });

            // Parallax on image
            if (img) {
              gsap.fromTo(
                img,
                { yPercent: -5 },
                {
                  yPercent: 5,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: imageWrap,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                  },
                }
              );
            }
          }

          // Content — staggered text reveal
          if (content) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 75%',
              onEnter: () => {
                gsap.set(content, { opacity: 1 });
                if (textEls && textEls.length) {
                  gsap.fromTo(
                    textEls,
                    { y: 50, opacity: 0 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.9,
                      ease: 'power3.out',
                      stagger: 0.1,
                      delay: 0.4,
                    }
                  );
                }
              },
              once: true,
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 opacity-0">
          <div>
            {featuredProjectsConfig.subtitle && (
              <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
                {featuredProjectsConfig.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {featuredProjectsConfig.titleRegular}{' '}
              <span className="font-serif italic font-normal opacity-80" style={{ color: 'var(--neon-lime)' }}>
                {featuredProjectsConfig.titleItalic}
              </span>
            </h2>
          </div>
          {featuredProjectsConfig.viewAllText && (
            <a
              href={featuredProjectsConfig.viewAllHref || '#contact'}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm transition-colors duration-300 group"
              style={{ color: 'var(--text-secondary)' }}
            >
              {featuredProjectsConfig.viewAllText}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          )}
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="space-y-20 md:space-y-32">
          {featuredProjectsConfig.projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image with Viewfinder */}
              <div
                className={`project-image-wrap relative overflow-hidden rounded-lg group cursor-pointer opacity-0 ${
                  index % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-full object-cover will-change-transform"
                    loading="lazy"
                  />
                </div>

                {/* Viewfinder overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 transition-all duration-300 group-hover:w-12 group-hover:h-12"
                    style={{ borderColor: 'rgba(183, 255, 58, 0.5)' }}
                  />
                  <div 
                    className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 transition-all duration-300 group-hover:w-12 group-hover:h-12"
                    style={{ borderColor: 'rgba(183, 255, 58, 0.5)' }}
                  />
                  <div 
                    className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 transition-all duration-300 group-hover:w-12 group-hover:h-12"
                    style={{ borderColor: 'rgba(183, 255, 58, 0.5)' }}
                  />
                  <div 
                    className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 transition-all duration-300 group-hover:w-12 group-hover:h-12"
                    style={{ borderColor: 'rgba(183, 255, 58, 0.5)' }}
                  />
                </div>

                {/* Hover gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(7, 11, 12, 0.7), transparent, transparent)' }}
                />
              </div>

              {/* Content */}
              <div className={`project-content opacity-0 ${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                <div className={`project-text-item flex items-center gap-3 mb-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{project.category}</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.5 }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{project.year}</span>
                </div>
                <h3 className="project-text-item text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="project-text-item text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className={`project-text-item flex flex-wrap gap-2 mb-6 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className={`project-text-item flex items-center gap-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  {project.github && (
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--neon-lime)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--neon-lime)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
