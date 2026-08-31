export const initialServices = [
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    category: "Engineering",
    iconName: "Globe",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    shortDescription: "High-performance web applications, enterprise portals, and scalable progressive web apps engineered with modern frameworks.",
    heroDescription: "We engineer resilient, blazing-fast web applications designed for scale. From complex SaaS dashboards to high-concurrency enterprise web platforms, our code is modular, accessible, and built to perform.",
    benefits: [
      "Sub-second load times with modern SSR and edge delivery",
      "Modular micro-frontend and component-driven architecture",
      "High test coverage with automated CI/CD deployment",
      "Enterprise-grade security and OWASP compliance"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "Vite", "PostgreSQL"],
    problemsSolved: [
      {
        problem: "Legacy codebase slowing down release cycles and user retention",
        solution: "Incremental modern architecture migration without operational downtime."
      },
      {
        problem: "Poor performance and low Core Web Vitals hurting conversion rates",
        solution: "Edge caching, optimized asset pipelines, and SSR/SSG rendering strategies."
      },
      {
        problem: "Inability to scale infrastructure during traffic spikes",
        solution: "Stateless containerized architecture running on autoscaling cloud clusters."
      }
    ],
    features: [
      "Custom Single Page Applications (SPA) & Multi-Page Web Apps",
      "Enterprise Portals & Customer Dashboards",
      "Headless CMS Architecture & API Integrations",
      "Real-time Collaboration & WebSocket Architectures",
      "Progressive Web Apps (PWA) with offline capabilities",
      "Comprehensive Automated Testing (Unit, E2E, Load)"
    ],
    process: [
      { step: "01", title: "Architecture & Schema Design", desc: "Define component models, state architecture, and API contracts." },
      { step: "02", title: "Core Component Development", desc: "Build reusable design systems and core business modules." },
      { step: "03", title: "Integration & Optimization", desc: "Connect backend APIs, implement caching, and benchmark performance." },
      { step: "04", title: "QA, Security & Deployment", desc: "Automated regression testing, security scanning, and zero-downtime release." }
    ],
    faqs: [
      { q: "What tech stack do you recommend for high-scale web apps?", a: "We typically build on Next.js or React with TypeScript on the frontend, paired with Node.js/FastAPI backend and PostgreSQL/Redis for data layer." },
      { q: "Can you modernize an existing legacy web application?", a: "Yes, we specialize in strangler-pattern incremental refactoring to modernize legacy software without interrupting live business operations." }
    ]
  },
  {
    id: "mobile-dev",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    category: "Mobile",
    iconName: "Smartphone",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Native and cross-platform mobile apps for iOS and Android with fluid 60fps animations and offline synchronization.",
    heroDescription: "We craft intuitive, high-performance mobile applications that users love. Whether native iOS/Android or cross-platform Flutter and React Native, our apps are snappy, secure, and rock-solid.",
    benefits: [
      "Native-level performance and smooth 60fps gesture interfaces",
      "Offline-first architecture with background sync",
      "Seamless biometrics, camera, Bluetooth, and hardware sensor integration",
      "End-to-end App Store and Google Play release management"
    ],
    technologies: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)", "Firebase", "Redux", "GraphQL"],
    problemsSolved: [
      {
        problem: "Maintaining two separate codebases doubles development and maintenance costs",
        solution: "Cross-platform engineering with Flutter or React Native sharing up to 90% codebase."
      },
      {
        problem: "Poor offline experience causing user frustration in spotty network zones",
        solution: "Local SQLite/WatermelonDB caching with resilient conflict-resolution background synchronization."
      }
    ],
    features: [
      "Cross-Platform iOS & Android App Development",
      "Biometric Authentication & In-App Purchases",
      "Real-time Push Notifications & Deep Linking",
      "Offline-First Data Storage & Sync",
      "Custom UI Micro-Interactions & Dark Mode Support",
      "Automated Mobile CI/CD with Fastlane"
    ],
    process: [
      { step: "01", title: "Product Blueprint & UX", desc: "Wireframing mobile user journeys and device-specific UX guidelines." },
      { step: "02", title: "Agile Sprint Development", desc: "Iterative builds with bi-weekly TestFlight and internal APK drops." },
      { step: "03", title: "Device Matrix Testing", desc: "Testing across multiple screen sizes, OS versions, and network speeds." },
      { step: "04", title: "Store Submission & Launch", desc: "Guaranteed app review compliance and store launch management." }
    ],
    faqs: [
      { q: "Should we build Native or Cross-Platform?", a: "For 90% of business applications, React Native or Flutter delivers identical native feel with 40% cost and time savings. We recommend purely native Swift/Kotlin when deep low-level hardware or graphics drivers are required." }
    ]
  },
  {
    id: "custom-software",
    slug: "custom-software",
    title: "Custom Software Engineering",
    shortTitle: "Custom Software",
    category: "Enterprise",
    iconName: "Cpu",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Tailored enterprise systems, ERPs, CRM platforms, and internal tooling engineered around your exact business workflows.",
    heroDescription: "Off-the-shelf software rarely fits proprietary business models. We build bespoke software systems engineered specifically for your workflows, giving your enterprise unmatched operational efficiency and competitive advantage.",
    benefits: [
      "Zero recurring per-user SaaS license fees",
      "100% intellectual property and source code ownership",
      "Bespoke integrations with legacy databases and third-party APIs",
      "Granular role-based access control (RBAC) and audit logs"
    ],
    technologies: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "Kafka", "AWS"],
    problemsSolved: [
      {
        problem: "Generic SaaS tools force you to compromise and change your business processes",
        solution: "Software custom-built around your proprietary operational workflows."
      },
      {
        problem: "Disconnected data silos causing manual data duplication and human errors",
        solution: "Unified custom platform connecting all operational channels into one source of truth."
      }
    ],
    features: [
      "Custom ERP & CRM Platforms",
      "Enterprise Resource & Inventory Management",
      "Automated Financial Reporting & Ledger Systems",
      "Custom Workflow Automation & Approval Engines",
      "Legacy Database Migration & REST/GraphQL API Layers",
      "Comprehensive Audit Trails & Security Logging"
    ],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "Mapping current operational bottlenecks and business rules." },
      { step: "02", title: "Domain-Driven Design", desc: "Architecting domain models, data structures, and service boundaries." },
      { step: "03", title: "Iterative Module Build", desc: "Delivering working modules for stakeholder testing." },
      { step: "04", title: "Enterprise Rollout", desc: "Employee onboarding, user role provisioning, and migration." }
    ],
    faqs: [
      { q: "Who owns the code and intellectual property?", a: "You own 100% of the source code, repositories, data, and intellectual property upon project completion." }
    ]
  },
  {
    id: "ai-dev",
    slug: "ai-development",
    title: "AI & Intelligent Automation",
    shortTitle: "AI Solutions",
    category: "AI",
    iconName: "Bot",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Custom AI agents, LLM applications, Retrieval-Augmented Generation (RAG), and autonomous workflow automation.",
    heroDescription: "Transform enterprise workflows with intelligent automation. We build production-ready LLM applications, custom AI agents, fine-tuned domain models, and high-accuracy vector search RAG systems.",
    benefits: [
      "Automate hours of repetitive manual data entry and document review",
      "Private enterprise RAG systems with zero public data leakage",
      "Autonomous AI agents executing multi-step business logic",
      "Measurable operational cost reduction and instant customer response"
    ],
    technologies: ["Python", "OpenAI / Claude APIs", "LangChain", "LlamaIndex", "Pinecone / Qdrant", "FastAPI", "n8n", "PyTorch"],
    problemsSolved: [
      {
        problem: "Employees spending hours searching through internal PDFs, docs, and knowledge bases",
        solution: "Enterprise RAG search engine answering contextual queries with exact source citations."
      },
      {
        problem: "High customer support overhead and delayed response times",
        solution: "AI agents trained on company docs handling up to 75% of customer queries instantly."
      }
    ],
    features: [
      "Autonomous Multi-Agent Systems & Tool Calling",
      "Retrieval-Augmented Generation (RAG) over Enterprise Docs",
      "Intelligent Document Processing & OCR Extraction",
      "Custom LLM Fine-Tuning & Prompt Engineering",
      "Automated Business Workflows via n8n & Python",
      "Computer Vision & Predictive Analytics Models"
    ],
    process: [
      { step: "01", title: "Data & Feasibility Audit", desc: "Assessing document quality, vector schemas, and AI objectives." },
      { step: "02", title: "Prototype & Precision Tuning", desc: "Building RAG pipelines and benchmarking against hallucinations." },
      { step: "03", title: "API & Frontend Integration", desc: "Connecting AI microservices to your web/mobile applications." },
      { step: "04", title: "Guardrails & Monitoring", desc: "Implementing content moderation, token optimization, and observability." }
    ],
    faqs: [
      { q: "Is our private company data used to train public AI models?", a: "No. We implement enterprise zero-data-retention APIs and self-hosted open-source models (e.g. Llama 3) where your proprietary data never leaves your private cloud." }
    ]
  },
  {
    id: "saas-dev",
    slug: "saas-development",
    title: "SaaS Product Engineering",
    shortTitle: "SaaS Development",
    category: "Cloud",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    shortDescription: "End-to-end multi-tenant SaaS architecture with automated billing, subscription management, and user provisioning.",
    heroDescription: "We build scalable Software-as-a-Service (SaaS) products from MVP to enterprise scale. Multi-tenant database isolation, Stripe recurring billing, team workspaces, and analytics are baked in from day one.",
    benefits: [
      "Multi-tenant data isolation and secure workspace partitioning",
      "Stripe / LemonSqueezy subscription, invoicing, and tier upgrades",
      "Granular team permissions and invite management",
      "Built-in usage metering, telemetry, and conversion analytics"
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe API", "Redis", "Docker", "AWS"],
    problemsSolved: [
      {
        problem: "Slow MVP delivery causing missed market opportunities",
        solution: "Rapid modular SaaS boilerplate architecture launching in weeks instead of months."
      },
      {
        problem: "Security risks when sharing multi-tenant databases",
        solution: "Row-level security (RLS) and strict tenant schema isolation."
      }
    ],
    features: [
      "Multi-Tenant Workspace & Team Management",
      "Recurring Billing, Seat-Based & Usage-Based Pricing",
      "Role-Based Access Control (RBAC) & SAML/SSO",
      "Self-Serve Customer Onboarding & Onboarding Tours",
      "Public API & Webhook Dispatch System for Developers",
      "Admin Analytics & Churn Monitoring Dashboards"
    ],
    process: [
      { step: "01", title: "SaaS Architecture Blueprint", desc: "Planning tenant isolation, billing model, and RBAC tiers." },
      { step: "02", title: "Core MVP Build", desc: "Developing the primary customer value proposition and UI." },
      { step: "03", title: "Billing & Auth Integration", desc: "Integrating Stripe, OAuth, team invitations, and rate limiters." },
      { step: "04", title: "Scale & Reliability", desc: "Automated scaling policies, database indexing, and health checks." }
    ],
    faqs: [
      { q: "Can you help integrate Stripe billing and tax handling?", a: "Yes, we integrate Stripe Billing, Checkout, Customer Portal, and Stripe Tax for automated worldwide compliance." }
    ]
  },
  {
    id: "ecommerce-dev",
    slug: "e-commerce",
    title: "E-Commerce Systems",
    shortTitle: "E-Commerce",
    category: "Commerce",
    iconName: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
    shortDescription: "High-conversion headless e-commerce architectures, custom checkout funnels, and enterprise inventory integrations.",
    heroDescription: "We engineer lightning-fast digital commerce experiences. Whether custom headless Shopify, MedusaJS, or bespoke commerce engines, we prioritize frictionless checkout and high conversion rates.",
    benefits: [
      "Sub-second catalog browsing and instant search filtering",
      "Optimized 1-click checkout flows reducing cart abandonment",
      "Automated multi-warehouse inventory and shipping sync",
      "Omnichannel POS and third-party marketplace integrations"
    ],
    technologies: ["Next.js", "Shopify Plus / Headless", "MedusaJS", "Stripe", "Algolia", "Tailwind CSS", "Redis"],
    problemsSolved: [
      {
        problem: "Slow theme-based stores causing high bounce rates and lost sales",
        solution: "Headless storefront delivering sub-second page loads and custom design freedom."
      }
    ],
    features: [
      "Headless Storefront Development",
      "Custom Checkout & Payment Gateway Integration",
      "Real-time Inventory & ERP Warehouse Sync",
      "Intelligent Product Recommendation Engines",
      "International Multi-Currency & Localization",
      "Customer Loyalty & Subscription Clubs"
    ],
    process: [
      { step: "01", title: "Conversion UX Audit", desc: "Optimizing the path from product discovery to checkout." },
      { step: "02", title: "Headless Architecture", desc: "Setting up fast API-first catalog and commerce services." },
      { step: "03", title: "Payment & Gateway Testing", desc: "Extensive sandbox testing of edge-case transactions." },
      { step: "04", title: "Black Friday Load Testing", desc: "Stress testing to guarantee uptime during high-volume flash sales." }
    ],
    faqs: [
      { q: "Why go headless for e-commerce?", a: "Headless commerce separates the frontend presentation from backend data, allowing ultra-fast load times, bespoke UX, and multi-channel selling across web, mobile apps, and kiosks." }
    ]
  },
  {
    id: "ui-ux",
    slug: "ui-ux-design",
    title: "UI/UX & Product Design",
    shortTitle: "UI/UX Design",
    category: "Design",
    iconName: "Palette",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Human-centered digital product design, design systems, and clickable interactive prototypes crafted in Figma.",
    heroDescription: "Great software starts with exceptional design. We design modern, clean, high-conversion interfaces backed by user research, design systems, and rigorous usability testing.",
    benefits: [
      "Consistent, scalable design system ready for engineering handoff",
      "Intuitive navigation reducing user onboarding friction",
      "High-fidelity interactive Figma prototypes",
      "Accessibility compliance (WCAG 2.1 AA)"
    ],
    technologies: ["Figma", "Design Systems", "User Research", "Wireframing", "Prototyping", "WCAG 2.1 AA"],
    problemsSolved: [
      {
        problem: "Confusing user interfaces leading to customer churn and support tickets",
        solution: "User testing and streamlined ergonomic task flows."
      }
    ],
    features: [
      "Full Product UX/UI Architecture",
      "Atomic Design Systems & Component Libraries",
      "Interactive Figma Prototypes",
      "Information Architecture & User Journey Mapping",
      "Usability Testing & Conversion Rate Optimization",
      "Dark Mode & Responsive Mobile Styling Specs"
    ],
    process: [
      { step: "01", title: "User Research & Discovery", desc: "Understanding persona needs and mapping friction points." },
      { step: "02", title: "Low-Fidelity Wireframes", desc: "Iterating on structural layouts and content hierarchy." },
      { step: "03", title: "High-Fidelity Visuals", desc: "Applying brand aesthetics, typography, and micro-interactions." },
      { step: "04", title: "Design System Handoff", desc: "Exporting tokenized variables and developer-ready specs." }
    ],
    faqs: [
      { q: "Do we get full access to the Figma design files?", a: "Yes, you receive complete ownership of all organized Figma source files, components, and token libraries." }
    ]
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    shortTitle: "Cloud & DevOps",
    category: "Infrastructure",
    iconName: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Automated CI/CD pipelines, container orchestration with Kubernetes, and robust infrastructure as code on AWS/GCP.",
    heroDescription: "We engineer resilient, zero-downtime cloud infrastructure. With automated deployments, Infrastructure-as-Code (Terraform), and proactive 24/7 monitoring, your platform stays fast and secure.",
    benefits: [
      "Zero-downtime automated deployment pipelines",
      "Autoscaling clusters handling sudden traffic surges",
      "Automated daily encrypted backups and disaster recovery",
      "Cloud cost optimization eliminating wasted compute resources"
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Nginx", "Prometheus", "Grafana"],
    problemsSolved: [
      {
        problem: "Manual error-prone deployments causing unexpected downtime",
        solution: "Fully automated CI/CD pipeline with automatic rollbacks."
      },
      {
        problem: "Skyrocketing cloud hosting bills with unutilized servers",
        solution: "Cloud auditing and rightsizing to reduce monthly infrastructure costs."
      }
    ],
    features: [
      "Infrastructure as Code (Terraform / CloudFormation)",
      "Automated CI/CD Deployment Pipelines (GitHub Actions)",
      "Docker Containerization & Kubernetes Orchestration",
      "Serverless Architecture & Edge Computing",
      "24/7 Observability, Log Aggregation & Alerting",
      "Disaster Recovery & Automated Multi-Region Backups"
    ],
    process: [
      { step: "01", title: "Infrastructure Audit", desc: "Analyzing current hosting bottlenecks, security, and costs." },
      { step: "02", title: "IaC Architecture", desc: "Writing modular Terraform scripts for reproducible infrastructure." },
      { step: "03", title: "CI/CD Pipeline Automation", desc: "Configuring automated test runners and deployment targets." },
      { step: "04", title: "Monitoring & Handover", desc: "Setting up Grafana dashboards, alerting thresholds, and docs." }
    ],
    faqs: [
      { q: "Which cloud providers do you support?", a: "We primarily build on AWS, Google Cloud (GCP), DigitalOcean, and Vercel, depending on client scale and budget." }
    ]
  }
];
