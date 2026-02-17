import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqConfig } from '../config';
import { Trophy, Award, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievementIcons: Record<string, React.ElementType> = {
  '1': Trophy,
  '2': Award,
  '3': Users,
};

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  if (!faqConfig.titleRegular && faqConfig.faqs.length === 0) return null;

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

      // Accordion items — staggered slide up
      ScrollTrigger.create({
        trigger: accordionRef.current,
        start: 'top 80%',
        onEnter: () => {
          const items = accordionRef.current?.querySelectorAll('[data-faq-item]');
          if (items) {
            gsap.fromTo(
              items,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.08,
              }
            );
          }
        },
        once: true,
      });

      // CTA — fade up
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          {faqConfig.subtitle && (
            <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
              {faqConfig.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {faqConfig.titleRegular}{' '}
            <span className="font-serif italic font-normal opacity-80" style={{ color: 'var(--neon-lime)' }}>
              {faqConfig.titleItalic}
            </span>
          </h2>
        </div>

        {/* Achievements Accordion */}
        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqConfig.faqs.map((faq) => {
              const Icon = achievementIcons[faq.id] || Trophy;
              return (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  data-faq-item
                  className="opacity-0 border-0 rounded-lg overflow-hidden"
                  style={{ 
                    backgroundColor: 'rgba(15, 20, 22, 0.5)',
                    border: '1px solid rgba(244, 247, 246, 0.08)'
                  }}
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline transition-colors duration-300 group">
                    <div className="flex items-center gap-4">
                      <Icon 
                        className="w-6 h-6 flex-shrink-0" 
                        strokeWidth={1.5}
                        style={{ color: 'var(--neon-lime)' }}
                      />
                      <span className="text-left font-medium text-base md:text-lg pr-4" style={{ color: 'var(--text-primary)' }}>
                        {faq.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <p className="text-sm md:text-base leading-relaxed pl-10" style={{ color: 'var(--text-secondary)' }}>
                      {faq.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* CTA */}
        {(faqConfig.ctaText || faqConfig.ctaButtonText) && (
          <div ref={ctaRef} className="mt-16 text-center opacity-0">
            {faqConfig.ctaText && (
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                {faqConfig.ctaText}
              </p>
            )}
            {faqConfig.ctaButtonText && (
              <a
                href={faqConfig.ctaHref || '#contact'}
                className="btn-neon inline-flex items-center gap-2"
              >
                {faqConfig.ctaButtonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
