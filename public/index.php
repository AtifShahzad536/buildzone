<?php
/**
 * BuildZone Technology - SEO Server-Side Pre-Renderer & Dynamic Canonical Injector
 * Compatible with Hostinger / Apache / LiteSpeed Web Servers.
 */

// If requested file or directory exists physically, let Apache serve it directly
$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$cleanPath = trim($requestUri, '/');

// Do not interfere with API or existing static assets
if (strpos($cleanPath, 'api/') === 0 || $cleanPath === 'api') {
    require __DIR__ . '/api/index.php';
    exit;
}

$indexPath = __DIR__ . '/index.html';
if (!file_exists($indexPath)) {
    http_response_code(404);
    echo "Site index not found.";
    exit;
}

$html = file_get_contents($indexPath);

// Calculate Exact Canonical URL matching sitemap.xml
$canonicalUrl = 'https://buildzonetechnology.com' . ($cleanPath ? '/' . $cleanPath : '/');

// Route-Specific Meta Definitions for 100% SEO Health Score
$metaMap = [
    '' => [
        'title' => 'BuildZone | Best Software Agency in Sialkot',
        'desc' => 'BuildZone is the best software agency in Sialkot. We engineer custom software, mobile apps, enterprise ERPs, and AI solutions for global clients.'
    ],
    'services' => [
        'title' => 'Custom Software, Web & AI Services | BuildZone',
        'desc' => 'Explore custom software, mobile apps, ERP systems, web apps, and AI engineering services by BuildZone, the best software agency in Sialkot.'
    ],
    'portfolio' => [
        'title' => 'Client Portfolio & Shipped Products | BuildZone',
        'desc' => 'Explore 250+ enterprise web platforms, mobile apps, SaaS products, and custom AI systems built by BuildZone, the top-rated software agency in Sialkot.'
    ],
    'case-studies' => [
        'title' => 'Enterprise Engineering Case Studies | BuildZone',
        'desc' => 'Read architectural deep dives and business transformation results delivered by BuildZone, Sialkot\'s premier software engineering company.'
    ],
    'ai-development' => [
        'title' => 'AI Development & Solutions | BuildZone',
        'desc' => 'BuildZone delivers enterprise LLM applications, custom RAG pipelines, and AI automation agents for global businesses and Sialkot exporters.'
    ],
    'technologies' => [
        'title' => 'Modern Engineering Tech Stack | BuildZone',
        'desc' => 'Discover the battle-tested frontend, backend, mobile, cloud, and AI technologies used by BuildZone, the best software agency in Sialkot.'
    ],
    'industries' => [
        'title' => 'Industry Specific Software Engineering | BuildZone',
        'desc' => 'Tailored software systems, compliant medical apps, FinTech platforms, and manufacturing ERPs engineered by the best software agency in Sialkot.'
    ],
    'about' => [
        'title' => 'About Us | BuildZone',
        'desc' => 'Discover BuildZone, the best software agency in Sialkot. Learn about our engineering leadership, quality standards, and custom software development.'
    ],
    'team' => [
        'title' => 'Engineering Leadership & Team | BuildZone',
        'desc' => 'Meet BuildZone\'s elite digital engineering talent: Senior Software Developers, QA Engineers, AI Researchers, and Executive Architects in Sialkot, Pakistan.'
    ],
    'careers' => [
        'title' => 'Careers & Engineering Openings | BuildZone',
        'desc' => 'Join BuildZone\'s elite team of software developers, AI engineers, and system architects. High autonomy, top compensation, and remote work.'
    ],
    'blog' => [
        'title' => 'Engineering Blog & Architectural Insights | BuildZone',
        'desc' => 'In-depth technical articles, system design guides, and AI case studies published by senior architects at BuildZone, the best software agency in Sialkot.'
    ],
    'faq' => [
        'title' => 'Frequently Asked Questions | BuildZone',
        'desc' => 'Find answers on custom software development costs, project timelines, IP ownership, and SLAs from BuildZone, the best software agency in Sialkot.'
    ],
    'testimonials' => [
        'title' => 'Client Testimonials & Verified Reviews | BuildZone',
        'desc' => 'Read 150+ verified 5-star client reviews from founders and executives who partner with BuildZone, Sialkot\'s leading digital engineering firm.'
    ],
    'security' => [
        'title' => 'Security, Privacy & Enterprise Architecture | BuildZone',
        'desc' => 'Learn about BuildZone\'s enterprise security protocols, automated vulnerability scanning, SOC 2, HIPAA, and GDPR compliance standards.'
    ],
    'contact' => [
        'title' => 'Contact Our Engineering Team | BuildZone',
        'desc' => 'Connect with BuildZone, the best & top-rated software agency in Sialkot, Pakistan. Scope your next custom software, ERP system, mobile app, or AI solution.'
    ],
    'start-project' => [
        'title' => 'Start a Project — Architectural Scoping | BuildZone',
        'desc' => 'Launch your web, mobile, ERP, or AI project with BuildZone. Receive architect-reviewed requirements, milestone pricing, and tech recommendations in 24 hours.'
    ],
    'privacy-policy' => [
        'title' => 'Privacy Policy | BuildZone',
        'desc' => 'BuildZone Privacy Policy and data protection practices.'
    ],
    'terms-and-conditions' => [
        'title' => 'Terms and Conditions | BuildZone',
        'desc' => 'Terms of service and engineering agreement principles for BuildZone.'
    ],
    'cookie-policy' => [
        'title' => 'Cookie Policy | BuildZone',
        'desc' => 'BuildZone Cookie Policy and session telemetry.'
    ]
];

// Determine Title & Description
$pageMeta = $metaMap[$cleanPath] ?? null;

if (!$pageMeta) {
    // Dynamic Sub-routes handling (e.g. services/web-development, blog/slug, etc.)
    $parts = explode('/', $cleanPath);
    $mainSection = $parts[0] ?? '';
    $slugName = ucwords(str_replace('-', ' ', end($parts)));
    
    $pageMeta = [
        'title' => "{$slugName} — BuildZone",
        'desc' => "Explore {$slugName} engineered by BuildZone Technology, the best software agency in Sialkot delivering enterprise digital products."
    ];
}

// 1. Inject Exact Canonical Link Tag
$canonicalTag = "\n  <link rel=\"canonical\" href=\"{$canonicalUrl}\" />";
$html = preg_replace('/<\/head>/i', "{$canonicalTag}\n</head>", $html, 1);

// 2. Replace Title Tag if defined
if (!empty($pageMeta['title'])) {
    $html = preg_replace('/<title>.*?<\/title>/is', "<title>{$pageMeta['title']}</title>", $html, 1);
}

// 3. Replace Meta Description Tag if defined
if (!empty($pageMeta['desc'])) {
    $html = preg_replace('/<meta\s+name=["\']description["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta name=\"description\" content=\"{$pageMeta['desc']}\" />", $html, 1);
}

// Send standard headers and content
header("Content-Type: text/html; charset=UTF-8");
header("Cache-Control: no-cache, no-store, must-revalidate");
echo $html;
