/**
 * Content for the AI practice: the /ai hub and its three service pages.
 *
 * Kept separate from data.ts because this is the deepest part of the site and
 * it will keep growing. data.ts stays the one-page site's content.
 *
 * PHOTOS: every `photo` field is optional. Where it is empty the component
 * renders a labelled placeholder tile, so the layout is visible before the real
 * images exist. Drop files into public/images/ai/ and fill the paths in.
 */

export interface AIService {
  slug: string;
  /** Short name, used on cards and in navigation. */
  name: string;
  title: string;
  tagline: string;
  intro: string;
  /** What the visitor gets. */
  points: string[];
  icon: "school" | "bulb" | "robot";
}

export const aiIntro =
  "AI is not a side interest. I train professionals and students to use it well, I research how Nepal is actually adopting it, and I build it into the research work I do every week. These three things feed each other: the training is grounded in evidence, and the evidence comes from the field.";

export const aiServices: AIService[] = [
  {
    slug: "training",
    name: "AI Training",
    title: "AI training and capacity building",
    tagline: "Hands on programs for universities, schools and companies.",
    intro:
      "Practical generative AI training built for the people in the room: management students who will graduate into AI-shaped jobs, school teachers who need to bring it into a classroom responsibly, and professionals who need it to do real work on Monday morning.",
    points: [
      "Generative AI and prompt engineering, taught on the participants' own tasks",
      "Programs for university cohorts, school teachers and corporate teams",
      "AI readiness assessments for organisations",
      "Custom curricula for research and business teams",
    ],
    icon: "school",
  },
  {
    slug: "research-policy",
    name: "AI Research & Policy",
    title: "AI research and policy",
    tagline: "Evidence on how Nepal is really adopting AI.",
    intro:
      "Most claims about AI adoption in Nepal are assertions. I run the surveys that turn them into measured findings, and publish the results so policymakers, employers and vendors can act on numbers rather than impressions.",
    points: [
      "Original survey research on AI awareness, adoption and readiness",
      "Sector level analysis and readiness indices",
      "Policy notes and op-eds in national media",
      "Research on the digital divide and AI governance",
    ],
    icon: "bulb",
  },
  {
    slug: "research-workflow",
    name: "AI in Research",
    title: "AI in the research workflow",
    tagline: "Faster studies that are still defensible.",
    intro:
      "I use AI across the research lifecycle, from instrument design to the final report, without letting it near the parts of the work where a plausible-sounding error would be fatal. This page sets out exactly where it helps, where it does not, and the checks that make the difference.",
    points: [
      "AI assisted survey design and questionnaire review",
      "Qualitative coding support with human adjudication",
      "Automated data cleaning, analysis and reporting pipelines",
      "LLM powered literature reviews and synthesis",
    ],
    icon: "robot",
  },
];

/* ── AI in the research workflow ─────────────────────────────── */

/**
 * Written as capability and method, deliberately NOT as case studies: it
 * describes how the work is done, and claims no specific past engagement that
 * is not already documented elsewhere on the site.
 */
