export const initialIndustries = [
  {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare & MedTech",
    iconName: "Activity",
    shortDescription: "HIPAA-compliant telemedicine platforms, electronic health record (EHR) integrations, and patient management portals.",
    heroDescription: "We build secure, compliant digital health platforms that connect patients, doctors, and healthcare institutions with zero friction.",
    commonProblems: [
      "Strict HIPAA and GDPR regulatory compliance barriers",
      "Fragmented legacy EHR systems that do not talk to each other",
      "Patient data leakage vulnerabilities and privacy concerns"
    ],
    solutions: [
      "End-to-end encrypted telehealth and video consultation modules",
      "HL7 / FHIR compliant API bridges for EHR data synchronization",
      "Automated appointment scheduling, prescription tracking, and billing"
    ],
    features: [
      "HIPAA/GDPR Compliant Telemedicine Portals",
      "FHIR/HL7 Interoperability Adapters",
      "Automated Patient Triage & AI Symptom Checkers",
      "IoT Medical Device Telemetry Integration",
      "Role-Based Doctor/Nurse/Patient Access Portals"
    ],
    technologies: ["React", "Node.js", "WebRTC", "PostgreSQL", "AWS HealthLake", "Docker"],
    relevantServices: ["Web Development", "Mobile App Development", "Custom Software", "Cloud & DevOps"]
  },
  {
    id: "fintech",
    slug: "fintech",
    name: "FinTech & Banking",
    iconName: "DollarSign",
    shortDescription: "Secure digital banking apps, payment gateways, automated algorithmic trading dashboards, and compliance engines.",
    heroDescription: "High-security financial technology platforms engineered for maximum transaction speed, fraud detection, and regulatory compliance.",
    commonProblems: [
      "High fraud rates and fraudulent chargebacks",
      "Slow legacy settlement times and complex payment gateway APIs",
      "Stringent PCI-DSS and financial regulatory audits"
    ],
    solutions: [
      "Bank-grade AES-256 encryption and biometric authentication",
      "Real-time fraud scoring powered by machine learning algorithms",
      "Automated reconciliation engines balancing millions in transactions"
    ],
    features: [
      "Digital Wallet & Multi-Currency Ledger Systems",
      "PCI-DSS Compliant Payment Gateway Integrations",
      "Automated KYC/AML Identity Verification Pipelines",
      "Real-Time Algorithmic Trading & Analytics Charts",
      "Automated Invoicing, Escrow & Tax Calculation"
    ],
    technologies: ["React", "TypeScript", "Python", "PostgreSQL", "Redis", "Kafka", "Stripe API", "AWS"],
    relevantServices: ["Custom Software", "Web Development", "AI Development", "Cloud & DevOps"]
  },
  {
    id: "ecommerce",
    slug: "e-commerce",
    name: "E-Commerce & Retail",
    iconName: "ShoppingBag",
    shortDescription: "Omnichannel commerce architectures, custom marketplace platforms, and sub-second headless storefronts.",
    heroDescription: "Scale your digital sales with high-conversion e-commerce engines designed to handle massive traffic surges effortlessly.",
    commonProblems: [
      "High cart abandonment rates from slow or clunky checkouts",
      "Inventory synchronization mismatches across warehouses",
      "Server crashes during Black Friday and flash sales"
    ],
    solutions: [
      "Headless storefronts with instant 1-click accelerated checkout",
      "Real-time stock reservation and automated multi-warehouse sync",
      "Autoscaling cloud infrastructure guaranteeing 99.99% uptime"
    ],
    features: [
      "Headless Storefronts (Next.js + Shopify / MedusaJS)",
      "Multi-Vendor Marketplace Architectures",
      "Real-Time Inventory & ERP Synchronization",
      "Personalized Product Recommendations Engine",
      "Omnichannel POS and Store Integration"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Shopify API", "MedusaJS", "Redis", "Stripe", "Algolia"],
    relevantServices: ["E-Commerce", "Web Development", "UI/UX Design", "Cloud & DevOps"]
  },
  {
    id: "education",
    slug: "education",
    name: "Education & EdTech",
    iconName: "GraduationCap",
    shortDescription: "Interactive learning management systems (LMS), virtual classroom software, and AI-driven personalized tutoring platforms.",
    heroDescription: "We build engaging educational platforms that empower students and instructors worldwide with interactive multimedia tools.",
    commonProblems: [
      "Low student engagement in passive video-based courses",
      "Difficulty tracking student progress and grading assignments at scale",
      "Scalability bottlenecks during concurrent online exams"
    ],
    solutions: [
      "Gamified learning paths with live quizzes and interactive challenges",
      "Automated AI grading for assignments with instant constructive feedback",
      "WebRTC-powered live interactive classrooms with low latency"
    ],
    features: [
      "Comprehensive Learning Management Systems (LMS)",
      "Live Interactive Virtual Classrooms & Whiteboards",
      "AI-Powered Personalized Study Paths & Quizzes",
      "SCORM & xAPI Compliant Course Exporters",
      "Automated Certificate Generation & Verifiable Credentials"
    ],
    technologies: ["React", "Node.js", "WebRTC", "PostgreSQL", "Socket.io", "AWS S3"],
    relevantServices: ["Web Development", "Mobile App Development", "AI Development"]
  },
  {
    id: "realestate",
    slug: "real-estate",
    name: "Real Estate & PropTech",
    iconName: "Home",
    shortDescription: "Property management software, MLS IDX integration, 3D interactive virtual tours, and tenant portals.",
    heroDescription: "Modern PropTech solutions that streamline property listings, automated leasing, and commercial asset management.",
    commonProblems: [
      "Manual tenant leasing paperwork and disorganized maintenance requests",
      "Stale MLS listing data and slow property search filters"
    ],
    solutions: [
      "Automated digital lease signing and tenant maintenance ticketing",
      "Instant MLS IDX synchronization with interactive map searching"
    ],
    features: [
      "MLS / IDX Listing Integration with Geospatial Search",
      "Tenant & Landlord Self-Service Portals",
      "Automated Rent Collection & Lease Management",
      "3D Virtual Tour Embeds & Floor Plan Viewers",
      "Commercial Property Asset ROI Calculators"
    ],
    technologies: ["React", "Next.js", "Mapbox", "PostGIS", "Node.js", "PostgreSQL"],
    relevantServices: ["Web Development", "Custom Software", "UI/UX Design"]
  },
  {
    id: "logistics",
    slug: "logistics",
    name: "Logistics & Supply Chain",
    iconName: "Truck",
    shortDescription: "Fleet dispatch management, real-time GPS tracking, warehouse management systems (WMS), and route optimization.",
    heroDescription: "Automate fleet operations, optimize delivery routes, and achieve total visibility across your global supply chain.",
    commonProblems: [
      "Inefficient delivery routes increasing fuel and labor costs",
      "Lack of real-time visibility into driver locations and delivery status"
    ],
    solutions: [
      "AI route optimization algorithms reducing transit time and fuel costs",
      "Real-time GPS telemetry and automated customer delivery tracking"
    ],
    features: [
      "Real-Time Fleet Dispatch & GPS Telemetry",
      "AI-Powered Dynamic Route Optimization",
      "Barcode/QR Scanning Warehouse Inventory Systems",
      "Electronic Proof of Delivery (ePOD) Mobile Apps",
      "Automated Carrier Rate Comparison & Booking"
    ],
    technologies: ["React Native", "Node.js", "Python", "PostGIS", "Redis", "Kafka", "AWS IoT"],
    relevantServices: ["Custom Software", "Mobile App Development", "Cloud & DevOps"]
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    iconName: "Factory",
    shortDescription: "Smart factory dashboards, predictive equipment maintenance, shop floor tracking, and ERP integration.",
    heroDescription: "Digitize manufacturing operations with real-time factory telemetry, quality inspection, and supply chain ERP connectivity.",
    commonProblems: [
      "Unplanned machine downtime halting entire production lines",
      "Paper-based shop floor reporting leading to delayed insights"
    ],
    solutions: [
      "IoT sensor integration with predictive maintenance anomaly detection",
      "Digital shop floor dashboards updating production metrics in real-time"
    ],
    features: [
      "Industrial IoT Telemetry & OEE Metric Dashboards",
      "Predictive Machine Maintenance Alerting",
      "Shop Floor Work Order & Quality Inspection Apps",
      "Supply Chain Bill of Materials (BOM) Tracking"
    ],
    technologies: ["React", "Python", "MQTT", "TimescaleDB", "Docker", "AWS IoT"],
    relevantServices: ["Custom Software", "AI Development", "Cloud & DevOps"]
  },
  {
    id: "sports",
    slug: "sports-fitness",
    name: "Sports & Fitness",
    iconName: "Trophy",
    shortDescription: "Fitness coaching apps, gym management software, wearable IoT tracking, and sports tournament platforms.",
    heroDescription: "Empower athletes, trainers, and fitness businesses with high-energy mobile apps, workout planners, and club management tools.",
    commonProblems: [
      "Low member retention and lack of personalized workout guidance",
      "Disorganized class scheduling and recurring membership billing"
    ],
    solutions: [
      "Interactive workout tracking with Apple Health and Google Fit sync",
      "Automated membership billing and class booking portals"
    ],
    features: [
      "Wearable HealthKit & Google Fit Data Sync",
      "Interactive Video Workout Libraries & Live Streams",
      "Gym Member Booking & Recurring Billing System",
      "Tournament Bracket & Live Score Management"
    ],
    technologies: ["React Native", "Flutter", "Node.js", "PostgreSQL", "Stripe"],
    relevantServices: ["Mobile App Development", "Web Development", "UI/UX Design"]
  },
  {
    id: "travel",
    slug: "travel",
    name: "Travel & Hospitality",
    iconName: "Plane",
    shortDescription: "Flight and hotel booking engines, tour itinerary planners, and guest hospitality management portals.",
    heroDescription: "Build seamless travel booking experiences with multi-GDS integrations, interactive itineraries, and contactless guest services.",
    commonProblems: [
      "Complex GDS API integrations (Amadeus, Sabre) with slow response times",
      "High rate of abandoned bookings due to cumbersome multi-step forms"
    ],
    solutions: [
      "High-speed cached flight & hotel aggregator backend",
      "Clean 2-step booking checkout flow with instant mobile confirmation"
    ],
    features: [
      "GDS Flight & Hotel API Integrations (Amadeus/Sabre)",
      "Interactive Multi-Day Trip Itinerary Planners",
      "Dynamic Pricing & Availability Sync Engines",
      "Contactless Mobile Hotel Check-in & Keyless Entry"
    ],
    technologies: ["React", "Next.js", "Node.js", "Redis", "PostgreSQL", "Stripe"],
    relevantServices: ["Web Development", "Mobile App Development", "Custom Software"]
  },
  {
    id: "saas-industry",
    slug: "saas",
    name: "SaaS & Cloud Platforms",
    iconName: "CloudLightning",
    shortDescription: "High-growth B2B and B2C SaaS platforms with multi-tenancy, telemetry, automated billing, and API ecosystems.",
    heroDescription: "We partner with SaaS founders to engineer scalable software products that delight users and attract venture capital.",
    commonProblems: [
      "Technical debt from rushing early prototypes without scalable foundations",
      "Inability to support enterprise SSO and compliance requirements"
    ],
    solutions: [
      "Clean domain-driven modular architecture built for rapid feature iteration",
      "Out-of-the-box SAML SSO, audit logging, and role-based permissions"
    ],
    features: [
      "Multi-Tenant Architecture with Tenant Isolation",
      "Stripe Billing & Tier Management",
      "Enterprise SAML/SSO Authentication",
      "Developer APIs & Webhook Dispatch Engines"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    relevantServices: ["SaaS Development", "Web Development", "Cloud & DevOps"]
  },
  {
    id: "startups",
    slug: "startups",
    name: "Startups & MVP Launchpad",
    iconName: "Rocket",
    shortDescription: "Rapid MVP development, technical co-founder partnership, investor-ready prototypes, and scalable architecture from Day 1.",
    heroDescription: "We help ambitious founders build and ship production-grade MVPs in weeks—not months—engineered to scale when you raise capital.",
    commonProblems: [
      "Founders wasting months and capital on over-engineered unvalidated features",
      "Hiring an in-house team before validating product-market fit"
    ],
    solutions: [
      "Laser-focused 4-6 week MVP development sprints targeting core value",
      "Full-stack team on demand saving up to 60% compared to local hiring"
    ],
    features: [
      "Rapid 4 to 6-Week Production MVP Sprints",
      "Interactive Pitch Deck Prototypes & Demos for Investors",
      "Clean, Documented Codebase Ready for Due Diligence",
      "Automated CI/CD & Scalable Cloud Foundation"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js / FastAPI", "PostgreSQL", "Vercel / AWS"],
    relevantServices: ["Web Development", "Mobile App Development", "AI Development", "UI/UX Design"]
  }
];
