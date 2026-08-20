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
  aboutPhoto: "/images/about.jpg",
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
  "Kathmandu University School of Management",
  "Chingad Rural Municipality",
  "Durbar High School",
];

export const about = {
  lead: "Good data, asked the right questions, can change lives.",
  paragraph:
    "Over the past decade I have led research across Nepal, India and beyond, and today I bring artificial intelligence into that same discipline: training professionals, studying how AI is adopted in Nepal, and using AI tools to make research faster, deeper and more reliable. The goal has not changed: better evidence and better decisions.",
  photoCaption: "Teaching a generative AI session",
};

/**
 * Nepal fieldwork map intro. Lives here (not under `about`) because the map
 * itself now sits inside the Research section: it is the district level
 * record of where the research projects below actually happened.
 */
export const fieldworkIntro = {
  label: "Field footprint",
  title: "Where the research has taken me",
  intro:
    "Every district below is somewhere I have run fieldwork: household surveys, key informant interviews, focus groups and field observation. Hover or tap a district to see the project and the year. Fieldwork across India is not shown here.",
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
      title: "AI and Automation",
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

export interface MediaArticle {
  slug: string;
  title: string;
  venue: string;
  meta: string;
  /** Real publish date, e.g. "21 February 2025". Shown on the article page footer. */
  date: string;
  /** Where it ran, e.g. "Kathmandu, Nepal". */
  place: string;
  /** The full published text, one paragraph per entry, reproduced verbatim from the original. */
  body: string[];
}

export const mediaArticles: MediaArticle[] = [
  {
    slug: "the-digital-key-to-political-stability",
    title: "The Digital Key to Political Stability: Government Must Adapt to the Technology",
    venue: "The Himalayan Times",
    meta: "Op-ed · with Bishu Giri",
    date: "13 January 2026",
    place: "Kathmandu, Nepal",
    body: [
      "Nepal's youth are tech-fluent while the government lags behind in digital adoption. This disconnect represents a significant challenge for political stability and governance in the country.",
      "When Singha Durbar caught fire recently, citizens expressed concern about the data centre's safety, recognizing its critical importance for government operations. New generations understand digital infrastructure's role in national functioning, yet the government has not kept pace with technological expectations.",
      "Nepal established a federal republic system after considerable political struggle, yet ordinary citizens report minimal improvement in daily life. Accessing public services remains burdensome, and political affiliation determines service accessibility rather than merit or need. This rent-seeking culture perpetuates inefficiency across government systems.",
      "Generation Z, having grown up with smartphones and internet access, finds this unacceptable. They demand efficient systems where bribes and party loyalty prove unnecessary for basic services. The recent youth protests partially reflected frustration with government's failure to embrace technology.",
      "The authors propose four pillars for Nepal's digital transformation:",
      "Policy Integration: Nepal possesses a Digital Nepal Framework requiring updates. Recent initiatives include a National AI Policy and cybersecurity legislation. However, these policies exist in isolation when they should coordinate, since digitalization creates data for AI systems, cybersecurity protects that data, and frameworks must integrate all components.",
      "People and Literacy: Despite 80 percent mobile phone ownership, only 31 percent demonstrate digital literacy. Citizens primarily use phones for social media, unaware of government services, banking, and shopping availability online. Government must address this knowledge gap through comprehensive literacy programs teaching service navigation, fraud recognition, and data protection.",
      "Infrastructure Development: Private sector progress significantly exceeds government efforts. Financial institutions and fintech companies adapted quickly; 28 million use mobile banking, and QR transactions increased substantially. Apps like Pathao and Indrive demonstrate urban adoption success. However, the government's Nagarik App faces serious implementation challenges, with inconsistent performance across Apple and Android platforms.",
      "Government should function as infrastructure enabler by expanding WiFi networks, data storage facilities, and network towers to reach remote areas. Digital benefits must extend nationwide, reducing the digital divide.",
      "Security Concerns: Increased digitalization creates vulnerability to cyber attacks from distant locations. Nations worldwide have experienced disruptions from hacking. As adoption grows, systems become increasingly vulnerable. Nepal should collaborate with international organizations like the World Bank on cyber resilience initiatives and develop domestic data centres requiring stable power and water infrastructure.",
      "Successful digitalization means simplified processes: renewing driving licenses without queues, obtaining tax clearance through clicks, and registering businesses without intermediaries. Estonia provides a successful international model for digital transformation that Nepal might emulate.",
      "The authors conclude that Nepal's youth expect governmental modernization. While steps toward digitalization exist, implementation speed fails to meet citizen expectations for change.",
      "Bishu works as a data scientist at the World Bank's Washington D.C. headquarters; Indra serves as a lecturer at BridgeAI Academy in Kathmandu.",
    ],
  },
  {
    slug: "making-ai-policy-truly-effective",
    title: "Making AI Policy Truly Effective",
    venue: "The Himalayan Times",
    meta: "Op-ed · with Bishu Giri and Krishna Sharma",
    date: "21 February 2025",
    place: "Kathmandu, Nepal",
    body: [
      "A robust foundation must precede sweeping regulations.",
      "Is AI the 'Amrita', the nectar of immortality, or must it first pass through the churning of the cosmic ocean-unleashing both divine wisdom and unforeseen chaos before it becomes a true elixir for humanity?",
      "AI, like the fabled 'Amrita', holds the potential to be a nectar of economic and social prosperity, granting Nepal unprecedented opportunities in governance, healthcare, education and business. However, just as the cosmic ocean had to be churned before yielding its divine elixir, AI must also undergo rigorous scrutiny, infrastructure strengthening and regulatory clarity before it can be harnessed for the collective good. The National Artificial Intelligence Policy 2081 aspires to regulate and facilitate AI in Nepal, but does it provide a concrete roadmap to ensure AI serves the country rather than overwhelming it?",
      "The policy outlines broad objectives but fails to address how they will be implemented. It lacks a clear action plan detailing the responsible agencies, funding mechanisms and measurable outcomes. A well-crafted policy must go beyond abstract goals and specify how Nepal will build an AI ecosystem that aligns with its economic and technological realities. Otherwise, Nepal risks falling into the trap of ambitious policies that remain only on paper.",
      "Nepal's AI policy draft emphasizes university collaboration, yet research and development remain weak due to inadequate funding and institutional support. Policymakers highlight academic partnerships, but the reality is starkly different, as seen in the struggles of the National Innovation Centre. India's IITs have propelled a startup boom with over 100 unicorns, showcasing the power of strong educational ties. Meanwhile, Nepal allocates less than 1% of GDP to R&D, leaving institutions like NAST underfunded. Without a clear financing strategy for AI labs, research hubs, and curriculum integration, Nepal will remain reliant on foreign solutions, missing the chance to nurture domestic talent and innovation.",
      "Beyond research, Nepal's broader digital ecosystem remains underdeveloped. The policy assumes AI can flourish without addressing core digital weaknesses such as poor internet connectivity, frequent power outages and inadequate access to computing power. As of 2023, Nepal's internet penetration stood at approximately 50 per cent, with rural areas facing even lower access rates; while mobile phone penetration is relatively high, reliable broadband coverage is still limited to a few urban pockets.",
      "In addition, digital literacy remains a challenge—many citizens struggle with basic online services, raising the question of how they will navigate the far more complex \"language\" of AI. The AI ecosystem also demands stable and sufficient energy supplies. Without investing in AI-ready infrastructure—such as a robust literacy plan, improved digital connectivity and uninterrupted power, AI initiatives will struggle to scale beyond a handful of tech hubs.",
      "The current draft lacks clarity whether to build our own foundational AI model or leverage the open source solutions. This is critical for Nepal, like many other low-income countries. The introduction of Deepseek, a foundational large language model (LLM), developed in China, showed that the cost of training LLMs can go down significantly.",
      "However, in any case, the need for robust data pipelines, high-powered computational infrastructure and skilled resources is still relevant. A strategic blend of public-private partnerships, government-backed investments and incentives to attract foreign investors could help Nepal navigate these complexities.",
      "Nepal can also take inspiration from initiatives like the Singapore–Rwanda AI Playbook, forging strategic, cross-country partnerships that pool resources and expertise—particularly valuable for smaller states aiming to build a robust AI ecosystem without shouldering prohibitive costs alone.",
      "AI development and adoption require significant resources and dedicated organisations.",
      "Nepal's policy draft mentions public-private partnerships but lacks details on private sector incentives. Countries like India and Singapore drive AI growth through venture capital, incubators and government-backed research. Rather than adding compliance burdens, Nepal should foster AI entrepreneurship with tax incentives, innovation hubs and direct funding. AI-specific startup grants or a venture capital matching scheme could further attract global investment.",
      "AI has huge potential to improve many critical areas such as healthcare, education, employment and finance. However, it comes with equal risk, if not regulated properly. The governance section of the policy is vague in addressing AI risks such as misinformation, surveillance and data privacy. While AI can be used to enhance security and governance, the absence of clear guidelines on ethical AI use leaves room for misuse.",
      "Nepal should ensure legal protections are in place to prevent AI from being exploited for disinformation, financial crimes or intrusive surveillance. While the policy touches on these risks, it does not specify how accountability mechanisms will be enforced or who will be responsible for oversight. Without strong cybersecurity laws, encryption standards and data localization policies, AI-driven platforms can expose sensitive personal and government data to external threats.",
      "To make the AI policy truly effective, Nepal must first establish a robust foundation before enacting sweeping regulations. Instead of viewing AI solely as a governance issue, Nepal should embrace it as a development catalyst—requiring targeted investment, research, infrastructure and workforce training. By prioritising capacity-building over premature regulation, the country can fully harness AI's benefits while responsibly managing its inherent risks. Nepal's AI policy should prioritise three pillars: (1) University-led AI research funding, (2) AI workforce upskilling and (3) AI-driven public-private partnerships.",
      "The authors are associated with Sankhya AI-Kathmandu.",
    ],
  },
  {
    slug: "ai-krantima-urjako-aawashyakta",
    title: "एआई क्रान्तिमा ऊर्जाको आवश्यकता",
    venue: "Nagarik Dainik",
    meta: "Opinion (Nepali) · with Bishu Giri and Krishna Sharma",
    date: "27 February 2025",
    place: "Kathmandu, Nepal",
    body: [
      "विश्वभर एआई क्रान्ति तीव्र गतिमा अगाडि बढिरहेको छ। संयुक्त राज्य अमेरिका, चीन र युरोप जस्ता देशले अत्याधुनिक एआई मोडेलहरू विकास गर्न ठूलो लगानी गरिरहेका छन् जसका लागि विशाल कम्प्युटेसनल शक्ति र ऊर्जा स्रोत आवश्यक पर्छ। हालै अमेरिकाले पाँच सय अर्ब डलर र युरोपले २०० अर्ब युरोको लगानी घोषणा गरेका छन्। यी लगानीले एआईको आर्थिक र प्रविधिगत वृद्धिमा महत्त्वपूर्ण भूमिका खेल्न सक्ने देखाउँछ।",
      "नेपालले पनि एआईलाई आत्मसात गर्दै उस्तै प्रविधिगत प्रगति गर्ने लक्ष्य राख्नुपर्छ। तर एआई विकासका लागि आवश्यक स्रोतहरूको अभाव झेलिरहेको छ। ऊर्जा स्रोत र कम्प्युटिङ पूर्वाधारको सीमितता नेपालका लागि प्रमुख चुनौती बनेको छ। नेपालले एआईको विकासलाई सम्भव बनाउन चाहन्छ भने त्यसका लागि रणनीतिक र स्रोत–सचेत दृष्टिकोण अपनाउनु आवश्यक छ।",
      "नेपाल एआई नीति मस्यौदा २०८१ ले देशमा यो प्रविधिको विकासका लागि आवश्यक आधार तय गरिसकेको छ जुन एक महत्त्वपूर्ण उपलब्धि हो तर अझै पनि नेपालले आफ्नै आधारभूत एआई मोडेलहरू विकास गर्नु उपयुक्त हुन्छ वा अन्य देशद्वारा विकसित मोडेलहरूलाई एकीकृत गर्नु राम्रो हुन्छ भन्नेबारे ठोस बहस आवश्यक छ।",
      "नेपालको सन्दर्भमा, कम्प्युटिङ शक्ति, डेटा उपलब्धता र स्थिर बिजुली आपूर्तिको अभाव मुख्य चुनौती हुन्। यस कारण नेपालले एआईको प्रशिक्षणका लागि पूर्वाधार निर्माण गर्न सक्दैन भन्ने सवालभन्दा पनि उपलब्ध स्रोतहरूलाई कसरी प्रभावकारीरूपमा उपयोग गर्न सकिन्छ भन्ने पक्षमा छलफल केन्द्रित हुनुपर्छ।",
      "एआई मोडेलहरू प्रशिक्षण गर्दा डेटा सङ्कलन, मोडेल निर्माण, परीक्षण, परिमार्जन र अन्ततः प्रयोगमा ल्याउने प्रक्रिया समावेश हुन्छ। यसमध्ये सबैभन्दा बढी ऊर्जा खपत गर्ने चरण मोडेल प्रशिक्षण हो। आधुनिक एआई मोडेलहरूमा गहिरो शिक्षण प्रविधि प्रयोग गरिन्छ जसमा न्युरल नेटवर्क (मानव मस्तिष्कबाट प्रेरित जटिल कम्प्युटिङ प्रणाली) आधारित हुन्छ।",
      "यी न्युरल नेटवर्कहरूको प्रशिक्षण अत्यधिक ऊर्जा खपत गर्ने चरण हो। जटिल मोडेलहरूमा अर्बौं संख्यामा न्युरल नेटवर्क परिमिति हुन्छन्। उदाहरणका लागि चाटजिपिटी–३ मोडेलमा एक सय ७५ अर्ब परिमिति छन्। यस मोडेललाई प्रशिक्षण गर्न एक हजार दुई सय ८७ मेगावाट बिजुली खपत भएको थियो जुन करिब नेपालको एक घण्टाको कुल बिजुली खपत बराबर हो।",
      "एक अनुमानअनुसार प्रत्येक च्याटजिपिटी क्वेरीले ०.००२९ किलोवाट बिजुली खपत गर्छ। विश्वभर दैनिक एक अर्ब क्वेरीहरू प्रशोधन गरिन्छ। नेपालका करिब ३० लाख व्यक्ति (नेपालको १० प्रतिशत जनसंख्या) ले दैनिक ३.३३ पटक चाटजिपिटी प्रयोग गरे भने दैनिक बिजुली खपत करिब २९ मेगावाट हुनेछ जसको वार्षिक खपत १०,५८५ मेगावाट पुग्न सक्छ।",
      "नेपालमा हालको कुल वार्षिक बिजुली उत्पादन १२ हजार ७१ जिडब्लुएच छ जसको अधिकांश भाग जलविद्युत्बाट प्राप्त हुन्छ। नेपालमा सानो स्तरमा मात्र एआई प्रविधिको प्रयोग भए पनि यसले बिजुली आपूर्तिमा ठूलो प्रभाव पार्न सक्छ।",
      "नेपालको जलविद्युत् उत्पादन मौसमी हुन्छ– वर्षायाममा बिजुली अत्यधिक उत्पादन हुन्छ भने हिउँदमा ४० प्रतिशतभन्दा कम उत्पादन हुन्छ जसका कारण नेपाललाई भारतबाट बिजुली आयात गर्नुपर्ने बाध्यता छ। एआई प्रविधिले स्थिर र उच्च क्षमताको बिजुली आपूर्तिको माग गर्छ तर नेपालको वर्तमान बिजुली आपूर्ति अस्थिर छ।",
      "नेपाल विद्युत् प्राधिकरण र सरकारबीच उद्योगलाई विशेष बिजुली आपूर्ति दिने विषयमा विवाद चलिरहेको छ। उद्योगहरू बिजुली आपूर्तिको अभावका कारण घाटामा छन् भने डेटा सेन्टर र एआई कम्पनीहरूका लागि आवश्यक स्थिर बिजुली आपूर्ति अझै कठिन हुनेछ।",
      "नेपालले एआईका लागि आवश्यक ठूलो मात्रामा बिजुली छुट्याउने निर्णय गर्दा यसको प्रभाव अन्य महत्त्वपूर्ण क्षेत्रहरूमा पर्न सक्छ। कृषि, उद्योग, स्वास्थ्य र अन्य अत्यावश्यक सेवाहरूलाई पर्याप्त ऊर्जा आपूर्ति गर्न नसक्दा समग्र आर्थिक विकासमा असर पर्न सक्छ। एआई मोडेल प्रशिक्षणले कुल बिजुली खपतमा सानो मात्र योगदान दिन सक्छ तर अल्पकालीन रूपमा उच्च मागले स्थानीय क्षेत्रमा बिजुली अभाव सिर्जना गर्न सक्छ। त्यसैले नेपालले डिजिटल प्रविधि र ऊर्जा सुरक्षाबीच सन्तुलन कायम गर्न आवश्यक छ।",
      "नेपालले एआईलाई आत्मसात गर्नुपर्छ तर संक्रमणकालीन रणनीति अपनाउनु जरुरी छ। नेपालले तत्कालै बृहत् मोडेल निर्माणमा ध्यान केन्द्रित गर्नुको सट्टा, स्थानीय आवश्यकताअनुसार मध्यम आकारका एआई मोडेलहरू विकास गर्नु उपयुक्त हुन्छ। एआई मोडेलहरूलाई ट्रान्सफर लर्निङ, नलेज डिस्टिलेसन र परिमिति–कुशल प्रशिक्षण प्रविधि प्रयोग गरी स्थानीय भाषामा परिमार्जन गर्न सकिन्छ। यसले ऊर्जा लागत कम बनाउँछ र स्थानीय एआई विकासलाई दिगो बनाउँछ।",
      "नेपालले अल्पकालीनरूपमा अन्तर्राष्ट्रिय क्लाउड–आधारित एआई समाधानहरू प्रयोग गर्न सक्छ। अन्तर्राष्ट्रिय डेटा सेन्टरहरू प्रायः नवीकरणीय ऊर्जा स्रोतहरूमा आधारित हुन्छन् जसले नेपाललाई कम्प्युटिङ पूर्वाधारको वित्तीय बोझबाट बचाउन सक्छ। तर क्लाउड कम्प्युटिङमा डेटा गोपनीयता, नेटवर्क ढिलाइ र भूराजनीतिक असर जस्ता जोखिम छन्। यसकारण, नेपालले क्लाउड–आधारित रणनीतिलाई लामो समयसम्म निर्भर हुन नदिने गरी सोच्नुपर्छ।",
      "नेपालले जलविद्युत्बाहेक सौर्य र पवन ऊर्जा जस्ता नवीकरणीय ऊर्जा स्रोतहरूमा लगानी गर्नुपर्छ। विशेषगरी ब्याट्री भण्डारण प्रणालीको विकास गर्दा नेपालले जलविद्युत् उत्पादनमा आउने मौसमी प्रभावलाई सन्तुलित गर्न सक्छ। हाल नेपालका नवीकरणीय ऊर्जा परियोजनाहरू घरायसी प्रयोजनमा सीमित छन् तर डिजिटल पूर्वाधारलाई समर्थन गर्न ठूलो स्तरका परियोजना आवश्यक छन्।",
      "नेपालले आफ्नै बृहत् एआई मोडेलहरू निर्माण गर्नु अहिलेको सन्दर्भमा व्यावहारिक देखिँदैन। हाल उपलब्ध स्रोतहरूलाई अधिकतम प्रयोग गर्दै नेपालले एआई मोडेलहरूलाई अनुकूलन गर्न ध्यान दिनुपर्छ। दीर्घकालीन रूपमा नेपालले आफ्नै साना–मझौला एआई मोडेलहरू विकास गर्न आधार तयार गर्नुपर्छ। नेपालले सानै स्तरमा एआई विकासको आधार तयार गर्‍यो भने भविष्यमा डिजिटल स्वतन्त्रता सुनिश्चित गर्न सक्छ। एआई केवल प्रविधि विकासको कुरा मात्र होइन, यो नेपाललाई डिजिटल युगमा प्रतिस्पर्धी बनाउन आवश्यक रणनीतिसमेत हो।",
      "– लेखकहरू संख्य एआई र एसआइपिआरसँग सम्बद्ध छन्।",
    ],
  },
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
  {
    type: "edu",
    role: "Higher Secondary, Commerce",
    org: "Delhi Public School, R.K. Puram",
    loc: "New Delhi, India",
    period: "2007 - 2009",
    desc: "Commerce stream.",
    tools: [],
  },
  {
    type: "edu",
    role: "SLC (Secondary Education), Batch 2006/2007",
    org: "Shree Bharati Bhawan Secondary School",
    loc: "Pokhara, Nepal",
    period: "2006 - 2007",
    desc: "School Leaving Certificate (SLC) examination.",
    tools: [],
  },
];

/* ── Navigation ──────────────────────────────────────────────── */

/**
 * About is deliberately not in the nav: the whole site is about one person,
 * so a dedicated "About" entry is redundant. Every other heading here is a
 * standalone page, not a home page anchor: the matching home section is only
 * a teaser for it. Contact is the one exception, since a contact form has
 * nothing to show on a page of its own beyond what is already on the home
 * anchor.
 */
export const navLinks = [
  { href: "/ai", label: "AI" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/teaching", label: "Teaching" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
];
