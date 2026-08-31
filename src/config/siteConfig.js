export const siteConfig = {
  name: "BuildZone",
  shortName: "BuildZone",
  legalName: "BuildZone Digital Technologies Ltd.",
  tagline: "WE BUILD DIGITAL PRODUCTS THAT MOVE BUSINESSES FORWARD",
  subheading: "We design and develop scalable web applications, mobile apps, AI solutions and custom software for startups and growing businesses worldwide.",
  description: "BuildZone is a premier digital product engineering and AI consultancy. We build scalable software, custom enterprise platforms, intelligent AI systems, and high-performance mobile and web apps.",
  url: "https://buildzone.tech",
  foundedYear: 2020,
  
  // Contact details
  contact: {
    email: "contact@buildzone.tech",
    salesEmail: "sales@buildzone.tech",
    careersEmail: "careers@buildzone.tech",
    phone: "+1 (555) 382-9201",
    whatsapp: "+1 (555) 382-9201",
    address: "Tech Innovation Hub, Level 4, Silicon Avenue",
    city: "San Francisco",
    country: "United States & Global",
    timezone: "UTC -8 (PST) / Global 24/7",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM (24/7 On-Call Support for Enterprise)",
  },

  // Social Links
  social: {
    linkedin: "https://linkedin.com/company/buildzone-tech",
    github: "https://github.com/buildzone-tech",
    twitter: "https://twitter.com/buildzone_tech",
    discord: "https://discord.gg/buildzone",
    youtube: "https://youtube.com/@buildzone_tech",
  },

  // Brand aesthetics
  brand: {
    primaryColor: "#00F0FF",
    secondaryColor: "#7928CA",
    darkBackground: "#06080F",
    accentColor: "#10B981",
  },

  // Main Nav Links
  navLinks: [
    {
      title: "Services",
      href: "/services",
      dropdown: [
        { title: "Web Development", href: "/services/web-development", desc: "Next-gen enterprise web platforms & PWAs" },
        { title: "Mobile App Development", href: "/services/mobile-app-development", desc: "Native & cross-platform iOS & Android apps" },
        { title: "AI & Intelligent Automation", href: "/ai-development", desc: "LLMs, RAG, agents & autonomous workflows" },
        { title: "Custom Software", href: "/services/custom-software", desc: "Bespoke mission-critical software systems" },
        { title: "SaaS Development", href: "/services/saas-development", desc: "Multi-tenant cloud SaaS products" },
        { title: "E-Commerce Systems", href: "/services/e-commerce", desc: "High-scale commerce & checkout engines" },
        { title: "UI/UX & Product Design", href: "/services/ui-ux-design", desc: "Modern human-centered digital experiences" },
        { title: "Cloud & DevOps", href: "/services/cloud-devops", desc: "AWS, Kubernetes, CI/CD & microservices" },
      ]
    },
    {
      title: "Solutions",
      href: "/ai-development",
      dropdown: [
        { title: "AI Development & Agents", href: "/ai-development", desc: "Enterprise LLM applications & automated agents" },
        { title: "Security & Compliance", href: "/security", desc: "Bank-grade enterprise security architecture" },
        { title: "Technologies & Stack", href: "/technologies", desc: "Our verified modern engineering stack" },
      ]
    },
    {
      title: "Industries",
      href: "/industries",
      dropdown: [
        { title: "Healthcare & MedTech", href: "/industries/healthcare", desc: "HIPAA compliant medical platforms" },
        { title: "FinTech & Banking", href: "/industries/fintech", desc: "Secure transaction processing & digital banking" },
        { title: "E-Commerce & Retail", href: "/industries/e-commerce", desc: "High-load omnichannel commerce platforms" },
        { title: "Education & EdTech", href: "/industries/education", desc: "Interactive LMS & virtual learning systems" },
        { title: "Logistics & Supply Chain", href: "/industries/logistics", desc: "Real-time dispatch & warehouse tracking" },
        { title: "Real Estate & PropTech", href: "/industries/real-estate", desc: "Smart asset management & 3D portals" },
      ]
    },
    {
      title: "Work",
      href: "/portfolio",
      dropdown: [
        { title: "Portfolio Gallery", href: "/portfolio", desc: "Explore our latest shipped client products" },
        { title: "In-Depth Case Studies", href: "/case-studies", desc: "Detailed engineering & business metrics" },
        { title: "Tech Stack & Tools", href: "/technologies", desc: "Our verified modern engineering stack" },
      ]
    },
    {
      title: "About",
      href: "/about",
      dropdown: [
        { title: "Our Story & Vision", href: "/about", desc: "Who we are and our engineering principles" },
        { title: "Leadership Team", href: "/team", desc: "Meet the engineering partners" },
        { title: "Careers & Jobs", href: "/careers", desc: "Join our global engineering team" },
      ]
    },
    {
      title: "Insights",
      href: "/blog",
      dropdown: [
        { title: "Engineering Blog", href: "/blog", desc: "Articles on architecture, AI, and scale" },
        { title: "Frequently Asked Questions", href: "/faq", desc: "Answers to common client questions" },
        { title: "Verified Testimonials", href: "/testimonials", desc: "Client testimonials and reviews" },
      ]
    },
    {
      title: "Contact",
      href: "/contact"
    },
  ],

  // Footer Navigation
  footerLinks: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Engineering Team", href: "/team" },
      { label: "Careers (Hiring)", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "Security Overview", href: "/security" },
    ],
    services: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Development", href: "/services/mobile-app-development" },
      { label: "AI & Automation", href: "/ai-development" },
      { label: "Custom Software", href: "/services/custom-software" },
      { label: "SaaS Architecture", href: "/services/saas-development" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    ],
    resources: [
      { label: "Engineering Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Client Portfolio", href: "/portfolio" },
      { label: "Technologies Stack", href: "/technologies" },
      { label: "FAQ", href: "/faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ]
  }
};
