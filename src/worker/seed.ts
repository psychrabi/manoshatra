import { makeId, nowUtc } from "./db";

export async function seedData(db: D1Database) {
  const postsCount = (await db
    .prepare("SELECT COUNT(*) as count FROM blog_posts")
    .first("count")) as number;
  if (postsCount === 0) {
    const p1 = db
      .prepare(
        "INSERT INTO blog_posts (id, title, content, excerpt, author, category, image_url, tags, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Understanding Anxiety: Signs, Symptoms & Coping Strategies",
        `Anxiety is one of the most common mental health conditions worldwide, yet it is often misunderstood. Understanding anxiety is the first step toward managing it effectively.\n\nAnxiety is a natural human response to perceived threats or stressors. It becomes a problem when it persists, intensifies, or begins to interfere with daily life.\n\n**Common Signs and Symptoms**\n\nPhysical symptoms may include rapid heartbeat, shortness of breath, sweating, trembling, and fatigue. Psychological symptoms include excessive worry, fear, difficulty concentrating, and irritability.\n\n**Coping Strategies**\n\n1. Deep Breathing: Practice diaphragmatic breathing to activate the parasympathetic nervous system.\n2. Mindfulness: Focus on the present moment rather than future worries.\n3. Physical Activity: Regular exercise reduces stress hormones and boosts mood.\n4. Professional Support: Therapy, particularly Cognitive Behavioral Therapy (CBT), is highly effective.\n\nIf anxiety is affecting your quality of life, reaching out to a mental health professional is a brave and important step.`,
        "Anxiety is one of the most common mental health conditions. Learn to recognize the signs and discover evidence-based coping strategies.",
        "Trishna Gosh Chhetri",
        "Mental Health",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        "anxiety, mental health, coping, therapy",
        1,
        nowUtc(),
        nowUtc()
      );

    const p2 = db
      .prepare(
        "INSERT INTO blog_posts (id, title, content, excerpt, author, category, image_url, tags, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "The Importance of Mental Health in Everyday Life",
        `Mental health is a fundamental component of overall wellbeing, yet it is often overlooked in our fast-paced society. Just as we take care of our physical health, our mental health deserves equal attention and care.\n\n**Why Mental Health Matters**\n\nMental health affects how we think, feel, and act. It influences how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.\n\n**The Mind-Body Connection**\n\nResearch consistently shows that mental and physical health are deeply interconnected. Poor mental health can contribute to physical health problems, while physical health issues can exacerbate mental health challenges.\n\n**Breaking the Stigma**\n\nOne of the greatest barriers to seeking mental health support is stigma. We must normalize conversations about mental health, just as we discuss physical ailments openly.\n\n**When to Seek Help**\n\nYou do not need to be in crisis to benefit from mental health support. Signs that you might benefit from professional help include persistent sadness, difficulty functioning, changes in sleep or appetite, and overwhelming stress.`,
        "Mental health is a fundamental component of overall wellbeing. Discover why prioritizing your mental health leads to a fuller, richer life.",
        "Sajjan Shrestha",
        "Wellness",
        "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
        "mental health, wellness, awareness",
        1,
        nowUtc(),
        nowUtc()
      );

    const p3 = db
      .prepare(
        "INSERT INTO blog_posts (id, title, content, excerpt, author, category, image_url, tags, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Family Therapy: Strengthening Bonds and Resolving Conflicts",
        `Family therapy is a type of psychotherapy that helps family members improve communication, resolve conflicts, and navigate challenging life transitions together.\n\n**What is Family Therapy?**\n\nUnlike individual therapy, family therapy views the family as a system where each member's behavior affects the others. A skilled therapist helps the family identify unhealthy patterns and develop healthier ways of interacting.\n\n**Benefits of Family Therapy**\n\n- Improved communication skills\n- Deeper understanding of family dynamics\n- Resolution of long-standing conflicts\n- Support during major life changes\n- Strengthened family bonds\n\n**When is Family Therapy Helpful?**\n\nFamily therapy can be beneficial when a family member has a mental health diagnosis, during divorce or separation, after the death of a loved one, when dealing with addiction, or simply to improve family relationships.\n\n**What to Expect**\n\nSessions typically involve all or some family members meeting with a therapist. The therapist creates a safe, non-judgmental space where everyone can express themselves openly.`,
        "Family therapy helps improve communication, resolve conflicts, and strengthen family bonds. Learn how this powerful approach can transform your family dynamics.",
        "Sarita Shrestha",
        "Family",
        "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&q=80",
        "family therapy, relationships, communication",
        1,
        nowUtc(),
        nowUtc()
      );

    await db.batch([p1, p2, p3]);
    console.log("Seeded initial blog posts");
  }

  const testimonialsCount = (await db
    .prepare("SELECT COUNT(*) as count FROM testimonials")
    .first("count")) as number;
  if (testimonialsCount === 0) {
    const t1 = db
      .prepare(
        "INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Rina K.",
        "Anxiety Management",
        "The counselors at ManoShastra helped me through the most difficult period of my life. I came in overwhelmed by anxiety and left with tools and confidence I never thought I'd have. Truly life-changing.",
        5,
        nowUtc()
      );
    const t2 = db
      .prepare(
        "INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Binod S.",
        "Individual Counseling",
        "I was skeptical about therapy at first, but the team made me feel so comfortable from the very first session. After three months, I feel like a completely different person, calmer, more focused, and happier.",
        5,
        nowUtc()
      );
    const t3 = db
      .prepare(
        "INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Maya T.",
        "Family Therapy",
        "Our family was struggling with communication issues for years. The family therapy sessions at ManoShastra gave us the tools we needed. Now we actually listen to each other. Highly recommend!",
        5,
        nowUtc()
      );
    const t4 = db
      .prepare(
        "INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Pradeep M.",
        "Psychiatric OPD",
        "Dr. Adhikari is an exceptional psychiatrist. He took the time to truly understand my situation before recommending any treatment. I finally feel heard and am on the path to recovery.",
        5,
        nowUtc()
      );

    await db.batch([t1, t2, t3, t4]);
    console.log("Seeded initial testimonials");
  }

  const publicationsCount = (await db
    .prepare("SELECT COUNT(*) as count FROM research")
    .first("count")) as number;
  if (publicationsCount === 0) {
    const r1 = db
      .prepare(
        "INSERT INTO research (id, title, authors, abstract, journal, year, doi, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Prevalence of Depression and Anxiety Among Urban Youth in Nepal",
        "Adhikari SP, Gosh Chhetri T, Shrestha S",
        "This study examines the prevalence and correlates of depression and anxiety among urban youth (ages 18-30) in the Kathmandu Valley. Using validated screening tools (PHQ-9 and GAD-7), we found that approximately 28% of respondents reported mild to severe depression symptoms and 23% reported anxiety symptoms. Key risk factors included academic pressure, family conflicts, and social isolation.",
        "Nepal Journal of Mental Health",
        2023,
        "10.xxxx/njmh.2023.001",
        nowUtc()
      );
    const r2 = db
      .prepare(
        "INSERT INTO research (id, title, authors, abstract, journal, year, doi, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        makeId(),
        "Effectiveness of Cognitive Behavioral Therapy in Managing PTSD Among Earthquake Survivors",
        "Shrestha S, Nepal S, Thakur P",
        "Following the 2015 Nepal earthquake, many survivors continue to experience post-traumatic stress disorder (PTSD). This study evaluates the effectiveness of adapted CBT interventions for earthquake survivors. A 12-session CBT protocol showed significant reduction in PTSD symptoms compared to the control group, with effects maintained at 6-month follow-up.",
        "International Journal of Disaster Psychology",
        2022,
        "10.xxxx/ijdp.2022.014",
        nowUtc()
      );

    await db.batch([r1, r2]);
    console.log("Seeded initial research publications");
  }
}
