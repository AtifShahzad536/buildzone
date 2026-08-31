export const initialCaseStudies = [
  {
    id: "cs-1",
    slug: "medflow-telehealth-platform",
    title: "How MedFlow Scaled Telehealth Consultations to 250,000+ Active Patients",
    client: "MedFlow Global Health",
    industry: "Healthcare & MedTech",
    location: "Austin, Texas, USA",
    projectDuration: "6 Months",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    challenge: "MedFlow was struggling with an outdated, fragmented video conferencing setup that lacked HIPAA compliance, suffered from high video latency during peak morning clinics, and required doctors to manually copy patient consultation notes into separate EHR systems.",
    solution: "BuildZone engineered a bespoke, HIPAA-compliant WebRTC telemedicine portal integrated with HL7/FHIR health record adapters. We built end-to-end encrypted video streaming with automated transcription, integrated prescription generation, and an automated patient waiting queue.",
    features: [
      "Sub-200ms WebRTC encrypted video and audio consultations",
      "Automated clinical note generation via fine-tuned medical speech-to-text",
      "Direct integration with Epic & Cerner EHR via FHIR REST bridges",
      "Patient self-serve queue management with SMS alerts",
      "In-session digital prescription writer and e-faxing module"
    ],
    technology: ["React", "TypeScript", "Node.js", "WebRTC", "PostgreSQL", "AWS HealthLake", "Docker", "Tailwind CSS"],
    developmentProcess: [
      { phase: "01 Discovery & HIPAA Audit", detail: "Conducted security audits, signed Business Associate Agreements (BAAs), and mapped EHR integration endpoints." },
      { phase: "02 WebRTC Mesh Architecture", detail: "Engineered scalable media servers with adaptive bitrate streaming for patients with slow cellular connections." },
      { phase: "03 Clinic Pilot Testing", detail: "Deployed beta build with 25 primary care doctors across 4 regional clinics, refining clinical note workflows." },
      { phase: "04 Full Scale Rollout", detail: "Zero-downtime migration of 250,000 patient records and 24/7 telemetry monitoring." }
    ],
    results: [
      { metric: "250,000+", label: "Active Consultations Handled" },
      { metric: "99.98%", label: "Uptime During Clinic Hours" },
      { metric: "40%", label: "Reduction in Patient Wait Times" },
      { metric: "<180ms", label: "Average Video Latency" }
    ],
    architecture: "The platform runs on containerized microservices hosted on AWS ECS within a dedicated Virtual Private Cloud (VPC). Video traffic is managed via TURN/STUN WebRTC gateways with automated failover. Patient database records are encrypted with AES-256 at rest and in transit.",
    testimonial: {
      quote: "BuildZone delivered a flawless healthcare platform that met our strict HIPAA compliance requirements while delivering the fastest video streaming experience our clinicians have ever used.",
      author: "Dr. Rachel Sterling",
      role: "Chief Medical Officer",
      company: "MedFlow Global Health"
    }
  },
  {
    id: "cs-2",
    slug: "omnistock-ai-supply-chain",
    title: "OmniStock: Autonomous AI Supply Chain Forecasting & Inventory Optimization",
    client: "OmniStock Logistics Inc.",
    industry: "Logistics & Supply Chain",
    location: "Chicago, Illinois, USA",
    projectDuration: "5 Months",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
    challenge: "OmniStock's retail clients were experiencing frequent stockouts and overstock scenarios across 45 regional fulfillment hubs due to manual Excel-based demand forecasting that failed to account for seasonal spikes and shipping delays.",
    solution: "BuildZone designed and deployed an autonomous AI demand prediction engine that ingests historical sales, weather anomalies, supplier lead times, and macroeconomic indicators to generate automated purchase order recommendations.",
    features: [
      "Predictive demand forecasting with 94.2% accuracy across 120,000 SKUs",
      "Automated purchase order dispatch with multi-tier supplier approval workflows",
      "Real-time warehouse spatial inventory heatmaps",
      "Automated anomaly alerts for sudden regional demand shifts",
      "Executive supply chain KPI analytics with exportable executive decks"
    ],
    technology: ["Python", "FastAPI", "React", "Pinecone", "TimescaleDB", "PostgreSQL", "Docker", "AWS"],
    developmentProcess: [
      { phase: "01 Data Pipeline Ingestion", detail: "Built ETL pipelines ingesting 5 years of historical POS data from 45 fulfillment centers." },
      { phase: "02 Model Training & Backtesting", detail: "Trained time-series ensemble models backtested against historical black swan events." },
      { phase: "03 High-Speed React UI", detail: "Constructed intuitive inventory management dashboards with sub-second chart rendering." },
      { phase: "04 ERP Integration & Go-Live", detail: "Connected automated webhooks to SAP and NetSuite ERPs." }
    ],
    results: [
      { metric: "$1.2M", label: "Annual Inventory Cost Savings" },
      { metric: "34%", label: "Reduction in Out-of-Stock Incidents" },
      { metric: "94.2%", label: "Demand Forecast Accuracy" },
      { metric: "120K+", label: "SKUs Autonomously Managed" }
    ],
    architecture: "An event-driven pipeline powered by Apache Kafka feeds telemetry to a Python FastAPI microservice cluster running optimized XGBoost and Transformer models. Predictions are written to PostgreSQL with caching in Redis.",
    testimonial: {
      quote: "The AI forecasting engine built by BuildZone paid for itself within the first 90 days of deployment. Our logistics operations are now fully proactive.",
      author: "Marcus Vance",
      role: "VP of Global Supply Chain",
      company: "OmniStock Logistics"
    }
  },
  {
    id: "cs-3",
    slug: "finvault-banking-portal",
    title: "FinVault: High-Concurrency Corporate Treasury & Multi-Currency Settlement",
    client: "FinVault Financial",
    industry: "FinTech & Banking",
    location: "London, United Kingdom",
    projectDuration: "8 Months",
    heroImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80",
    challenge: "FinVault required an institutional corporate banking portal capable of processing multi-currency payouts across 40 countries while strictly enforcing multi-signature authorization hierarchies and audit trails.",
    solution: "BuildZone engineered a resilient, high-speed corporate treasury platform with real-time currency conversion rates, automated compliance screening, and cryptographic transaction verification.",
    features: [
      "Multi-signature approval rules for large value corporate transfers",
      "Real-time FX currency settlement across 32 international currencies",
      "Automated Sanctions and PEP watchlist scanning",
      "Cryptographically signed immutable audit logs for compliance regulators",
      "Biometric push notifications for executive authorization"
    ],
    technology: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Redis", "AWS KMS", "Docker"],
    developmentProcess: [
      { phase: "01 Regulatory & Security Specs", detail: "Defined PCI-DSS Level 1 specifications, HSM key management, and SOC2 compliance boundaries." },
      { phase: "02 Core Ledger Development", detail: "Engineered double-entry bookkeeping ledger guaranteeing mathematical zero-sum integrity." },
      { phase: "03 Penetration Testing", detail: "Contracted independent third-party white-hat hackers for rigorous red-team security audits." },
      { phase: "04 Institutional Launch", detail: "Onboarded initial tier-1 multinational corporate clients with 24/7 dedicated engineering support." }
    ],
    results: [
      { metric: "$120M+", label: "Monthly Volume Processed" },
      { metric: "<100ms", label: "Ledger Transaction Latency" },
      { metric: "0", label: "Security Breaches / Audit Findings" },
      { metric: "32", label: "Global Currencies Supported" }
    ],
    architecture: "Utilizes event-sourcing with Kafka and PostgreSQL. Critical private keys and signing secrets are isolated in AWS Key Management Service (KMS) with strict hardware security module isolation.",
    testimonial: {
      quote: "BuildZone's architectural rigor and security mindset are world-class. They built a financial platform that our enterprise compliance teams signed off on immediately.",
      author: "Elena Rostova",
      role: "Head of Digital Infrastructure",
      company: "FinVault Financial"
    }
  }
];
