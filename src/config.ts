// Site Configuration
export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Divya Shah | Full Stack Software Developer & AI Systems Engineer",
  siteDescription: "Portfolio of Divya Shah - Full Stack Software Developer and AI Systems Engineer specializing in intelligent systems, computer vision, and scalable architecture.",
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const heroConfig: HeroConfig = {
  // Clear background text so large watermark behind the portrait is removed
  // Add name to appear behind the portrait in the hero section
  // Use non-breaking spaces so the gap between the two words is preserved
     // Use sixteen non-breaking spaces for the requested gap
     backgroundText: "Divya\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Shah",
  heroImage: "/hero-divya.jpg",
  heroImageAlt: "Divya Shah - Full Stack Software Developer",
  overlayText: "Building intelligent systems",
  brandName: "Divya Shah",
  navLinks: [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  headline: "Full Stack Software Developer",
  subheadline: "Building intelligent systems that bridge research and deployment.",
  ctaPrimary: "View Projects",
  ctaSecondary: "Resume",
};

// About Section (Using IntroGrid structure)
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "AI Systems",
  titleLine2: "Engineer",
  description: "I am a Computer Science undergraduate with a Mathematics minor passionate about designing AI systems that solve real-world access and performance challenges. My work focuses on deploying machine learning models into production-ready applications, optimizing model efficiency, and building scalable full-stack architectures.",
  portfolioImages: [
    { src: "/nexus-cup-1.jpg", alt: "Nexus Technology Cup - 3rd Place Winners with $5,000 check" },
    { src: "/nexus-cup-2.jpg", alt: "Team Dristi with judges at Nexus Technology Cup" },
    { src: "/nexus-cup-3.jpg", alt: "Receiving award at Nexus Technology Cup ceremony" },
    { src: "/nexus-cup-4.jpg", alt: "Divya at DevDays event" },
    { src: "/nexus-cup-5.jpg", alt: "Divya presenting Dristi project" },
  ],
  accentText: "Core Focus Areas - 2024-2026",
};

// Services Section (Core Focus Areas)
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "What I Do",
  titleLine1: "Core Focus",
  titleLine2Italic: "Areas",
  description: "I specialize in multimodal AI systems including vision-language models, speech recognition pipelines, and retrieval-augmented generation systems. My projects combine research-level ML experimentation with practical, user-centered interfaces.",
  services: [
    {
      iconName: "Brain",
      title: "AI Systems Architecture",
      description: "Designing and deploying end-to-end ML pipelines from training to production.",
    },
    {
      iconName: "Zap",
      title: "Model Optimization",
      description: "Quantization, pruning, and distillation for efficient deployment.",
    },
    {
      iconName: "Globe",
      title: "Multilingual AI",
      description: "Speech recognition and vision models for global accessibility.",
    },
    {
      iconName: "Search",
      title: "RAG Systems",
      description: "Retrieval-augmented generation for enterprise knowledge bases.",
    },
    {
      iconName: "Eye",
      title: "Computer Vision",
      description: "Pose estimation, scene understanding, and biomechanical analysis.",
    },
    {
      iconName: "Accessibility",
      title: "Accessibility Tech",
      description: "AI-powered assistive technologies for inclusive design.",
    },
  ],
};

// Why Choose Me Section (Stats & Experience)
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "Experience",
  titleRegular: "Software",
  titleItalic: "Development Intern",
  statsLabel: "By The Numbers",
  stats: [
    { value: 30, suffix: "%", label: "Page Load Improvement" },
    { value: 20, suffix: "%", label: "Latency Reduction" },
    { value: 6, suffix: "+", label: "Projects Shipped" },
    { value: 70, suffix: "+", label: "Teams Competed Against" },
  ],
  featureCards: [
    {
      image: "/nexus-cup-1.jpg",
      imageAlt: "Divya at Nexus Technology Cup",
      title: "Nexus Technology Cup",
      description: "3rd Place winner statewide among 70+ teams. Presented Dristi - an AI-powered accessibility system with real-world deployment focus.",
    },
    {
      image: "/nexus-cup-2.jpg",
      imageAlt: "Team Dristi receiving award",
      title: "Team Dristi",
      description: "Award-winning team showcasing AI accessibility technology at the statewide competition.",
    },
  ],
  // Removed wide landscape showcase (project spotlight) from experience
  wideImage: "",
  wideImageAlt: "",
  wideTitle: "",
  wideDescription: "",
};

// Featured Projects Section
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface FeaturedProjectsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  viewAllText: string;
  viewAllHref: string;
  viewProjectText: string;
  projects: Project[];
}

