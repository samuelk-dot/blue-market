import { SiteConfig } from '../types/site';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  developerName: "Samuel King'uri",
  roleTitle: "Senior Full-Stack Engineer & Product Architect",
  heroHeadline: "Building resilient web applications engineered for Google Chrome and the open web.",
  heroSubheadline: "Specializing in reactive frontends, resilient cloud microservices, and high-performance interactive architectures. Open for collaboration, technical leadership, and product development.",
  bioSummary: "I bridge the gap between creative interface design and systems engineering. With deep focus on modern web standards, Google Chrome optimizations, and reactive state systems, I construct software that is fast, accessible, and enjoyable to use.",
  email: "samuelkinguri13@gmail.com",
  location: "Nairobi / Remote Worldwide",
  availability: "Available for high-impact projects",
  themeAccent: "cobalt",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://x.com",
  projects: [
    {
      id: "cloud-analytics-engine",
      title: "PulseFlow Cloud Analytics",
      subtitle: "Real-time telemetry and streaming metrics engine",
      description: "An enterprise telemetry observability dashboard processing high-frequency events with sub-50ms render latency in modern Chrome browsers. Features custom canvas charts and WebSocket push updates.",
      category: "systems",
      tags: ["TypeScript", "React", "Node.js", "WebSockets", "Tailwind CSS"],
      metrics: "Sub-50ms render latency · 4.8M metrics processed daily",
      image: "/src/assets/images/project_cloud_analytics_1791453022906.jpg",
      liveUrl: "https://pulseflow-demo.web.app",
      githubUrl: "https://github.com",
      featured: true,
      impact: "Reduced customer incident response times by 38% across 14 enterprise clusters.",
      techStack: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Web Workers", "IndexedDB"]
    },
    {
      id: "omni-commerce-mobile",
      title: "Verve Next-Gen Commerce",
      subtitle: "Frictionless mobile web shopping experience",
      description: "Progressive web application featuring instant product transitions, offline cart sync, gesture-driven navigation, and zero layout shifts on Google Chrome mobile.",
      category: "web",
      tags: ["React", "PWA", "Vite", "Framer Motion", "Tailwind"],
      metrics: "99.8% Core Web Vitals score · 1.4s First Contentful Paint",
      image: "/src/assets/images/project_mobile_commerce_1791453032492.jpg",
      liveUrl: "https://verve-commerce.web.app",
      githubUrl: "https://github.com",
      featured: true,
      impact: "Boosted checkout completion conversion by 26% on mobile Chrome browsers.",
      techStack: ["Next.js / React", "TypeScript", "Tailwind CSS", "Stripe API", "Edge Cache"]
    },
    {
      id: "pipeline-automation-nodes",
      title: "Nexus Workflow Automation",
      subtitle: "Visual nodal editor for continuous integration and data pipelines",
      description: "Interactive drag-and-drop workflow canvas allowing developers to compose asynchronous deployment pipelines with live runtime visualization and execution replay.",
      category: "fullstack",
      tags: ["TypeScript", "SVG Canvas", "REST APIs", "Tailwind", "Docker"],
      metrics: "40+ integrated actions · 60fps canvas dragging",
      image: "/src/assets/images/project_ai_workflow_1791453042166.jpg",
      liveUrl: "https://nexus-workflows.web.app",
      githubUrl: "https://github.com",
      featured: true,
      impact: "Saved engineering teams an estimated 14 hours per sprint in deployment automation.",
      techStack: ["React", "HTML5 Canvas API", "Express", "TypeScript", "Docker SDK"]
    }
  ],
  services: [
    {
      id: "service-fullstack",
      number: "01.",
      title: "Full-Stack Web Engineering",
      summary: "End-to-end architecture from clean, componentized React frontends to robust API services and databases.",
      deliverables: ["Single-page and full-stack applications", "RESTful & streaming real-time APIs", "Database modeling & schema integrity", "Performance profiling & caching"],
      timeline: "2 to 6 weeks depending on scope"
    },
    {
      id: "service-chrome-pwa",
      number: "02.",
      title: "Chrome & PWA Performance Tuning",
      summary: "Auditing and optimizing web applications for maximum lighthouse scores, instant page loads, and native-feeling mobile experiences.",
      deliverables: ["100/100 Core Web Vitals remediation", "Service worker offline capability", "Bundle size optimization & code splitting", "PWA installability for Chrome on Android & Desktop"],
      timeline: "1 to 2 weeks per audit cycle"
    },
    {
      id: "service-design-systems",
      number: "03.",
      title: "Design Systems & Interactive UI",
      summary: "Crafting scalable component libraries and design tokens that bridge Figma prototypes with accessible production code.",
      deliverables: ["Modular Tailwind & React UI kits", "WCAG AA accessible component structures", "Keyboard navigation & micro-interactions", "Comprehensive Storybook or documentation"],
      timeline: "2 to 4 weeks"
    },
    {
      id: "service-consulting",
      number: "04.",
      title: "Technical Architecture & Code Review",
      summary: "Guiding development teams on framework migrations, state management refactors, and maintainable project structures.",
      deliverables: ["Comprehensive architecture blueprint", "Refactoring roadmap & PR reviews", "Developer tooling & CI/CD recommendations", "Hands-on paired programming sessions"],
      timeline: "Flexible retainer or milestone-based"
    }
  ],
  skills: [
    {
      title: "Frontend & Web Standards",
      skills: [
        { name: "React 19 & Next.js", level: "Expert", experience: "5+ years" },
        { name: "TypeScript / JavaScript", level: "Expert", experience: "6+ years" },
        { name: "Tailwind CSS & Modern CSS", level: "Expert", experience: "5+ years" },
        { name: "Chrome DevTools & V8 Internals", level: "Advanced", experience: "4+ years" },
        { name: "State Architecture (Zustand, Redux)", level: "Advanced", experience: "4+ years" },
        { name: "PWA & Service Workers", level: "Advanced", experience: "3+ years" }
      ]
    },
    {
      title: "Backend & Systems",
      skills: [
        { name: "Node.js & Express", level: "Expert", experience: "5+ years" },
        { name: "PostgreSQL & Relational Data", level: "Advanced", experience: "4+ years" },
        { name: "RESTful & GraphQL APIs", level: "Advanced", experience: "4+ years" },
        { name: "Redis & In-Memory Caching", level: "Proficient", experience: "3+ years" },
        { name: "Docker & Containerization", level: "Proficient", experience: "3+ years" },
        { name: "Cloud Infrastructure (GCP, AWS)", level: "Advanced", experience: "3+ years" }
      ]
    },
    {
      title: "Tooling & Workflow",
      skills: [
        { name: "Vite & Modern Bundlers", level: "Expert", experience: "4+ years" },
        { name: "Git & Version Control Workflows", level: "Expert", experience: "6+ years" },
        { name: "Testing (Vitest, Playwright, Jest)", level: "Advanced", experience: "4+ years" },
        { name: "CI/CD & Automated Pipelines", level: "Advanced", experience: "3+ years" },
        { name: "Linux & Shell Scripting", level: "Proficient", experience: "4+ years" },
        { name: "Figma to Code Implementation", level: "Expert", experience: "4+ years" }
      ]
    }
  ]
};

