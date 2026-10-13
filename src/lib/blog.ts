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
    slug: "ai-tutor-not-ghostwriter",
    title: "AI as Tutor, Not Ghostwriter: Teaching Students to Think With AI",
    excerpt:
      "The same chatbot can make a student weaker or sharper. The difference is who does the thinking, and that is something we can teach.",
    date: "2026-10-12",
    displayDate: "October 12, 2026",
    category: "Teaching & Learning",
    readTime: "9 min read",
    tags: ["AI in education", "Teaching", "Students"],
    cover: "/images/blog/ai-tutor-not-ghostwriter-cartoon.svg",
    coverAlt: "Cartoon of a student at a desk with a friendly robot tutor asking a question",
    sections: [
      {
        paragraphs: [
          "Every semester I see the same fork in the road. A student gets an assignment, opens a chatbot, pastes the question and hands in whatever comes back. The writing is clean. The student has learned nothing.",
          "I do not blame the student. The tool is free, fast and awake at midnight. If we only tell students not to use it, we lose, because they will use it anyway and stop telling us. If we pretend it changes nothing, we also lose. My position is simple: AI should be a tutor, never a ghostwriter. The difference is who does the thinking.",
          "I have taught at multiple universities, and I now train professionals and school teachers to use AI. The pattern is the same in every room. People who use AI to skip thinking get weaker. People who use it to think harder get stronger. Same tool, opposite results.",
        ],
      },
      {
        heading: "The ghostwriter trap",
        paragraphs: [
          "A ghostwriter delivers a finished product. That is useful when you need a product. It is useless when you need to learn, because learning happens in the struggle that the ghostwriter removes.",
          "Take a common case from an economics or statistics class. A student runs a regression and has to explain what the coefficient means. If the chatbot writes the explanation, the paragraph will be fluent and usually correct. Then I ask one follow-up question in person: what would change if the sample were only rural households? The student goes quiet. The words were never theirs.",
          "This is the real damage. A smooth paragraph used to be decent evidence of a clear mind. It no longer is. That hurts the student, who walks away without the skill. It also hurts the teacher, who can no longer see where the student is stuck.",
        ],
      },
      {
        heading: "What a tutor does differently",
        paragraphs: [
          "A good human tutor rarely gives the answer. She asks a question, waits, and asks a better one. The good news is that chatbots can be told to behave this way. Most students never try, because nobody showed them how.",
          "Here are three prompts I give in class. The first: 'Do not give me the answer. Ask me one question at a time until I can explain price elasticity in my own words.' The model now plays tutor, and the student has to produce thinking before getting any help.",
          "The second: 'Here is my explanation of what a p-value means. Tell me what is wrong with it, but do not rewrite it.' The student keeps authorship and gets feedback, which is what a teacher with fifty papers to mark rarely has time to give.",
          "The third: 'Quiz me on this chapter with five questions, getting harder each time. Wait for my answer before showing the next one.' This turns passive reading into active recall, one of the best-supported habits in learning research.",
          "None of these prompts is clever. What changes is the role. The student asks the model to push, not to carry.",
        ],
      },
      {
        heading: "Three habits I ask students to build",
        paragraphs: [
          "First, try before you ask. Write your own attempt, even a bad one, before opening the chatbot. A weak first draft is a map of what you do not yet understand. Skipping it means skipping the map.",
          "Second, keep the thinking visible. I ask students to save the conversation and hand it in with the work. This is not to catch them. It shows me how they used the tool, and it shows them the difference between a conversation that taught them something and one that only produced text.",
          "Third, verify at least one claim. Language models state wrong things in a confident voice, and they sometimes invent citations that look real. Pick one number or one reference from every AI answer and trace it to the source. Students who do this twice rarely stop doing it.",
        ],
      },
      {
        heading: "What teachers can do on Monday",
        paragraphs: [
          "Say plainly what is allowed for each assignment. 'Use AI however you like' and 'do not use AI' are both unclear. A better line is: you may use AI to quiz yourself and to critique your draft, but the draft must be yours. Students respect clear rules far more than vague threats.",
          "Show AI failing, live, in class. Ask a chatbot for a statistic about Nepal, then trace it to the official source together. Sometimes the answer is right and sometimes it is not. The lesson is that nobody can tell without checking, and that is the lesson you want every student to leave with.",
          "Finally, use the tool yourself, in front of them. Students learn more from watching a teacher doubt an AI answer than from any policy document.",
          "And give students a way to be honest. If a student fears punishment for admitting they used AI, they will hide it, and you lose the chance to teach them to use it well. A class where students say 'I used it to check my reasoning, and here is what I changed' is a class where real learning is visible. Build that trust early, and reward the students who show their process.",
          "None of this needs a new budget or a new platform. It needs a teacher willing to change a few assignments and a few habits. That is a smaller ask than it sounds, and the return is a classroom where AI makes students more capable, not less.",
        ],
      },
      {
        heading: "One assignment, two ways",
        paragraphs: [
          "Let me show the difference with a single task: write a short note on why prices rose in a local market last year.",
          "In the ghostwriter version, the student types the task into a chatbot and pastes the answer. It mentions supply chains, fuel costs and demand. It sounds right. The student could not tell you which of those factors mattered in their own town, because they never looked.",
          "In the tutor version, the student first walks through the market, or asks a parent, and writes three rough reasons in their own words. Then they ask the chatbot to play a sceptical economist: which of my reasons is weakest, and what evidence would I need to defend it? The model pushes back. The student goes to find a price record or asks a shopkeeper. The final note is shorter and plainer than the chatbot version, but every sentence is something the student can defend.",
          "The second path takes longer. That is the point. The extra time is the learning.",
        ],
      },
      {
        heading: "Where AI tutoring falls short",
        paragraphs: [
          "I do not want to oversell this. A chatbot tutor has real limits. It does not know your syllabus unless you tell it. It can be too agreeable, praising a weak answer to keep the conversation pleasant. It can explain a concept wrongly in a friendly tone. And it cannot notice that a student looks tired or lost, as a good teacher can.",
          "So I treat AI tutoring as a supplement. It is a patient practice partner for the hours when the teacher is not there, which in a crowded class is most hours. The human teacher still sets the goals, checks understanding and notices the student who has stopped coming.",
          "There is also a fairness question. A student with a good phone, stable internet and some English gets far more from these tools than a student without them. If we introduce AI tutoring without teaching it openly to everyone, we will widen the gap we hope to close. Teaching these habits in the classroom, to all students at once, is one way to avoid that.",
        ],
      },
      {
        heading: "A simple test",
        paragraphs: [
          "When I am unsure whether a use of AI is healthy, I ask one question. Could the student do a smaller version of this task tomorrow, without the tool? If yes, the AI was a tutor. If no, it was a ghostwriter.",
          "Education has always been about building capability inside a person's head. The tools change every decade. That goal does not, and we should refuse to trade it for a clean-looking assignment.",
        ],
      },
    ],
  },
  {
    slug: "teachers-need-ai-skills-before-ai-tools",
    title: "What Nepal's Teachers Need Before They Need an AI Tool",
    excerpt:
      "Handing teachers an AI app is not training. Training starts with the teacher's real Monday morning and ends with follow-up, not a certificate.",
    date: "2026-10-08",
    displayDate: "October 8, 2026",
    category: "Digital Nepal",
    readTime: "9 min read",
    tags: ["Teachers", "AI training", "Nepal"],
    cover: "/images/blog/teachers-need-ai-skills-before-ai-tools-cartoon.svg",
    coverAlt: "Cartoon of a teacher at a chalkboard with children at desks and a laptop showing an idea",
    sections: [
      {
        paragraphs: [
          "When a new technology reaches education, the first move is usually to buy it, or to announce it. Tablets, smart boards, learning apps, and now AI assistants arrive with a launch event. The teacher is invited to attend, shown the screen, and sent back to class.",
          "I have run AI training for government school teachers, and the lesson I took away is that the tool is never the hard part. The hard part is the teacher's day. A teacher in a public school may have a large class, children at very different levels, a thick syllabus and little time to prepare. A tool that ignores that day will be switched off by Friday.",
          "So my argument is this. Before Nepal's teachers need an AI tool, they need three things: a clear reason to use it, the skill to use it safely, and someone to call when it goes wrong.",
        ],
      },
      {
        heading: "Start with the Monday morning problem",
        paragraphs: [
          "In my sessions I do not begin with what AI is. I begin by asking teachers what takes their time. The answers are practical and honest: preparing lesson plans, making practice questions, marking, explaining one idea to children who learn at different speeds, finding examples that the children can relate to.",
          "Each of those is a task AI can help with, and each can be shown in ten minutes. A teacher can paste a textbook chapter and ask for fifteen practice questions at three difficulty levels. She can ask for the same idea explained for a weak reader and for a fast one. She can ask for examples set in a village market instead of a London street.",
          "When a teacher sees her own problem shrink on the screen, the training changes. She stops being a listener and starts being a user. That moment cannot be created by a slide about what machine learning is.",
        ],
      },
      {
        heading: "Teach the limits as carefully as the uses",
        paragraphs: [
          "A tool used without knowing its limits is a risk, and in a classroom the risk lands on children. I teach four limits in every session.",
          "First, AI makes mistakes and states them with confidence. A teacher must read every generated answer key before using it. Second, AI works unevenly in Nepali. It is often better in English, so teachers should check the language, the grammar and the cultural fit of anything produced. Third, generated material may not match the national curriculum. The teacher is the one who knows the curriculum, so the teacher stays in charge. Fourth, never paste children's names, marks or personal details into a public chatbot.",
          "These four rules are not complicated. They take twenty minutes. But without them, a well-meaning teacher can hand out a worksheet with a wrong answer printed on it, and thirty children will learn the wrong thing.",
        ],
      },
      {
        heading: "Why one-day workshops are not enough",
        paragraphs: [
          "A single workshop gives a teacher an experience. It does not give her a habit. Habits form through repetition, and repetition needs a reason to return.",
          "What works better, in my experience, is a short, hands-on session followed by a small task to try in real classes, then a second meeting to share what happened. Teachers who tried something and saw it work in front of real children carry that confidence back to the staff room. Peer teachers are far more persuasive than any trainer who visits for a day.",
          "It also helps to build around small groups inside one school. When two or three teachers in the same building learn together, they can help each other next week. A lone teacher in a lone workshop has nobody to ask.",
          "School leaders matter here too. A head teacher who says 'try this, and tell me what worked' gives teachers permission to experiment. A head teacher who says nothing signals that the training was a formality. The cheapest support a school can give is time: thirty minutes a month when teachers share what they tried. Without that time, even a good workshop fades within weeks.",
          "I also tell teachers that they do not need to be experts to begin. They need curiosity, a clear task and a habit of checking. Everything else can be learned along the way, and the first small win usually changes how a teacher feels about the whole subject.",
        ],
      },
      {
        heading: "The conditions outside the classroom",
        paragraphs: [
          "Honest training also names what teachers cannot fix. Many schools have limited devices, patchy internet and unreliable power. A plan that assumes every child has a screen will fail in exactly the schools that most need help.",
          "The better design puts the technology in the teacher's hands, not the children's. The teacher uses AI at home or in a staff room to prepare, then teaches with chalk, paper and voice as before. This is realistic for a very large number of schools, and it respects what is already there.",
          "It also means Nepali-language support matters more than any new feature. If the best tools work well only in English, the gap between English-medium private schools and Nepali-medium public schools grows. That would be a quiet and expensive mistake.",
        ],
      },
      {
        heading: "What a good session looks like",
        paragraphs: [
          "Let me describe the shape I aim for, because the shape matters more than the slides. The first twenty minutes are talk: what AI can and cannot do, shown with one live example that sometimes goes wrong on purpose. Then teachers open the tool and work on a real task from their own subject and grade. I walk around and answer questions one by one.",
          "The most useful part is the sharing at the end. One teacher shows a quiz she made for her science class. Another shows an explanation she rewrote for a weaker group. Others see what is possible in their own subject and ask for the prompt. No trainer can match the force of a colleague saying 'I used this yesterday'.",
          "I always end with one small commitment. Each teacher picks a single task to try before we next meet. One task is enough. Teachers who try ten things at once try nothing.",
        ],
      },
      {
        heading: "Who trains the trainers",
        paragraphs: [
          "There is a larger question behind all of this. Nepal has far too many teachers for any small team of outside trainers to reach. If AI skills are to spread, they must live inside the institutions that already train and support teachers: teacher education campuses, resource centres, local education offices and the colleges that prepare new teachers.",
          "That means training the trainers, and giving them materials in Nepali, in forms they can adapt. A guide that fits on two pages and uses examples from the Nepali curriculum will travel further than a large report in English.",
          "It also means being honest about what we do not yet know. We have little solid evidence from Nepal on which AI uses actually improve learning for children. That is not a reason to wait. It is a reason to start small, record what happens and share the results, good and bad.",
        ],
      },
      {
        heading: "Measure what changes",
        paragraphs: [
          "Training programmes love to count how many teachers attended. That number tells us almost nothing. A better question is what changed three months later. Are teachers still using the tools? For which tasks? Did preparation time fall? Did the quality of questions and explanations improve?",
          "These are simple questions to ask in a short follow-up survey, and they allow honest adjustment. If a part of the training did not stick, we should know and fix it. Public money spent on teacher training deserves that discipline.",
          "The choice in front of us is not between AI and no AI in Nepali classrooms. AI is coming either way. The choice is whether teachers meet it as a tool they understand and control, or as one more thing handed down from outside. I know which one I am working for.",
        ],
      },
    ],
  },
  {
    slug: "rethinking-assessment-in-the-age-of-ai",
    title: "Rethinking Assessment When Every Student Has a Chatbot",
    excerpt:
      "Banning AI and detecting AI both lead to an arms race we cannot win. Better to design assessment where understanding is the only thing that passes.",
    date: "2026-10-03",
    displayDate: "October 3, 2026",
    category: "Teaching & Learning",
    readTime: "9 min read",
    tags: ["Assessment", "Universities", "AI in education"],
    cover: "/images/blog/rethinking-assessment-in-the-age-of-ai-cartoon.svg",
    coverAlt: "Cartoon of a student explaining a poster to a lecturer holding a clipboard",
    sections: [
      {
        paragraphs: [
          "Most of our assessment system was built for a world in which producing a good essay was hard. Writing took time, and the finished essay was decent proof that a student had read, thought and understood. That link is now broken. A chatbot can produce a competent essay in thirty seconds.",
          "Universities have reacted in two ways. Some ban AI. Others buy software that claims to detect it. Both responses feel natural, and both are weak. A ban is hard to enforce and drives use out of sight. Detection tools produce false accusations, and students who write simply, or who write in a second language, are the ones most at risk of being wrongly flagged.",
          "I think the better response is to change what we ask students to do. If an assignment can be completed well without understanding, the assignment is the problem.",
        ],
      },
      {
        heading: "Ask what you actually want to know",
        paragraphs: [
          "Every assessment is an indirect way of asking one question: does this person understand the subject? An essay was a convenient proxy. Now we need better proxies, or we need to ask the question more directly.",
          "When I teach a short course like the four-day Excel and AI programme at KUSOM, there is no time for long essays. What works is watching people work. A participant builds something on the day, and then explains why they chose that formula or that chart. If they cannot explain it, they have not learned it, whoever or whatever produced the first version. That kind of live, short check is hard to fake and quick to run.",
          "The lesson carries over to a semester course. The final product matters less than the student's ability to talk about it.",
          "There is a useful side effect. When students know they will have to explain their work, they use AI differently. They stop asking it to finish the job and start asking it to help them understand the job. The assessment shapes the behaviour, which is exactly what good assessment should do.",
          "This is not a new idea. Teachers have always asked students to show their working in mathematics. What is new is that we now need to ask for it in every subject, because the finished product alone can no longer carry the proof.",
        ],
      },
      {
        heading: "Four designs that hold up",
        paragraphs: [
          "The first is the short oral check. Pick a sample of students, or a sample of questions, and ask the student to explain their own submitted work for five minutes. You do not need to do this for everyone every time. The possibility of being asked changes how students prepare.",
          "The second is work that begins in the room. Start a problem in class, on paper or on a shared screen, so that the first thinking is visibly the student's own. Later work can use AI, but it builds on that base.",
          "The third is local and personal data. Ask students to collect something themselves: interview three shopkeepers in their neighbourhood, record prices at the local market for a week, survey twenty classmates. A chatbot has no access to that data. The student has to deal with real mess, and real mess is where learning happens. This is also close to how I learned field research.",
          "The fourth is the process portfolio. Ask for drafts, notes, the AI conversation and a short reflection on what the student accepted and what they rejected. Grade the reasoning, not only the final text. A student who can say 'the model suggested this, and I rejected it because the sample was too small' is showing exactly the skill we want.",
        ],
      },
      {
        heading: "The honest objection: we have large classes",
        paragraphs: [
          "Any lecturer in Nepal will say, fairly, that oral checks and portfolios sound lovely but they teach large classes and have little time. This is the real constraint, and it deserves a real answer.",
          "Sampling is part of the answer. You do not have to listen to everyone. Another part is peer assessment, where students explain their work to each other using a simple rubric. A third is moving routine marking onto AI, with the teacher checking a sample, and spending the saved hours on the small number of conversations that matter most. AI can give the teacher time, and good assessment needs exactly that.",
          "It will not be perfect. But an imperfect system built around understanding beats a perfect-looking system that rewards whoever has the best chatbot.",
          "Start small if you must. Change one assignment this semester, not all of them. Add a five minute conversation to one task. See what you learn about your students that the written work never showed you. Most teachers who try this once do not go back.",
        ],
      },
      {
        heading: "Why detection software is the wrong bet",
        paragraphs: [
          "It is worth being direct about detectors. They give a probability, not proof. They can flag honest work and miss dishonest work, and the people who build them say so. A mark, a scholarship or a student's name should never depend on a guess from software.",
          "There is a deeper problem. Detection puts the teacher in the role of police. Every submission becomes a suspect document. Students who did nothing wrong feel watched, and the relationship that makes teaching work starts to break. Even if detectors improve, the models will improve faster, and the contest will not end.",
          "Redesigning assessment is slower, but it ends the contest. When the task itself requires the student to be present, explain and defend, there is nothing left to detect.",
        ],
      },
      {
        heading: "One assignment, redesigned",
        paragraphs: [
          "Here is how I would change a common task: a 2,000 word essay on the effects of remittances on a Nepali household. As it stands, a chatbot can write it in a minute.",
          "In the redesigned version, students interview two households in their own community about remittances, with a short guide they prepare in class. They write a 700 word note using their own findings and attach their interview notes. They may use AI to organise ideas and critique the draft, and they attach that conversation. Then each student spends five minutes in a short conversation with me or a peer, explaining one finding and one thing they could not explain.",
          "The result is shorter to read and richer to mark. The student has met real people, handled real mess and learned how to use AI without being replaced by it. Compare that with a clean essay whose author I cannot identify.",
        ],
      },
      {
        heading: "Fairness comes first",
        paragraphs: [
          "One more point. Students do not start equal. Some have paid subscriptions to the strongest tools, a laptop at home and a stable connection. Others share a phone. If our rules ignore this, we reward access, not ability.",
          "That argues for doing the key assessments inside the institution, where everyone has the same conditions, and for teaching AI skills openly so that no one is learning them by luck. It also argues against any rule that depends on catching students in the act, because those rules fall hardest on the ones with the least support.",
        ],
      },
      {
        heading: "The choice for universities",
        paragraphs: [
          "We can spend the next five years chasing students with detection software, or we can spend them redesigning assessment to reward understanding. The first path exhausts teachers and damages trust. The second is more work now and less work later.",
          "I would rather build assessments where using AI well is part of doing well, and where understanding the material is the only way to pass. That is the kind of graduate Nepal needs, and it is the kind of university worth attending.",
        ],
      },
    ],
  },
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
