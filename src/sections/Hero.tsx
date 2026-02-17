import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { ArrowRight, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Ensure hooks are called unconditionally; compute presence of any hero content
  const hasContent = Boolean(
    heroConfig.backgroundText || heroConfig.heroImage || (heroConfig.navLinks && heroConfig.navLinks.length > 0)
  );

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      // Background word entrance
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        0
      );
      
      // Portrait entrance
      tl.fromTo(
        modelRef.current,
        { opacity: 0, x: 60, scale: 1.03 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9 },
        0.1
      );
      
      // Caption block entrance with stagger
      const captionItems = captionRef.current?.querySelectorAll('.caption-item');
      if (captionItems && captionItems.length > 0) {
        tl.fromTo(
          captionItems,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          0.3
        );
      }
      
      // Nav entrance
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(textRef.current, { opacity: 1, x: 0 });
            gsap.set(modelRef.current, { opacity: 1, x: 0, scale: 1 });
            gsap.set(captionRef.current, { opacity: 1, x: 0 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        modelRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-22vw', scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        captionRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Only short-circuit render after hooks have been registered
  if (!hasContent) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10"
      // Make the hero section pitch black to match the portrait background
      style={{ backgroundColor: '#000' }}
    >
      {/* Noise texture overlay */}
      {/* Noise texture overlay - disabled to keep hero area pure black */}
      <div className="absolute inset-0 opacity-0 pointer-events-none z-[1]" />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between"
      >
        <div className="font-mono font-bold text-lg tracking-wider" style={{ color: 'var(--text-primary)' }}>
          {heroConfig.brandName}
        </div>
        {heroConfig.navLinks.length > 0 && (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {heroConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[var(--neon-lime)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        <button className="md:hidden" style={{ color: 'var(--text-primary)' }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Layer 1: Big Background Text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-[5] will-change-transform pointer-events-none"
      >
        <h1
          className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-extralight tracking-tighter leading-none select-none whitespace-nowrap"
          style={{ color: 'rgba(244, 247, 246, 0.08)' }}
        >
          {heroConfig.backgroundText}
        </h1>
      </div>

      {/* Layer 2: Hero Portrait (Cutout) */}
      {heroConfig.heroImage && (
        <div
          ref={modelRef}
          className="absolute inset-0 flex items-center justify-center z-[15] will-change-transform"
        >
          {/* Make the portrait fill the viewport height and center vertically.
              Use h-screen on the wrapper and set the image to h-full w-auto so
              the photo scales by height (less side-cropping for tall portraits). */}
          <div
            className="relative h-screen w-[70vw] md:w-[45vw] lg:w-[35vw] max-w-[700px] flex items-center justify-center"
            // Make the portrait wrapper pure black so the image's black edge
            // blends seamlessly with the page. Remove blend modes to preserve
            // natural colors.
            style={{ backgroundColor: '#000' }}
          >
            <img
              src={heroConfig.heroImage}
              alt={heroConfig.heroImageAlt}
              className="w-auto h-full object-contain"
              loading="eager"
              // ensure normal blending so colors render correctly against black
              style={{ mixBlendMode: 'normal' }}
            />
          </div>
        </div>
      )}

      {/* Layer 3: Caption Block (Bottom Right) */}
      <div
        ref={captionRef}
        className="absolute bottom-[10vh] right-[6vw] z-[25] w-[90vw] md:w-[40vw] lg:w-[34vw]"
      >
        <div className="space-y-4">
          {/* Label */}
          <p className="caption-item font-mono text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--neon-lime)' }}>
            {heroConfig.headline}
          </p>
          
          {/* Headline */}
          <h2 className="caption-item text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {heroConfig.subheadline.split('that')[0]}
            <span style={{ color: 'var(--neon-lime)' }}>that bridge</span>
            {heroConfig.subheadline.split('that bridge')[1]}
          </h2>
          
          {/* CTA Buttons */}
          <div className="caption-item flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="btn-neon inline-flex items-center gap-2 text-sm font-semibold"
            >
              {heroConfig.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="btn-outline inline-flex items-center gap-2 text-sm"
            >
              <FileText className="w-4 h-4" />
              {heroConfig.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--neon-lime)] to-transparent" />
      </div>
    </section>
  );
}
