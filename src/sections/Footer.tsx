import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, Github } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Instagram,
  Linkedin,
  Mail,
  Github,
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldRender = !!(
    footerConfig.logoText ||
    footerConfig.email ||
    (footerConfig.navLinks && footerConfig.navLinks.length > 0)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo — scale up + fade
      ScrollTrigger.create({
        trigger: logoRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            logoRef.current,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Content — fade up
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
          );
        },
        once: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  if (!shouldRender) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct a mailto: link using the current form data so users can directly email
    const to = footerConfig.email || '';
    const subject = encodeURIComponent(`Website Inquiry from ${formData.name || 'Website Visitor'}`);
    const bodyLines = [] as string[];
    if (formData.message) bodyLines.push(formData.message);
    if (formData.email) bodyLines.push(`\nReply-to: ${formData.email}`);
    const body = encodeURIComponent(bodyLines.join('\n'));

    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    // Open the user's mail client
    window.location.href = mailto;
    // Keep a small timeout to reset the submitting state in case the mail client doesn't open
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-24 md:pt-32 pb-8 overflow-hidden"
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
        {/* CTA Section */}
        <div ref={logoRef} className="opacity-0 mb-16 md:mb-24 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Let&apos;s build something{' '}
            <span className="font-serif italic" style={{ color: 'var(--neon-lime)' }}>precise.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            I&apos;m open to collaborations in AI systems, accessibility, and performance engineering.
          </p>
        </div>

        {/* Footer Content */}
        <div ref={contentRef} className="opacity-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <p className="font-mono text-xs tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--neon-lime)' }}>
                Send a Message
              </p>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border text-sm focus:outline-none focus:border-[var(--neon-lime)] transition-colors"
                    style={{ 
                      borderColor: 'rgba(244, 247, 246, 0.1)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border text-sm focus:outline-none focus:border-[var(--neon-lime)] transition-colors"
                    style={{ 
                      borderColor: 'rgba(244, 247, 246, 0.1)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border text-sm focus:outline-none focus:border-[var(--neon-lime)] transition-colors resize-none"
                  style={{ 
                    borderColor: 'rgba(244, 247, 246, 0.1)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Opening email...' : 'Email Me'}
                  <Mail className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Contact Info & Links */}
            <div className="space-y-8">
              {/* Contact */}
              <div>
                <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
                  Contact
                </p>
                {footerConfig.email && (
                  <a
                    href={`mailto:${footerConfig.email}`}
                    className="text-lg font-semibold hover:text-[var(--neon-lime)] transition-colors duration-300"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {footerConfig.email}
                  </a>
                )}
                {footerConfig.locationText && (
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {footerConfig.locationText}
                  </p>
                )}
              </div>

              {/* Navigation */}
              {footerConfig.navLinks.length > 0 && (
                <div>
                  <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
                    Navigation
                  </p>
                  <nav className="space-y-2">
                    {footerConfig.navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block hover:text-[var(--neon-lime)] transition-colors duration-300"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Social Links */}
              <div>
                <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--neon-lime)' }}>
                  Connect
                </p>
                {footerConfig.socialLinks.length > 0 && (
                  <div className="flex items-center gap-3">
                    {footerConfig.socialLinks.map((social) => {
                      const Icon = iconMap[social.iconName] || Mail;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{ 
                            backgroundColor: 'rgba(244, 247, 246, 0.05)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Resume section removed per request */}
            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(244, 247, 246, 0.08)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
              {footerConfig.copyright || `\u00A9 ${new Date().getFullYear()} Divya Shah. All rights reserved.`}
            </p>
            <p className="text-sm text-center" style={{ color: 'var(--text-secondary)', opacity: 0.4 }}>
              Built with modern web technologies and AI systems engineering principles.
            </p>
            {footerConfig.bottomLinks.length > 0 && (
              <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                {footerConfig.bottomLinks.map((link) => (
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
          </div>
        </div>
      </div>
    </footer>
  );
}