export const ACCENT_CONFIGS: Record<string, {
  name: string;
  primary: string;
  hover: string;
  badge: string;
  text: string;
  border: string;
  ring: string;
  gradient: string;
}> = {
  cobalt: {
    name: "Electric Cobalt",
    primary: "bg-blue-600",
    hover: "hover:bg-blue-500",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    text: "text-blue-500",
    border: "border-blue-500/40",
    ring: "focus-visible:ring-blue-500",
    gradient: "from-blue-600 to-indigo-600"
  },
  emerald: {
    name: "Cyber Emerald",
    primary: "bg-emerald-600",
    hover: "hover:bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    text: "text-emerald-500",
    border: "border-emerald-500/40",
    ring: "focus-visible:ring-emerald-500",
    gradient: "from-emerald-600 to-teal-600"
  },
  amber: {
    name: "Amber Gold",
    primary: "bg-amber-600",
    hover: "hover:bg-amber-500",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    text: "text-amber-500",
    border: "border-amber-500/40",
    ring: "focus-visible:ring-amber-500",
    gradient: "from-amber-600 to-orange-600"
  },
  rose: {
    name: "Rose Velvet",
    primary: "bg-rose-600",
    hover: "hover:bg-rose-500",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    text: "text-rose-500",
    border: "border-rose-500/40",
    ring: "focus-visible:ring-rose-500",
    gradient: "from-rose-600 to-pink-600"
  },
  slate: {
    name: "Monolith Slate",
    primary: "bg-neutral-100 text-neutral-900",
    hover: "hover:bg-white",
    badge: "bg-neutral-800 text-neutral-200 border-neutral-700",
    text: "text-neutral-100",
    border: "border-neutral-700",
    ring: "focus-visible:ring-neutral-400",
    gradient: "from-neutral-700 to-neutral-900"
  }
};
