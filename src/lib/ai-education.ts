/**
 * Copy for /ai/education/, the pillar page on AI in education in Nepal.
 *
 * The wording comes from Indra's approved brief and is already in his voice:
 * do not re-polish it. The study figures (815 teachers, 76%, 80.5% and 71.3%)
 * are from the joint Ministry of Education and Sports and British Council
 * Nepal study, reported in The Kathmandu Post on 2 October 2026.
 *
 * Do not add the "10,000 community schools" figure here without a source.
 */

export const educationPage = {
  /** Unique title, kept as approved. */
  title: "AI in Education in Nepal: Training & Policy | Indra Giri",
  description:
    "How AI is being used in Nepal's schools, what the national evidence shows, and the training I run for teachers. Includes answers to common questions.",
  eyebrow: "AI in education",
  h1: "AI in education in Nepal",
  lead: [
    "AI is already in Nepal's classrooms. A national study of 815 teachers found that 76% had used tools like ChatGPT or Gemini. Almost none had been trained. They taught themselves, which means no one showed them how to check the output or keep students' data safe.",
    "So the question is not whether AI belongs in our schools. It is already here. The question is whether we help teachers use it well, or leave them to work it out alone.",
  ],
  subLead:
    "I train teachers and students to use AI. I study how Nepal is really adopting it. And I turn what I see in class into guidance others can use. This page brings that work together.",
};

export const evidence = {
  heading: "What the evidence shows",
  paragraphs: [
    "Most talk about AI in education is opinion. I want to start from what we can measure.",
    "The national study covered 815 teachers in all seven provinces. 76% had already used AI, for lesson plans, explanations, worksheets and marking. Three things stood out to me, more than the headline.",
    "First, teachers taught themselves. Very few had any training. So no one showed them how to check the output or protect students' data.",
    "Second, the gap is uneven. 80.5% of male teachers had used AI, against 71.3% of women. The study links this to time, not ability. Older teachers were more likely to be left behind.",
    "Third, the main problem is training, not devices. Teachers said what they lack most is support and guidance, not phones or internet.",
    "My own research in Kathmandu points the same way. Almost everyone has heard of AI. Very few use it well, every day, at work.",
  ],
  link: { label: "The Adoption Paradox", href: "/ai/research-policy" },
};

/** Source line shown under the study figures in the evidence section. */
export const evidenceSource = {
  before: "These figures come from a study by the Ministry of Education and Sports and the British Council, reported in ",
  linkText: "The Kathmandu Post",
  href: "https://kathmandupost.com/columns/2026/10/02/nepali-teachers-have-found-their-way-to-ai-can-our-education-system-keep-up",
  after: " (2 October 2026).",
};

export const gaps = {
  heading: "Three gaps",
  intro: "From the classroom and from the data, I keep seeing the same three gaps.",
  items: [
    {
      label: "The policy gap",
      body: "Nepal has a National AI Policy, and the government talks about AI in community schools. But a teacher in front of 40 students has no simple guide: what is allowed, what to check, what to never put into an AI tool. Policy is written at the top. Practice happens in the class. Teachers are filling the gap on their own.",
    },
    {
      label: "The practice gap",
      body: "AI can already do a lot for teaching. Not just faster lesson plans and question papers, but new ways to explain a hard idea. Most schools are not using any of it.",
    },
    {
      label: "The future-of-work gap",
      body: "The students in class today will enter a job market where AI changes the work in most jobs. If schools keep rewarding only what AI already does well, like repeating memorised answers, we are preparing students for the past. As an economist, this is the gap I worry about most.",
    },
  ],
};

export const whatIDo = {
  heading: "What I do",
  paragraphs: [
    "Through Sankhya AI's \"AI for Teachers\" programme, I have trained more than 70 teachers in community schools, including Pashupati Mitra School, Durbar High School and Sewa Sadan School. I also train bachelor and master's students at Kathmandu University School of Management.",
    "The training is hands-on. It is built around what teachers do every week. Each workshop has three short parts.",
    "First, what AI is and is not. How it works, why it can be confidently wrong, and the three rules that matter more than any tool.",
    "Second, hands-on with free tools. Teachers make their own lesson plans, question papers and materials during the session, using ChatGPT, Gemini, Gemini Notebook and Claude.",
    "Third, safe and fair use. Checking the output, protecting students' information, and talking to students honestly about AI.",
    "One thing I have learned matters as much as what I teach. A one-day workshop is a start, not a solution. Teachers keep going when they have follow-up and examples from their own subject. So the programme continues in teacher support groups after the session. For one school, we built an assistant in Gemini that plans a full year of Class 10 maths and writes each lesson from the national curriculum: the opening, the slides and the SEE-style questions.",
  ],
  button: { label: "See the training programmes", href: "/ai/training" },
};

export const handbook = {
  heading: "A free handbook for teachers",
  body: "Every teacher I train gets a free handbook, \"AI for Teachers\". It has step-by-step guides for Gemini, Gems, Gemini Notebook and Claude, and 30 ready prompts written for Nepali classrooms.",
  // Points at the contact section until the PDF is published for direct download.
  button: { label: "Ask for the handbook", href: "/#contact" },
};

/** Posts listed under "Read more". Titles come from lib/blog.ts, so they cannot drift. */
export const readMore = {
  heading: "Read more",
  slugs: [
    "teachers-need-ai-skills-before-ai-tools",
    "ai-tutor-not-ghostwriter",
    "rethinking-assessment-in-the-age-of-ai",
    "making-ai-policy-work-in-nepal",
  ],
};

export const faq = {
  heading: "Questions teachers and schools ask",
  items: [
    {
      q: "Is there an AI policy for schools in Nepal?",
      a: "Nepal has a National AI Policy (2082), and it mentions education. But there is still no simple, classroom-level guide that tells a teacher what is allowed and what to avoid. Until there is, a school can write its own short rules. One page is enough to start.",
    },
    {
      q: "Which AI tools can teachers in Nepal use for free?",
      a: "ChatGPT, Google's Gemini (including Gemini Notebook, once called NotebookLM) and Claude all have free versions. They are enough for lesson plans, materials and questions. Each one works on a phone with a free account.",
    },
    {
      q: "Can teachers use AI to prepare lesson plans or question papers?",
      a: "Yes, and many already do. The tool is not the hard part. Give the AI a role, the task, your class details and the format you want. Then read it, check it and change it. AI writes a first draft. The teacher is still the expert.",
    },
    {
      q: "Is it safe to put student information into AI tools?",
      a: "No. Never put a student's personal details into any AI tool: no names with marks, no family or health information, no photos. This is the one rule I ask every school to follow from day one.",
    },
    {
      q: "How can a school or municipality arrange AI training for its teachers?",
      a: "I run AI training for schools and local governments in Nepal, with before-and-after surveys and follow-up support. You can reach me through the contact form on this site.",
    },
    {
      q: "Will AI replace teachers?",
      a: "No. AI can write a lesson plan. It cannot notice the child who came to school hungry, or judge what a class needs today. It changes what teachers spend time on. It does not replace the judgement at the centre of teaching.",
    },
  ],
};

export const closing = {
  heading: "Work with me",
  body: "If you are a school, a municipality, or an organisation working on education in Nepal, I would be glad to talk.",
  button: { label: "Get in touch", href: "/#contact" },
};

/** Blog posts that get a "Read the overview" link to the pillar page. */
export const overviewPostSlugs: string[] = readMore.slugs;

/** Entry for the social share card (see app/og/[file]/route.tsx). */
export const educationOg = { slug: "ai-education", title: "AI in Education in Nepal", label: "AI in education" };
