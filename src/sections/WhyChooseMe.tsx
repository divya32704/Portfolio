import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyChooseMeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  shouldAnimate: boolean;
}

function Counter({ end, suffix = '', duration = 2, shouldAnimate }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newCount = Math.floor(easeProgress * end);

      if (newCount !== countRef.current) {
        countRef.current = newCount;
        setCount(newCount);
      }

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, shouldAnimate]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLDivElement>(null);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);

  if (!whyChooseMeConfig.titleRegular && whyChooseMeConfig.stats.length === 0 && whyChooseMeConfig.featureCards.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header — slide up
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

      // Feature cards with images — clip-path reveal + inner scale
      const imageCards = cardsRef.current?.querySelectorAll('.feature-card-image');
      if (imageCards) {
        imageCards.forEach((card, i) => {
          const img = card.querySelector('img');

          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.set(card, { opacity: 1 });
              gsap.fromTo(
                card,
                { clipPath: 'inset(100% 0 0 0)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.2,
                  ease: 'power4.inOut',
                  delay: i * 0.15,
                }
              );
              if (img) {
                gsap.fromTo(
                  img,
                  { scale: 1.35 },
                  { scale: 1.1, duration: 1.6, ease: 'power3.out', delay: i * 0.15 }
                );
              }
            },
            once: true,
          });

          // Parallax on card images
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
                },
              }
            );
          }
        });
      }

      // Stats card — slide up + fade
      const statsCard = cardsRef.current?.querySelector('.feature-card-stats');
      if (statsCard) {
        ScrollTrigger.create({
          trigger: statsCard,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              statsCard,
              { y: 80, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
            );
          },
          once: true,
        });
      }

      // Stats counter trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 75%',
        onEnter: () => {
          setShouldAnimateStats(true);
        },
        once: true,
      });

      // Wide landscape — clip-path expand from center + inner scale + parallax
      const wideWrap = wideRef.current;
      const wideImg = wideWrap?.querySelector('img');
      if (wideWrap) {
        ScrollTrigger.create({
          trigger: wideWrap,
          start: 'top 82%',
          onEnter: () => {
            gsap.set(wideWrap, { opacity: 1 });
            gsap.fromTo(
              wideWrap,
              { clipPath: 'inset(15% 5% 15% 5%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.4,
                ease: 'power4.inOut',
              }
            );
            if (wideImg) {
              gsap.fromTo(
                wideImg,
                { scale: 1.25 },
                { scale: 1.08, duration: 1.8, ease: 'power3.out' }
              );
            }
          },
          once: true,
        });

        // Wide image parallax
        if (wideImg) {
          gsap.fromTo(
            wideImg,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: wideWrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      }

      // Text overlay on wide image — fade up
      const wideText = wideWrap?.querySelector('.wide-text-overlay');
      if (wideText) {
        ScrollTrigger.create({
          trigger: wideWrap,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(
              wideText,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.6 }
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
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          {whyChooseMeConfig.subtitle && (
            <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
              {whyChooseMeConfig.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {whyChooseMeConfig.titleRegular}{' '}
            <span className="font-serif italic font-normal" style={{ color: 'var(--neon-lime)' }}>
              {whyChooseMeConfig.titleItalic}
            </span>
          </h2>
        </div>

        {/* Three Cards Row */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Feature Cards with Images */}
          {whyChooseMeConfig.featureCards.map((card, index) => (
            <div key={index} className="feature-card-image opacity-0 group">
              <div 
                className="relative aspect-[3/4] rounded-lg overflow-hidden"
                style={{ backgroundColor: 'var(--tech-mid)' }}
              >
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover will-change-transform"
                  loading="lazy"
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(7, 11, 12, 0.9), transparent, transparent)' }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                    {card.title}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Stats Card */}
          {whyChooseMeConfig.stats.length > 0 && (
            <div
              ref={statsRef}
              className="feature-card-stats opacity-0 rounded-lg p-8 md:p-10 flex flex-col justify-between"
              style={{ backgroundColor: 'var(--tech-mid)', border: '1px solid rgba(244, 247, 246, 0.08)' }}
            >
              <div>
                {whyChooseMeConfig.statsLabel && (
                  <p className="font-mono text-xs tracking-[0.15em] uppercase mb-8" style={{ color: 'var(--neon-lime)' }}>
                    {whyChooseMeConfig.statsLabel}
                  </p>
                )}
                <div className="space-y-8">
                  {whyChooseMeConfig.stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="pb-6 last:pb-0"
                      style={{ borderBottom: index < whyChooseMeConfig.stats.length - 1 ? '1px solid rgba(244, 247, 246, 0.1)' : 'none' }}
                    >
                      <p className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        <Counter
                          end={stat.value}
                          suffix={stat.suffix}
                          shouldAnimate={shouldAnimateStats}
                        />
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wide Landscape Image */}
        {whyChooseMeConfig.wideImage && (
          <div ref={wideRef} className="mt-16 md:mt-24 relative rounded-lg overflow-hidden group opacity-0">
            <div className="aspect-[21/9] md:aspect-[3/1] overflow-hidden">
              <img
                src={whyChooseMeConfig.wideImage}
                alt={whyChooseMeConfig.wideImageAlt}
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />
            </div>
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(7, 11, 12, 0.7), transparent, transparent)' }}
            />
            {(whyChooseMeConfig.wideTitle || whyChooseMeConfig.wideDescription) && (
              <div className="wide-text-overlay absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md opacity-0">
                {whyChooseMeConfig.wideTitle && (
                  <p className="font-bold text-2xl md:text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
                    {whyChooseMeConfig.wideTitle}
                  </p>
                )}
                {whyChooseMeConfig.wideDescription && (
                  <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                    {whyChooseMeConfig.wideDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
