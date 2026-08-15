/**
 * THE SINGLE SOURCE OF TRUTH for all site content.
 * Edit here and every section updates automatically.
 */

export const profile = {
  name: "Indra Giri",
  firstName: "Indra",
  lastName: "Giri",
  initials: "IG",
  location: "Kathmandu, Nepal",
  email: "girindra075@gmail.com",
  phone: "+977 9856077413",
  phoneHref: "+9779856077413",
  /* wa.me requires digits only: no plus sign, spaces or dashes. */
  whatsapp: "9779856077413",
  availability: "Open to research and AI collaborations",
  linkedin: "https://www.linkedin.com/in/indra-giri-72aba3a7/",
  facebook: "https://www.facebook.com/indra.giri.564",
  // Sankhya AI is the AI unit of Sankhya Solutions Pvt. Ltd.
  // NAMING RULE: use "Sankhya AI" in AI / training contexts, "Sankhya Solutions"
  // in research and evaluation contexts. Do not mix the two in one sentence.
  // URL is a placeholder until the site exists; components must render the link
  // ONLY when `url` is non-empty (see UPGRADE-INSTRUCTIONS.md, workstream E).
  sankhya: {
    name: "Sankhya AI",
    parent: "Sankhya Solutions Pvt. Ltd.",
    role: "Co-founder",
    url: "", // TODO: set real Sankhya AI website URL when live
    blurb: "The AI training and analytics unit of Sankhya Solutions Pvt. Ltd., Kathmandu.",
  },
  github: "https://github.com/indragiri-ai",
  arxiv: "https://arxiv.org/abs/2602.00138",
  cvPath: "/cv/Indra_Giri_CV.pdf",
  portrait: "/images/portrait.jpg",
  aboutPhoto: "/images/about.svg",
  tagline:
    "AI Generalist, researcher and educator helping organisations turn data into decisions and evidence into impact.",
  heroIntro:
    "I combine a decade of rigorous field research with modern AI practice. I design studies, train professionals in AI and analytics, and build evidence that shapes policy and programs across Nepal, South Asia and beyond.",
};

/**
 * WhatsApp deep link. Opens the app on mobile and WhatsApp Web on desktop, with
 * the first message pre-typed so an enquiry arrives with context rather than a
 * bare "hi". The visitor can edit it before sending.
 */