export const researchWorkflow = {
  lead:
    "Research has a lot of work in it that is necessary, repetitive and slow: checking an instrument for leading questions, chasing down what is already known, cleaning a messy export, coding two hundred open responses, writing the same exhibit note thirty times. AI is very good at that work. It is unreliable at the part that matters most, which is deciding what the evidence means. I use it hard on the first and keep it away from the second.",
  stages: [
    {
      stage: "Designing the study",
      does:
        "The draft instrument goes through AI review before it goes near a respondent: leading questions, double-barrelled items, response scales that do not balance, and drift between the Nepali and English versions where a translated item quietly asks something different.",
      not: "It does not choose the research question, the sampling strategy or the unit of analysis. Those decide what the study can support, and a model that has not met the client cannot make them.",
    },
    {
      stage: "Reviewing the literature",
      does:
        "LLM assisted search and synthesis to map what is already known, cluster the arguments, and find the studies a keyword search misses because they use different vocabulary for the same idea.",
      not: "No citation enters a document unless I have opened the source and confirmed it says what the summary claims. Fabricated and misattributed references are the single most common way AI damages a research reputation.",
    },
    {
      stage: "Fieldwork and data quality",
      does:
        "Automated checks run against incoming data while the team is still in the field: enumerator level outliers, straight-lined response patterns, interviews completed implausibly fast, GPS and timestamp anomalies. Problems surface on day three, not at analysis.",
      not: "It does not replace supervision. A flag is a question for the field supervisor, not a verdict on an enumerator.",
    },
    {
      stage: "Cleaning and coding",
      does:
        "Scripted cleaning with every decision recorded, so the path from raw export to analysis file is reproducible. For qualitative data, the model proposes a first pass of codes across the transcripts, which I then adjudicate and revise.",
      not: "The coding frame is mine and the final assignment is mine. Model coding is checked against a human coded subsample before it is trusted anywhere.",
    },
    {
      stage: "Analysis",
      does:
        "AI works as a second pair of eyes on Stata, R and Python: drafting analysis code, catching the error in a merge or a recode, and suggesting robustness checks worth running that were not in the original plan.",
      not: "It does not choose which specification to report or what the coefficient means. Analysis is a set of judgements about a real context, and outsourcing those is how studies end up confidently wrong.",
    },
    {
      stage: "Writing and reporting",
      does:
        "Drafting, restructuring and tightening; keeping exhibit titles, bases and notes consistent across a long report; producing the plain-language version for the audience that will never read the technical annex.",
      not: "No sentence describes a finding that is not in the data. Every number in a final document traces back to the response file.",
    },
  ],
  guardrails: [
    "Respondent level data does not go into general-purpose consumer AI tools.",
    "Every figure traces to the raw response file, not to a model's summary of it.",
    "Every citation is read before it is cited.",
    "AI output is reviewed to the same standard as a junior researcher's draft: assume it is wrong until checked.",
    "Where AI materially shaped a method, it is disclosed rather than hidden.",
  ],
  outcomes: [
    {
      title: "Faster without being looser",
      text: "The saving shows up in preparation, cleaning and drafting, which is where research time actually goes. The judgement steps take exactly as long as they did before.",
    },
    {
      title: "More checks, not fewer",
      text: "When robustness checks cost minutes instead of days, more of them get run. That tends to improve a study more than any single clever technique.",
    },
    {
      title: "A workflow your team can keep",
      text: "I set this up inside the team: the scripts, the prompts, the checks and the rules about what never goes into a model, so it survives after the engagement ends.",
    },
  ],
};

/* ── Delivered training ──────────────────────────────────────── */

export interface TrainingDelivery {
  audience: string;
  organisation: string;
  /** Kept short: what the group actually left able to do. */
  summary: string;
  topics: string[];
  /** TODO(owner): add public/images/ai/... paths once photos are ready. */
  photo?: string;
  photoCaption?: string;
}

export const trainingDeliveries: TrainingDelivery[] = [
  {
    audience: "Bachelor and Master students",
    organisation: "Kathmandu University School of Management",
    summary:
      "Generative AI for management students: using AI as a working tool for research, analysis and writing, and understanding where its output cannot be trusted without checking.",
    topics: ["Prompt engineering", "AI for research", "Academic integrity"],
    photo: "/images/ai/kusom.jpg",
    photoCaption: "Working through a live dataset with students at KUSOM",
  },
  {
    audience: "School teachers",
    organisation: "Pashupati Mitra School",
    summary:
      "Bringing generative AI into teaching practice: lesson preparation, differentiated materials and marking support, with a clear line on what students should and should not use it for.",
    topics: ["Lesson planning", "Classroom use", "Responsible use"],
    photo: "/images/ai/pashupati-mitra.jpg",
    photoCaption: "Opening a teacher session at Pashupati Mitra School",
  },
  {
    audience: "School teachers",
    organisation: "Durbar High School",
    summary:
      "AI fundamentals for teachers at Nepal's oldest school, focused on saving preparation time and building confidence with tools most staff had only heard about.",
    topics: ["AI fundamentals", "Teaching materials", "Practical tools"],
    photo: "/images/ai/durbar-high-school.jpg",
    photoCaption: "Teachers working through the exercises, Durbar High School",
  },
  {
    audience: "School teachers",
    organisation: "Sewa Sadan School",
    summary:
      "Hands on generative AI for classroom teachers: writing, translation and assessment support, worked through on the teachers' own subject material.",
    topics: ["Hands on practice", "Nepali and English", "Assessment"],
    photo: "/images/ai/sewa-sadan.jpg",
    photoCaption: "Teaching staff after the session, Sewa Sadan School",
  },
];

/* ── The AI awareness report ─────────────────────────────────── */

