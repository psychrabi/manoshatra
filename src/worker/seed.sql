-- Seed data for ManoShastra D1Database
-- This file contains sample data for development and testing

-- Blog Posts(simplified content for SQL execution)
INSERT INTO blog_posts (id, title, content, excerpt, author, category, image_url, tags, published, created_at, updated_at) VALUES 
('seed-post-001', 
 'Understanding Anxiety: Signs, Symptoms & Coping Strategies',
 'Anxiety is one of the most common mental health conditions worldwide. Understanding anxiety is the first step toward managing it effectively. Anxiety is a natural human response to perceived threats or stressors. It becomes a problem when it persists and interferes with daily life. Common symptoms include rapid heartbeat, excessive worry, difficulty concentrating, and irritability. Coping strategies include deep breathing, mindfulness, physical activity, and professional support.',
 'Learn to recognize anxiety signs and discover evidence-based coping strategies.',
 'Trishna Gosh Chhetri',
 'Mental Health',
 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
 'anxiety, mental health, coping, therapy',
 1,
 datetime('now'),
 datetime('now')
);

INSERT INTO blog_posts(id, title, content, excerpt, author, category, image_url, tags, published, created_at, updated_at) VALUES 
('seed-post-002',
 'The Importance of Mental Health in Everyday Life',
 'Mental health is fundamental to overall wellbeing. It affects how we think, feel, and act. Mental health matters at every life stage from childhood through adulthood. Research shows mental and physical health are deeply interconnected. Breaking the stigma around mental health is crucial. You do not need to be in crisis to benefit from mental health support.',
 'Discover why prioritizing your mental health leads to a fuller, richer life.',
 'Sajjan Shrestha',
 'Wellness',
 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
 'mental health, wellness, awareness',
 1,
 datetime('now'),
 datetime('now')
);

INSERT INTO blog_posts(id, title, content, excerpt, author, category, image_url, tags, published, created_at, updated_at) VALUES 
('seed-post-003',
 'Family Therapy: Strengthening Bonds and Resolving Conflicts',
 'Families are our foundation, but even strong families face challenges. Family therapy provides a safe space to improve communication and resolve conflicts. Common issues addressed include communication breakdowns, parent-child conflicts, and major life transitions. Benefits include improved communication, healthier boundaries, and enhanced empathy.',
 'Learn how family therapy can help build stronger relationships.',
 'Trishna Gosh Chhetri',
 'Family',
 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
 'family therapy, relationships, communication',
 1,
 datetime('now'),
 datetime('now')
);

-- Research Publications
INSERT INTO research (id, title, authors, abstract, journal, year, doi, created_at) VALUES 
('seed-research-001',
 'Prevalence of Anxiety and Depression Among University Students in Nepal',
 'Sajjan Shrestha, Trishna Gosh Chhetri',
 'This study examines the prevalence of anxiety and depression among university students in Kathmandu Valley, Nepal. Using standardized assessment tools, we surveyed 500 undergraduate students across three universities. Results indicate that 35% of students experienced moderate to severe anxiety, while 28% reported symptoms of depression. Academic pressure, financial concerns, and social adjustment were identified as significant predictors.',
 'Journal of Global Mental Health',
 2023,
 '10.1234/jgmh.2023.001',
 datetime('now')
);

INSERT INTO research (id, title, authors, abstract, journal, year, doi, created_at) VALUES 
('seed-research-002',
 'Effectiveness of Community-Based Mental Health Interventions in Rural Nepal',
 'Trishna Gosh Chhetri, Sajjan Shrestha',
 'This randomized controlled trial evaluated the effectiveness of a community-based mental health intervention delivered by trained community health workers in rural Nepal. Participants (N=300) showed significant improvements in mental health outcomes compared to control group. The intervention demonstrated particular efficacy for depression and PTSD symptoms.',
 'International Journal of Mental Health Systems',
 2022,
 '10.1234/ijmhs.2022.015',
 datetime('now')
);

-- Testimonials
INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES 
('seed-testimonial-001',
 'Anonymous',
 'Life-Changing Experience',
 'The counseling sessions at ManoShastra have been truly transformative. The therapists are compassionate, professional, and genuinely care about your wellbeing. I''ve learned invaluable coping strategies and feel more empowered than ever.',
 5,
 datetime('now')
);

INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES 
('seed-testimonial-002',
 'S.R.',
 'Highly Recommend',
 'After struggling with anxiety for years, I finally found the support I needed. The team at ManoShastra provided a safe space to work through my challenges. I''m grateful for their expertise and dedication.',
 5,
 datetime('now')
);

INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES 
('seed-testimonial-003',
 'K.B.',
 'Professional and Caring',
 'The family therapy sessions helped us navigate a difficult period in our lives. Our therapist was patient, understanding, and skilled at facilitating productive conversations. Our family relationships have improved significantly.',
 5,
 datetime('now')
);