export const featuredProjectsConfig: FeaturedProjectsConfig = {
  subtitle: "Featured Work",
  titleRegular: "Selected",
  titleItalic: "Projects",
  viewAllText: "View All Projects",
  viewAllHref: "#projects",
  viewProjectText: "View Project",
  projects: [
    {
      id: 1,
      title: "Dristi - AI Accessibility Assistant",
      category: "AI / Accessibility",
      year: "2024",
      image: "/project-dristi.png",
      description: "AI-powered voice-controlled assistant for visually impaired users. Captures real-time webcam input and generates scene descriptions using vision-language models with multilingual support.",
      tags: ["Flask", "React", "Whisper", "Qwen-VL", "OCR"],
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "Athlyze - Athlete Performance Analysis",
      category: "Computer Vision",
      year: "2024",
      image: "/project-athlyze.png",
      description: "AI-driven biomechanics analysis platform. Analyzes athlete warm-up videos using pose estimation to detect injury risk patterns and movement inefficiencies.",
      tags: ["MediaPipe", "Python", "React", "Biomechanics"],
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "Data Poisoning Attacks Research",
      category: "ML Security",
      year: "2024",
      image: "/project-poison.jpg",
      description: "Security-focused research on adversarial ML vulnerabilities. Evaluated model robustness under various poisoning strategies and analyzed defensive approaches.",
      tags: ["Adversarial ML", "Security", "Research"],
      github: "#",
    },
    {
      id: 4,
      title: "EcoClean - Environmental Platform",
      category: "Web Development",
      year: "2023",
      image: "/project-ecoclean.png",
      description: "Full-stack web platform promoting environmental cleanup initiatives. Features event information, volunteer sign-ups, and educational resources.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive"],
      github: "#",
      demo: "#",
    },
    {
      id: 5,
      title: "Transformer Deployment Optimization",
      category: "ML Optimization",
      year: "2024",
      image: "/project-transformer.jpg",
      description: "Research project optimizing large transformer models for deployment. Benchmarked quantization, pruning, and knowledge distillation across BERT, GPT, and Vision Transformers.",
      tags: ["Quantization", "Pruning", "Distillation"],
      github: "#",
    },
    {
      id: 6,
      title: "Dispatch RAG Demo",
      category: "RAG Systems",
      year: "2024",
      image: "/project-rag.jpg",
      description: "Enterprise document retrieval system using Retrieval-Augmented Generation. Integrates FAISS vector indexing with Hugging Face models for semantic search.",
      tags: ["FAISS", "Hugging Face", "RAG", "Python"],
      github: "#",
      demo: "#",
    },
  ],
};

// Skills Section (Using Testimonials structure)
export interface SkillCategory {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: SkillCategory[];
}

export const testimonialsConfig: TestimonialsConfig = {
  subtitle: "Technical Skills",
  titleRegular: "Tech",
  titleItalic: "Stack",
  testimonials: [
    {
      id: 1,
      name: "Frontend",
      role: "User Interface",
      image: "",
      quote: "React, React Native, Next.js, TypeScript, Tailwind CSS",
    },
    {
      id: 2,
      name: "Backend",
      role: "Server & APIs",
      image: "",
      quote: "Python, Flask, Node.js, REST APIs, GraphQL",
    },
    {
      id: 3,
      name: "AI & ML",
      role: "Machine Learning",
      image: "",
      quote: "Whisper, Qwen-VL, MediaPipe, FAISS, RAG, NLP, Model Compression",
    },
    {
      id: 4,
      name: "DevOps",
      role: "Infrastructure",
      image: "",
      quote: "Docker, Git, CI/CD, MongoDB, Firebase",
    },
    {
      id: 5,
      name: "Languages",
      role: "Programming",
      image: "",
      quote: "Python, Java, JavaScript, TypeScript, C++",
    },
  ],
};

// Achievements Section (Using FAQ structure)
export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: AchievementItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "Recognition",
  titleRegular: "Achievements",
  titleItalic: "& Awards",
  ctaText: "Want to collaborate?",
  ctaButtonText: "Get in Touch",
  ctaHref: "#contact",
  faqs: [
    {
      id: "1",
      title: "3rd Place - Nexus Technology Cup (Statewide, 70+ teams)",
      description: "Presented an AI-powered accessibility system at the statewide Nexus Technology Cup, competing against 70+ teams and securing 3rd place. Demonstrated real-world AI deployment, user impact, and scalable architecture design.",
    },
    {
      id: "2",
      title: "2nd Place - ULM Hackathon",
      description: "Recognized for innovative project development and technical execution at the ULM Hackathon, earning a 2nd place finish.",
    },
    {
      id: "3",
      title: "Secretary - Girls Who Code",
      description: "Leadership role promoting diversity in technology and organizing coding workshops and events for underrepresented groups in STEM.",
    },
    {
      id: "4",
      title: "Acting Treasurer - Nepalese Student Association",
      description: "Managed financial records and supported budgeting for student-led cultural events and initiatives.",
    },
    {
      id: "5",
      title: "Ambassador - Student Leadership Advisory Council",
      description: "Represented student interests and collaborated with university leadership on campus initiatives and policy discussions.",
    },
  ],
};

// Contact Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "DIVYA",
  contactLabel: "Get in Touch",
  email: "divya.shah@example.com",
  locationText: "United States",
  navigationLabel: "Navigation",
  navLinks: [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  socialLabel: "Connect",
  socialLinks: [
    { iconName: "Linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    { iconName: "Github", href: "https://github.com", label: "GitHub" },
    { iconName: "Twitter", href: "https://twitter.com", label: "Twitter" },
    { iconName: "Mail", href: "mailto:divya.shah@example.com", label: "Email" },
  ],
  tagline: "Building intelligent systems\nthat bridge AI research and real-world deployment.",
  copyright: "© 2026 Divya Shah. All rights reserved.",
  bottomLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};