export const aiReport = {
  title: "The Adoption Paradox",
  subtitle:
    "How Kathmandu's professionals use AI faster than they understand it, and faster than anyone is governing it",
  publisher: "Sankhya AI",
  edition: "First edition, 2025",
  fieldwork: "Fieldwork March to April 2025, Kathmandu district",
  authors: [
    "Indra Giri, Chief Executive Officer, Sankhya AI",
    "Dr Ram Narayan Shrestha, Assistant Professor, Kathmandu University",
  ],
  /** Empty string hides the download button. */
  file: "/AI_report/Kathmandu_AI_Readiness_Report_2025_final.pdf",
  fileMeta: "PDF · 57 pages · 754 KB",
  headline:
    "A cross-sector study of AI awareness, adoption, trust and governance readiness across eight sectors in Kathmandu, based on 334 face to face interviews with working professionals.",
  stats: [
    { value: "334", label: "Professionals surveyed" },
    { value: "8", label: "Industry sectors" },
    { value: "98%", label: "Have heard of AI" },
    { value: "22%", label: "Understand it and use it daily" },
  ],
  summary: [
    "Generative AI reached Nepal through mobile phones rather than through corporate procurement, IT budgets or government programmes. That single fact shapes everything else in the report: adoption looks high, but capability, workplace integration and governance did not follow behind it. The study measures those layers separately instead of assuming they move together.",
    "The result is a market where the usual signals mislead. Awareness is effectively universal and personal use is high, but the depth of that use is thin and unevenly distributed, and the two channels through which a technology is normally governed, employer training and national policy, barely register.",
  ],
  findings: [
    {
      title: "Awareness is complete; competence is not",
      text: "98% have heard of AI and 81% use it personally, but only 39% say they understand it well enough to use it regularly, and just 22% combine that understanding with daily use. The funnel loses 76 points between hearing about AI and using it capably.",
    },
    {
      title: "AI arrived through the phone, not the workplace",
      text: "87% first learned about AI through social media. Only 8.5% learned through workplace or professional training and 10.7% through formal education. On the most consequential general-purpose technology of the decade, Nepal's institutions reached fewer than one respondent in ten.",
    },
    {
      title: "The toolset is one product deep",
      text: "ChatGPT is known to 91% of respondents; the next best known tool reaches 56% and no other exceeds 26%. AI capability in Kathmandu today effectively means general-purpose chatbot literacy, which is a narrow foundation for sector-specific value.",
    },
    {
      title: "There is a generational cliff, not a gradient",
      text: "Daily use runs at 52% among 20 to 29 year olds and falls to 24% in both the 30s and 40s bands. Once age is controlled for, education level explains almost nothing.",
    },
    {
      title: "Trust runs ahead of understanding",
      text: "58% trust AI for important decisions, either completely or with human oversight, while only 39% claim to understand it well. Trust is highest where scrutiny should be greatest: 86% net trust in media and journalism against 37% in healthcare.",
    },
    {
      title: "The workforce is anxious but not acting",
      text: "61% are concerned about AI affecting job security in their sector, yet only 40% are actively learning new skills. In healthcare, 63% are concerned and 20% are acting.",
    },
    {
      title: "The governance gap is the headline risk",
      text: "92% want AI regulated and 78% say government should lead, but only 46% know Nepal has published a draft national AI policy: a 45-point gap between regulatory demand and awareness of the regulatory response.",
    },
  ],
  implications: [
    {
      audience: "For policymakers",
      text: "The immediate problem is distribution, not drafting. Nepali-language summaries, sector guidance for healthcare and legal practice, and dissemination through the same social channels that carried AI into the country.",
    },
    {
      audience: "For employers",
      text: "Convert shadow use into supervised use. The first move is not a training budget, it is an acceptable-use policy and a register of what staff are already doing.",
    },
    {
      audience: "For the AI industry",
      text: "Sell depth, not access. The market does not need to be told AI exists; it needs to move from general-purpose chatbot use to sector-specific application.",
    },
  ],
  method:
    "334 valid face to face interviews from 343 contacts, conducted in Nepali or English at the respondent's preference, March to April 2025. A purposive sample designed for coverage of eight sectors, which supports description and comparison between groups but not projection to population totals. Question bases vary between n=280 and n=334 and are printed with every exhibit. Reviewed before publication by an independent editorial board.",
  limits:
    "The study measures what respondents report doing, not what AI delivered: no figure in it is a productivity estimate. Understanding, trust and preparedness are self-reported and untested, every relationship is an association measured at one moment, and the findings describe 334 professionals in Kathmandu district rather than Nepal as a whole.",
};