export const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  "Hello Indra, I found your website and would like to talk about a training or research project."
)}`;

export const roles = [
  "AI Generalist",
  "Senior Researcher",
  "AI Trainer",
  "Data Analyst",
  "Economist",
  "University Educator",
];

export const stats = [
  { value: 10, suffix: "+", label: "Years of research" },
  { value: 12, suffix: "+", label: "Research projects" },
  { value: 5, suffix: "+", label: "AI & data trainings" },
  { value: 6, suffix: "+", label: "Publications" },
];

export const clients = [
  "World Vision International",
  "University of Pittsburgh",
  "Heifer International",
  "iDE Nepal",
  "AEPC · Govt. of Nepal",
  "Hoover Institution",
  "Anahata Nepal",
];

export const about = {
  lead: "Good data, asked the right questions, can change lives.",
  paragraphs: [
    "Over the past decade I have led research across Nepal, India and beyond. I design studies, train field teams, run the analysis and turn raw evidence into recommendations that shape policy and programs. My work has reached brick kiln families, smallholder farmers, government officers and children in vulnerable communities.",
    "Today I bring artificial intelligence into that same discipline. I train professionals and students in generative AI, study how AI is being adopted in Nepal, and use AI tools to make research faster, deeper and more reliable. The goal has not changed: better evidence and better decisions.",
  ],
  photoCaption: "Field work, Nepal",
  mapLabel: "Field footprint",
  mapTitle: "Where the research has taken me",
  mapIntro:
    "Every district below is somewhere I have run fieldwork: household surveys, key informant interviews, focus groups and field observation. Hover or tap a district to see the project and the year. Fieldwork across India is not shown here.",
  pillars: [
    {
      tag: "field",
      title: "The Researcher",
      text: "End to end impact evaluations, value chain studies and mixed methods research for international organisations and governments.",
    },
    {
      tag: "lab",
      title: "The AI Practitioner",
      text: "Generative AI training, AI readiness research and AI assisted analytics. Helping people and organisations work confidently with AI.",
    },
    {
      tag: "classroom",
      title: "The Educator",
      text: "Economics, research methods and data analysis across four universities, mentoring students to think critically and reason with evidence.",
    },
  ],
};

/* ── AI practice ─────────────────────────────────────────────── */

export const aiPractice = {
  intro:
    "I work across the full spectrum of applied AI: training people to use it well, researching how it is adopted, and building it into the research workflow itself.",
  offerings: [
    {
      icon: "school",
      title: "AI Training & Capacity Building",
      desc: "Practical generative AI programs for professionals, universities and organisations.",
      points: [
        "Generative AI and prompt engineering workshops",
        "AI readiness assessments for organisations",
        "Custom curricula for research and business teams",
      ],
    },
    {
      icon: "bulb",
      title: "AI Research & Policy",
      desc: "Evidence on how AI is adopted in Nepal and what effective AI policy should look like.",
      points: [
        "AI awareness study presented at the 4th National Economist Conference",
        "Op-eds on AI policy in national media",
        "Research on the digital divide and AI readiness",
      ],
    },
    {
      icon: "robot",
      title: "AI in the Research Workflow",
      desc: "Using AI to make every stage of research faster, deeper and more reliable.",
      points: [
        "AI assisted survey design and qualitative coding",
        "Automated data cleaning, analysis and reporting",
        "LLM powered literature reviews and synthesis",
      ],
    },
  ],
  toolkit: [
    "ChatGPT",
    "Claude",
    "Gemini",
    "Prompt engineering",
    "Custom GPTs",
    "Python for AI",
    "API automation",
    "NotebookLM",
    "AI agents",
    "RAG workflows",
  ],
  highlights: [
    {
      label: "Conference",
      text: "Presented research on AI awareness among professionals in Nepal at the 4th National Economist Conference.",
    },
    {
      label: "Media",
      text: "Published op-eds on AI policy and the AI revolution in The Himalayan Times and Nagarik Dainik.",
    },
    {
      label: "Training",
      text: "Designed and delivered generative AI and prompt engineering programs through Sankhya AI.",
    },
  ],
};

/* ── Research projects ───────────────────────────────────────── */

export type ProjectCategory = "impact" | "valuechain" | "social" | "market" | "ai";

export interface Project {
  org: string;
  title: string;
  desc: string;
  loc: string;
  status: "ongoing" | "completed";
  cat: ProjectCategory[];
  tags: string[];
  big?: boolean; // spans 2 cols in the grid
}

export const projectFilters: { key: "all" | ProjectCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI & tech" },
  { key: "impact", label: "Impact evaluation" },
  { key: "valuechain", label: "Value chain" },
  { key: "social", label: "Social research" },
  { key: "market", label: "Market study" },
];

export const projects: Project[] = [
  {
    org: "World Vision International",
    title: "Endline Evaluation: Brick Plus Project",
    desc: "Phase II impact evaluation for brick kiln workers and their families across Lalitpur, Harisiddhi and Chandragiri. Household and children surveys, KII and FGD, with end to end analysis.",
    loc: "Lalitpur, Nepal",
    status: "ongoing",
    cat: ["impact"],
    tags: ["Mixed methods", "Household survey", "KII", "FGD"],
    big: true,
  },
  {
    org: "Sankhya AI",
    title: "AI Training & Readiness Programs",
    desc: "Designing and delivering generative AI and prompt engineering training for professionals, with AI readiness assessments for organisations.",
    loc: "Kathmandu, Nepal",
    status: "ongoing",
    cat: ["ai"],
    tags: ["Generative AI", "Training", "AI readiness"],
  },
  {
    org: "Neeti Anusandhan Pratishthan",
    title: "Value Chain Analysis of Large Cardamom",
    desc: "Mapping bottlenecks from farm to export across Nepal and India.",
    loc: "Eastern Nepal & India",
    status: "ongoing",
    cat: ["valuechain"],
    tags: ["Value chain", "KII", "Survey"],
  },
  {
    org: "University of Pittsburgh",
    title: "Attitudes on the Quota System",
    desc: "Country researcher studying perceptions among government officers nationwide.",
    loc: "Nepal (national)",
    status: "ongoing",
    cat: ["social"],
    tags: ["Quantitative", "Policy"],
  },
  {
    org: "Chingad Rural Municipality",
    title: "N-WASH Municipality Plan",
    desc: "Municipal WASH planning per DWSSM guidelines with GPS based mobile data collection.",
    loc: "Surkhet, Nepal",
    status: "completed",
    cat: ["impact"],
    tags: ["N-WASH MIS", "GPS data"],
  },
  {
    org: "Anahata Nepal",
    title: "Internal Child Sex Trafficking Study",
    desc: "Mapping vulnerability hotspots in Kathmandu across physical, economic, mental and environmental safety. Completed November 2025.",
    loc: "Kathmandu, Nepal",
    status: "completed",
    cat: ["social"],
    tags: ["Mixed methods", "Survey"],
  },
  {
    org: "World Vision International",
    title: "Landscape Analysis of Urbanisation",
    desc: "Urbanisation's impact on children across four municipalities, with stakeholder mapping.",
    loc: "4 municipalities, Nepal",
    status: "completed",
    cat: ["social"],
    tags: ["Secondary data", "KII", "FGD"],
  },
  {
    org: "World Vision International",
    title: "Child-focused Qualitative Research",
    desc: "Field research with students, teachers, officials and parents, synthesised into policy implications.",
    loc: "Jajarkot · Jumla · Kailali",
    status: "completed",
    cat: ["social"],
    tags: ["Qualitative", "KII", "FGD"],
  },
  {
    org: "Heifer International",
    title: "Dairy Market Study",
    desc: "Mixed methods study of the dairy market across six districts with strategic recommendations.",
    loc: "6 districts, Nepal",
    status: "completed",
    cat: ["market"],
    tags: ["Mixed methods", "Survey"],
    big: true,
  },
  {
    org: "iDE Nepal",
    title: "Impact Evaluation: Vegetable Collection Centres",
    desc: "Collection centre outcomes via surveys, FGD, KII and field observation.",
    loc: "Kaski & Tanahun",
    status: "completed",
    cat: ["impact", "market"],
    tags: ["Impact eval", "Field obs."],
  },
  {
    org: "AEPC · Govt. of Nepal",
    title: "Improved Cooking Stove & Biogas Evaluation",
    desc: "Quantitative impact evaluation of the clean cooking programme under the Ministry of Energy.",
    loc: "Nepal",
    status: "completed",
    cat: ["impact"],
    tags: ["Quantitative", "Govt."],
  },
  {
    org: "Sankhya AI",
    title: "AI Awareness Among Professionals in Nepal",
    desc: "Exploratory study on AI adoption, presented at the 4th National Economist Conference.",
    loc: "Nepal",
    status: "completed",
    cat: ["ai"],
    tags: ["Exploratory", "AI policy"],
  },
];

/* ── Built and published ─────────────────────────────────────── */

/**
 * Things Indra has built and put online, as opposed to studies he has run.
 * Every URL here was checked live: keep it that way, a dead link on a
 * portfolio is worse than no link.
 */
export interface BuiltProject {
  title: string;
  desc: string;
  url: string;
  /** Shown under the title. */
  meta: string;
  tags: string[];
  status: "live" | "in progress";
  /** Screenshot in /public. Only the featured entry needs one. */
  image?: string;
  /** One line for the feature band, shorter and punchier than `desc`. */
  headline?: string;
  /** Exactly one entry should carry this: it gets the band under the hero. */
  featured?: boolean;
}

export const builtProjects: BuiltProject[] = [
  {
    title: "Nepal Data Portal",
    desc: "A provenance-first open data warehouse for Nepal: every figure carries its source, its collection date and its caveats, so a number can be traced back to the institution that published it. Phase 1 is live; Nepali calendars, federal geography and NRB and Census series are in progress.",
    // NOTE: the repo's own homepage field points at nepal-data-base-project.vercel.app,
    // which 404s. This is the working deployment.
    url: "https://nepal-data-base-project-7oru.vercel.app",
    meta: "Supabase · Postgres · FastAPI · Next.js",
    tags: ["Open data", "Data engineering", "Nepal"],
    status: "in progress",
    image: "/images/nepal-data-portal.jpg",
    headline:
      "Official statistics about Nepal's economy, banking system and society, collected from primary sources and archived so that every number can be traced back to who published it.",
    featured: true,
  },
  {
    title: "AI for Teachers: A Practical Handbook",
    desc: "A free, step-by-step handbook for Nepali school teachers covering Gemini, prompting, Gems, Gemini Notebook and Claude. Written from the teacher training sessions and kept classroom-ready rather than theoretical.",
    url: "https://indragiri-ai.github.io/AI-Training-Teacher/",
    meta: "Free handbook · Open to anyone",
    tags: ["AI training", "Teachers", "Open resource"],
    status: "live",
  },
];

/* ── Publications ────────────────────────────────────────────── */

export const featuredPaper = {
  title:
    "Regulatory Migration to Europe: ICO Reallocation Following U.S. Securities Enforcement",
  desc: "Cross border regulatory spillovers in crypto asset markets after the SEC's 2017 DAO Report. A global ICO dataset covering 2014 to 2021 and region month panel regressions document a substantial reallocation of activity toward Europe after 2017.",
  url: "https://arxiv.org/abs/2602.00138",
  coauthors: [
    { initials: "KS", name: "Krishna Sharma", aff: "Hoover Institution, Stanford University" },
    { initials: "KB", name: "Khemraj Bhatt", aff: "First Citizen Bank, NC" },
    { initials: "IG", name: "Indra Giri", aff: "Sankhya Solutions Pvt. Ltd., Nepal" },
  ],
};

export const workingPapers = [
  {
    title: "Two Faces of FDI in India",
    meta: "Panel data analysis of FDI's dual impact on economic growth and environmental degradation, arguing for a sustainable FDI policy.",
    venue: "",
    chips: ["Panel data", "Stata · R"],
  },
  {
    title: "Factors Affecting Internal Labour Migration in India",
    meta: "Unemployment, urban facilities and education identified as key migration drivers (NSSO 64th Round).",
    venue: "Master's dissertation · South Asian University",
    chips: ["Logistic regression", "Stata"],
  },
];

export const conferencePapers = [
  {
    title: "Awareness & Use of AI Among Professionals in Nepal",
    venue: "4th National Economist Conference",
    meta: "Rastriya Arthik Sarokar Samaj",
  },
  {
    title: "Digital Divide in Nepal",
    venue: "Martin Chautari Annual Conference",
    meta: "2025",
  },
];

export const mediaArticles = [
  { title: "Making AI Policy Truly Effective", venue: "The Himalayan Times", meta: "Op-ed" },
  { title: "एआई क्रान्तिमा ऊर्जाको आवश्यकता", venue: "Nagarik Dainik", meta: "Opinion (Nepali)" },
];

/* ── Skills ──────────────────────────────────────────────────── */

/**
 * Software proficiency. Deliberately NO numeric scores: self assigned
 * percentages read as junior and invite unflattering comparisons. Tier plus a
 * short line of real evidence carries more weight. Keep `use` factual.
 */
export type ToolTier = "Expert" | "Advanced";

export const tools: { name: string; tier: ToolTier; use: string }[] = [
  { name: "Generative AI", tier: "Expert", use: "Training curricula, prompt design, AI assisted analysis" },
  { name: "Stata", tier: "Expert", use: "Panel, time series and impact evaluation analysis" },
  { name: "SPSS", tier: "Expert", use: "Survey cleaning, hypothesis testing, teaching" },
  { name: "Excel", tier: "Expert", use: "Advanced modelling, reporting, KUSOM training program" },
  { name: "KoboToolbox", tier: "Expert", use: "Mobile data collection across field studies" },
  { name: "R", tier: "Advanced", use: "Econometrics and reproducible analysis" },
  { name: "Tableau", tier: "Advanced", use: "Dashboards and logistics reporting" },
  { name: "Python", tier: "Advanced", use: "Automation, API workflows, AI tooling" },
];

export const researchMethods = [
  "Impact evaluation",
  "Value chain analysis",
  "Mixed methods",
  "Survey design",
  "KII & FGD",
  "Field observation",
  "Sampling methodology",
  "Desk review",
];

export const analyticalTechniques = [
  "Regression analysis",
  "Panel data methods",
  "Time series analysis",
  "Causal inference",
  "Predictive modelling",
  "Classification",
  "Clustering",
  "Prompt engineering",
];

export const languages = [
  { name: "Nepali", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
];

/* ── Teaching ────────────────────────────────────────────────── */

export const teachingMetrics = [
  { num: "4", label: "Universities" },
  { num: "8+", label: "Courses taught" },
  { num: "5", label: "Training programs" },
  { num: "4+", label: "Years teaching" },
];

export const universities = [
  {
    name: "National College",
    aff: "Kathmandu University affiliation",
    role: "Visiting Faculty",
    period: "2024 - Present",
    courses: ["Development Economics", "ICT & Digital Services", "Proposal Writing", "Social Entrepreneurship"],
  },
  {
    name: "Southwestern State College",
    aff: "Tribhuvan University affiliation",
    role: "Visiting Faculty",
    period: "2025 - Present",
    courses: ["Microeconomics", "Macroeconomics", "BBM 1st & 2nd sem"],
  },
  {
    name: "Subhashree College of Management",
    aff: "Pokhara University affiliation",
    role: "Visiting Faculty",
    period: "2025 - Present",
    courses: ["Business Research Methods", "BBA 5th sem"],
  },
  {
    name: "Prithvi Narayan Campus",
    aff: "Pokhara · Tribhuvan University",
    role: "Visiting Lecturer",
    period: "2023",
    courses: ["Data Analysis with Stata", "Panel & time series"],
  },
];

/**
 * Training programs. `title` and `sub` are live on the site today.
 *
 * TODO(owner): `audience`, `format` and `covers` render ONLY when filled, so
 * the /training page stays honest while they are empty. Fill them from the
 * signature programs in the tracker file and the page gets substantially
 * stronger. Do not invent curriculum details here.
 */
export interface Training {
  title: string;
  sub: string;
  /** e.g. "Researchers, analysts, faculty" */
  audience?: string;
  /** e.g. "4 days, in person" */
  format?: string;
  /** Session or module list. */
  covers?: string[];
}

export const trainings: Training[] = [
  {
    title: "Generative AI & Prompt Engineering",
    sub: "Text generation, automation and AI readiness assessments",
  },
  {
    title: "Advanced Analytics",
    sub: "Econometrics and modelling in Stata, R and Python",
  },
  {
    title: "Statistical Analysis with SPSS",
    sub: "Cleaning, hypothesis testing and interpretation",
  },
  {
    title: "Survey & Questionnaire Design",
    sub: "Sampling methodology and robust data collection",
  },
  {
    title: "Excel for Analysis",
    sub: "Advanced formulas, charts and reporting",
  },
];

export const trainingIntro =
  "Practical, hands on programs for professionals, university faculty and student cohorts. Every session is built around real data and the decisions people actually have to make, not toy examples.";

/* ── Career journey ──────────────────────────────────────────── */

export type JourneyType = "current" | "work" | "edu";

export interface JourneyItem {
  type: JourneyType;
  role: string;
  org: string;
  loc: string;
  period: string;
  desc: string;
  tools: string[];
}

export const journey: JourneyItem[] = [
  {
    type: "current",
    role: "Senior Researcher & AI Lead",
    org: "Sankhya Solutions Pvt. Ltd.",
    loc: "Kathmandu, Nepal",
    period: "2023 - Present",
    desc: "Leading end to end research and impact evaluations for INGOs, governments and universities. Managing data teams, AI readiness research and analytics, and designing the firm's AI training programs.",
    tools: ["Generative AI", "Stata", "R", "Python", "SPSS", "KoboToolbox", "Tableau"],
  },
  {
    type: "work",
    role: "Managing Director",
    org: "Multistar Motors Pvt. Ltd.",
    loc: "Pokhara, Nepal",
    period: "2021 - 2023",
    desc: "Ran the authorised Motorhead Bikes dealership for Pokhara. Owned sales strategy, marketing and the customer experience end to end, from showroom operations to after sales handling.",
    tools: ["Sales strategy", "Marketing", "Customer experience"],
  },
  {
    type: "work",
    role: "Senior Research Associate",
    org: "Pixstory Interface Network & IT",
    loc: "New Delhi, India",
    period: "2020 - 2021",
    desc: "Analysed user behaviour and engagement data from Google Analytics and surveys. Evaluated market demand for new products and services.",
    tools: ["Excel", "Stata", "Google Analytics"],
  },
  {
    type: "work",
    role: "Research Manager, Logistics",
    org: "Ebix Inc.",
    loc: "Noida, India",
    period: "2017 - 2020",
    desc: "Led the research department for logistics. Predictive market analysis, cost saving strategy, route planning and live truck tracking dashboards.",
    tools: ["Tableau", "Stata", "Excel"],
  },
  {
    type: "work",
    role: "Senior Research Analyst",
    org: "Project Guru Pvt. Ltd.",
    loc: "Gurugram, India",
    period: "2015 - 2017",
    desc: "Field data quality, consumer market research, and client support on pricing, distribution and product mix strategy.",
    tools: ["Stata", "SPSS", "EViews", "Excel"],
  },
  {
    type: "edu",
    role: "Master of Economics",
    org: "South Asian University (SAU)",
    loc: "New Delhi, India",
    period: "2013 - 2015",
    desc: "Dissertation on internal labour migration in India (NSSO 64th Round) using logistic regression, supervised by Dr. Namrata Gulati.",
    tools: ["Stata", "Econometrics"],
  },
  {
    type: "work",
    role: "Intern",
    org: "SAARC Secretariat",
    loc: "Kathmandu, Nepal",
    period: "Early career",
    desc: "Report on the SAARC Development Fund covering ongoing projects, status and implementation challenges.",
    tools: ["Excel", "PowerPoint"],
  },
  {
    type: "edu",
    role: "BA in Economics",
    org: "University of Delhi · Shivaji College",
    loc: "New Delhi, India",
    period: "2009 - 2012",
    desc: "Foundation in economic theory, statistics and quantitative reasoning.",
    tools: [],
  },
];

/* ── Navigation ──────────────────────────────────────────────── */

/**
 * Seven items, deliberately. Publications and Journey came out when they became
 * their own pages: they are reached from the summary blocks on the home page.
 * Anything longer than about seven reads as a site map rather than navigation.
 */
export const navLinks = [
  { href: "/#about", label: "About" },
  /* AI is a standalone page, not an anchor: it is the deepest part of the site
     and the section on the home page is only a teaser for it. */
  { href: "/ai", label: "AI" },
  { href: "/projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/#teaching", label: "Teaching" },
  /* Media is deliberately NOT in the nav: the gallery has a prominent block on
     the home page, and eight items starts reading as a site map. */
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];
