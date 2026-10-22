/*
 * The CV, as data. The home page renders it and /cv.pdf (app/cv.pdf/route.ts)
 * typesets it, so editing this file updates both on the next deploy.
 *
 * Keep it plain data (no React, no icons) so both the client home page and
 * the server-side PDF renderer can import it.
 */

export const NAME = "Gafar Aleshe";
export const TITLE = "Software Engineer";
export const LOCATION = "Portsmouth, United Kingdom";

export const EMAIL = "gafaraleshe2411@gmail.com";
export const PHONE = "+44 7882 655541";
export const PHONE_HREF = "tel:+447882655541";
export const SITE_URL = "https://gafaraleshe.com";
export const GITHUB_URL = "https://github.com/gafaraleshe";
export const LINKEDIN_URL = "https://www.linkedin.com/in/gafaraleshe/";

// The generated CV, and the file name it downloads as.
export const CV_PDF = "/cv.pdf";
export const CV_FILENAME = "Gafar_Aleshe_CV.pdf";

// One paragraph for the top of the PDF; the home page writes its own intro
// with links.
export const summary =
  "Software engineer and Computer Science student in Portsmouth, UK, working across full-stack and frontend development. I build accessible, type-safe web apps with TypeScript, React, Next.js and Node.js — 25+ shipped at FrontToBack — and I'm building Hermite Labs, software for creative businesses, starting with the HermiteFlow CRM and invoicing app.";

export type Experience = {
  company: string;
  companyHref: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "FrontToBack",
    companyHref: "https://fronttobackdev.com/",
    role: "Frontend Developer & Creative Director",
    location: "Portsmouth, UK",
    start: "Dec 22",
    end: "Now",
    bullets: [
      "Built and deployed 25+ production web applications end to end, from requirements gathering through deployment, delivering responsive, accessible, mobile-first interfaces.",
      "Turned ambiguous, loosely defined client briefs into clear technical requirements and scoped tasks, explaining technical trade-offs to non-technical clients.",
      "Implemented e-commerce functionality and SEO integrations using WooCommerce and Yoast, contributing to 3.2× lead growth while maintaining 98% client retention.",
      "Coordinated work with clients and team members through Slack and Trello, communicating progress in writing and verbally and delivering against deadlines.",
      "Led digital content and web strategy across client projects, contributing to growth of 13K+ Instagram and 70K+ TikTok followers and generating 10M+ views.",
    ],
  },
  {
    company: "SHOTBYGAFAR",
    companyHref: "https://shotbygafar.com",
    role: "Founder & Creative Director",
    location: "Portsmouth, UK",
    start: "Aug 24",
    end: "Now",
    bullets: [
      "Professional photography and videography services for brands, events, and businesses — 25+ clients, five-figure revenue.",
      "Managed end-to-end client workflow from briefs to delivery, handling scheduling, contracts, and revisions.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  // Shown beside the name: live sites, or the context for coursework.
  links?: { label: string; href: string }[];
  context?: string;
  bullets: string[];
};

export const projects: Project[] = [
  {
    name: "Hermite Labs",
    tagline: "Full-stack SaaS platform for creative businesses",
    stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker"],
    links: [
      { label: "hermitelabs.com", href: "https://hermitelabs.com" },
      { label: "flow.hermitelabs.com", href: "https://flow.hermitelabs.com" },
    ],
    bullets: [
      "Architected a multi-tier SaaS platform (Next.js/React client, Node.js API services, PostgreSQL data layer) in a TypeScript monorepo, defining the system design from an open-ended product idea.",
      "Developed HermiteFlow, a CRM and invoicing application supporting client management, invoice generation, business workflows and automated UK VAT calculations.",
      "Designed type-safe API workflows backed by PostgreSQL, implementing authentication, role-based access control and validated data handling.",
      "Containerised services with Docker and implemented automated testing and CI/CD workflows using Jest and GitHub Actions, with version control in Git.",
    ],
  },
  {
    name: "Compound",
    tagline: "Secure studio booking system",
    stack: ["React", "Node.js", "Express", "SQLite"],
    context: "University coursework",
    bullets: [
      "Built a three-tier booking application for studio rooms and equipment: React client, Express REST API and SQLite database, supporting full CRUD workflows.",
      "Designed the database schema in SQL DDL and applied secure-by-design practices, evaluating multi-factor authentication approaches for user login.",
      "Audited the application against the OWASP Top 10 (2021), articulating risks and mitigations in a Harvard-referenced technical report and recorded demo.",
    ],
  },
  {
    name: "University Library Management System",
    tagline: "Relational database design",
    stack: ["MySQL", "SQL"],
    context: "University coursework",
    bullets: [
      "Modelled a university library's books, copies, members, staff, loans and fines as a 9-table ERD, normalised step by step from UNF to Third Normal Form.",
      "Implemented the schema in MySQL with primary/foreign key constraints, triggers and indexes; wrote queries using joins, set operations, grouping and aggregates, analysing performance with EXPLAIN.",
      "Used AI-assisted development (Claude) under the module's declared-AI policy, testing every query and presenting the design decisions in a written report and live demo.",
    ],
  },
];

export const skills: [string, string[]][] = [
  ["Language", ["TypeScript", "JavaScript", "Python"]],
  [
    "Frontend",
    [
      "React",
      "Next.js",
      "Vue",
      "Redux",
      "Tailwind CSS",
      "Vite",
      "HTML5",
      "CSS3",
      "TanStack Query",
      "React Hook Form",
    ],
  ],
  [
    "Backend",
    ["Node.js", "Express", "REST APIs", "JWT", "OAuth 2.0", "WebAuthn"],
  ],
  [
    "Data",
    ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "SQL", "Drizzle ORM", "Zod"],
  ],
  [
    "DevOps & Testing",
    [
      "AWS",
      "Docker",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Jest",
      "Cypress",
      "TDD",
    ],
  ],
  [
    "Accessibility",
    [
      "Semantic HTML",
      "WCAG",
      "ARIA",
      "Keyboard Accessibility",
      "Screen Readers",
    ],
  ],
];

export type Entry = { name: string; detail: string; note?: string };

export const education: Entry[] = [
  {
    name: "University of Essex Online",
    detail: "BSc Computer Science, graduating 2028",
    note: "Data Structures & Algorithms, Object-Oriented Programming, Web Application Development, Data Modelling",
  },
  {
    name: "Havant and South Downs College",
    detail: "A Levels in Computer Science, Maths & Further Maths, 2023–25",
  },
];

export const certifications: Entry[] = [
  { name: "CS50x", detail: "Introduction to Computer Science, HarvardX" },
  {
    name: "Full-Stack & Python Pro",
    detail: "Bootcamps by Dr Angela Yu",
  },
  { name: "AWS Cloud Practitioner", detail: "Essentials, AWS on edX" },
  { name: "AWS Educate", detail: "Introduction to Generative AI" },
];
