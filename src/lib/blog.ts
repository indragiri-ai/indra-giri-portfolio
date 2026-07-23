/**
 * BLOG & ARTICLES content.
 * Add a new post object to the top of the `posts` array and it appears
 * on /blog automatically. Keep slugs lowercase with hyphens.
 */

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO, used for sorting
  displayDate: string;
  category: string;
  readTime: string;
  tags: string[];
  cover: string; // editorial SVG in /images/blog/, 1200x800
  coverAlt: string;
  sections: BlogSection[];
}

export const posts: BlogPost[] = [
  {
    slug: "making-ai-policy-work-in-nepal",
    title: "Making AI Policy Work in Nepal",
    excerpt:
      "Nepal does not need a perfect AI policy. It needs a workable one: clear priorities, real budgets, and institutions that can actually deliver.",
    date: "2026-05-18",
    displayDate: "May 18, 2026",
    category: "AI Policy",
    readTime: "6 min read",
    tags: ["AI policy", "Nepal", "Governance"],
    cover: "/images/blog/making-ai-policy-work-in-nepal.svg",
    coverAlt: "Network of connected nodes over a policy document",
    sections: [
      {
        paragraphs: [
          "Every few months a new AI strategy document appears somewhere in the world, and the pressure grows for Nepal to produce its own. That instinct is right. The risk is that we end up with a document that reads well at a conference and changes nothing on the ground.",
          "Having studied AI awareness among Nepali professionals and written about AI policy in the national press, I keep returning to one conclusion. Policy fails here not because the ideas are wrong but because the plumbing is missing.",
        ],
      },
      {
        heading: "Start with what AI actually needs",
        paragraphs: [
          "AI runs on three inputs: electricity, connectivity and people. Nepal has made real progress on energy, but data centres and reliable power for digital services still lag. Internet access is widespread in cities and thin in the districts where public services need the most help.",
          "The people question is the hardest. Our study of professionals found high curiosity about AI but shallow practical skill. Most respondents had tried a chatbot. Very few had used AI in a structured way at work. A policy that funds awareness campaigns but not hands-on training will not move that needle.",
        ],
      },
      {
        heading: "Three priorities that would matter",
        paragraphs: [
          "First, put AI literacy inside existing institutions rather than building new ones. Universities, civil service training centres and professional associations already reach the people who will use these tools. Give them curricula and trainers.",
          "Second, make government data usable. Most ministries publish PDFs. AI systems, and researchers, need structured data. A modest open data mandate would do more for Nepal's AI ecosystem than any number of task forces.",
          "Third, regulate uses, not the technology. Rules should target concrete harms such as fraud, discrimination and misinformation, and leave room for experimentation everywhere else.",
        ],
      },
      {
        heading: "The evidence habit",
        paragraphs: [
          "Whatever Nepal adopts, the policy should commit to measuring itself. Set baselines for AI skills and adoption, fund independent evaluations, and revise the strategy on a fixed cycle. That is how policy learns.",
          "AI will reshape how Nepal works, learns and governs. The question is whether we shape that process deliberately or let it happen to us. A workable policy, honestly evaluated, is how we choose the first path.",
        ],
      },
    ],
  },
  {
    slug: "prompt-engineering-for-researchers",
    title: "Prompt Engineering for Researchers: A Practical Guide",
    excerpt:
      "Large language models can speed up every stage of a research project, but only if you talk to them like a methodologist. Here is the approach I teach.",
    date: "2026-04-02",
    displayDate: "April 2, 2026",
    category: "AI Practice",
    readTime: "7 min read",
    tags: ["Prompt engineering", "Research methods", "Generative AI"],
    cover: "/images/blog/prompt-engineering-for-researchers.svg",
    coverAlt: "Chat prompt panels with a glowing cursor",
    sections: [
      {
        paragraphs: [
          "In my trainings the most common question is not whether researchers should use AI. It is how to get output they can actually trust. The answer is mostly about how you ask.",
          "A large language model is like a brilliant, tireless research assistant with no context about your project and no fear of being wrong. Prompting is how you supply the context and install the fear.",
        ],
      },
      {
        heading: "Give the model a role and a standard",
        paragraphs: [
          "Start prompts by stating who the model should be and what quality bar applies. For example: you are a survey methodologist reviewing a questionnaire for a household study in rural Nepal, flag leading questions, double-barrelled items and translation risks.",
          "This single habit removes most generic output. The model stops writing for an average reader and starts writing for your discipline.",
        ],
      },
      {
        heading: "Work in stages, not one giant ask",
        paragraphs: [
          "Do not ask for a finished literature review. Ask first for themes, then for competing findings within each theme, then for the strongest citations to verify. Each stage gives you a checkpoint where your judgement enters the process.",
          "The same applies to analysis. I ask the model to propose an analysis plan, critique it, and only then draft code. Errors surface early, where they are cheap.",
        ],
      },
      {
        heading: "Verify like a supervisor",
        paragraphs: [
          "Treat every factual claim, citation and number as unverified until checked. Ask the model to rate its own confidence and to list what it could not verify. Spot check against sources you trust.",
          "Used this way, AI does not replace rigour. It frees time for the parts of research that need a human: framing the question, understanding the context and standing behind the findings.",
        ],
      },
    ],
  },
  {
    slug: "field-notes-on-data-quality",
    title: "What a Decade in the Field Taught Me About Data Quality",
    excerpt:
      "Bad data rarely announces itself. Ten years of surveys across Nepal and India taught me that quality is won or lost in small, unglamorous decisions.",
    date: "2026-02-20",
    displayDate: "February 20, 2026",
    category: "Research Methods",
    readTime: "5 min read",
    tags: ["Data quality", "Field research", "Surveys"],
    cover: "/images/blog/field-notes-on-data-quality.svg",
    coverAlt: "Contour lines with scattered survey data points",
    sections: [
      {
        paragraphs: [
          "Every dataset I have ever analysed was shaped long before it reached my laptop. It was shaped by a translator's word choice, an enumerator's patience at the end of a hot day, and a respondent's guess about what the stranger with the tablet wanted to hear.",
          "Analysis can adjust for many things. It cannot fix a question nobody understood.",
        ],
      },
      {
        heading: "Pilot until it hurts",
        paragraphs: [
          "The cheapest quality investment is piloting the instrument with real respondents, not colleagues. Words that seem neutral in the office carry weight in the village. In one study, a routine income question kept failing until we learned that seasonal earnings simply did not fit the recall period we had chosen.",
          "Pilots also reveal length. If your enumerators are rushing by module four, your last modules are fiction.",
        ],
      },
      {
        heading: "Respect the enumerator",
        paragraphs: [
          "Enumerators are the most underrated members of any research team. Train them on why each question exists, not just how to ask it. Pay them fairly and build honest feedback channels. A field team that feels ownership will flag problems you would never catch from headquarters.",
          "Technology helps too. GPS checks, audio audits and daily syncs with automated validation catch drift early. We now use AI assisted checks to scan incoming data for suspicious patterns while the team is still in the field.",
        ],
      },
      {
        heading: "Quality is a chain",
        paragraphs: [
          "Sampling, translation, training, supervision, entry and cleaning form a chain, and the weakest link sets the ceiling for everything downstream. The discipline is boring and the payoff is enormous: findings you can defend in front of the people whose lives they describe.",
        ],
      },
    ],
  },
  {
    slug: "digital-divide-nepal-evidence",
    title: "The Digital Divide in Nepal: What the Evidence Says",
    excerpt:
      "Connectivity has raced ahead of capability. The next phase of Nepal's digital story is about skills, trust and locally relevant services.",
    date: "2026-01-12",
    displayDate: "January 12, 2026",
    category: "Digital Nepal",
    readTime: "6 min read",
    tags: ["Digital divide", "Nepal", "Development"],
    cover: "/images/blog/digital-divide-nepal-evidence.svg",
    coverAlt: "Mountain ridgelines with a signal tower reaching one valley",
    sections: [
      {
        paragraphs: [
          "By raw connectivity numbers, Nepal's digital progress looks impressive. Mobile penetration is high and even remote districts light up on coverage maps. But access statistics hide the divide that matters now: the gap between having a connection and being able to use it meaningfully.",
        ],
      },
      {
        heading: "Three divides, not one",
        paragraphs: [
          "The first divide is still infrastructure. Coverage maps overstate reality in the mountains, and electricity reliability shapes internet use as much as signal strength.",
          "The second divide is skills. Many users navigate two or three apps confidently and nothing else. Digital government services assume a fluency that large parts of the population, especially older citizens and rural women, have never been offered a chance to build.",
          "The third divide is relevance. Services, content and now AI tools are overwhelmingly in English. A farmer in Jumla has little reason to go online if nothing there speaks her language or solves her problems.",
        ],
      },
      {
        heading: "Why this matters for AI",
        paragraphs: [
          "AI raises the stakes on all three divides. Those with skills and connectivity get a productivity multiplier. Those without fall further behind at a faster rate than any previous technology cycle.",
          "That is why I argue that AI readiness and digital inclusion are the same agenda. Nepali language AI tools, digital skills in schools and civil service, and public services designed for low bandwidth users would let the whole country ride the wave rather than watch it.",
        ],
      },
      {
        heading: "Measure the gap, then close it",
        paragraphs: [
          "We need regular, disaggregated measurement of digital capability, not just coverage. What gets measured gets budgeted. The divide is closable, but only if we see it clearly first.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const blogIntro =
  "Essays and field notes on artificial intelligence, research methods and Nepal's data driven future. Written for practitioners, students and anyone who makes decisions with evidence.";
