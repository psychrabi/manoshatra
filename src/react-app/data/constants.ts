export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  license: string;
  bio: string;
  initials: string;
  color: string;
}

export interface Stat {
  number: string;
  label: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  facebook: string;
  hours: string;
  mapEmbed: string;
}


export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Psychiatric OPD",
    description:
      "Comprehensive psychiatric outpatient services for diagnosis, treatment planning, and medication management of mental health conditions.",
    icon: "brain",
    color: "green",
  },
  {
    id: 2,
    title: "Individual Counseling",
    description:
      "One-on-one therapeutic sessions tailored to your unique needs, helping you navigate life's challenges with professional guidance.",
    icon: "user",
    color: "blue",
  },
  {
    id: 3,
    title: "Family Therapy",
    description:
      "Strengthen family bonds, improve communication, and resolve conflicts with evidence-based family therapy approaches.",
    icon: "users",
    color: "green",
  },
  {
    id: 4,
    title: "Child & Adolescent Support",
    description:
      "Specialized mental health support for children and teenagers, addressing developmental challenges, behavioral issues, and emotional wellbeing.",
    icon: "heart",
    color: "blue",
  },
  {
    id: 5,
    title: "Crisis Intervention",
    description:
      "Immediate, compassionate support during mental health crises, providing stabilization and developing safety plans.",
    icon: "shield",
    color: "green",
  },
  {
    id: 6,
    title: "Group Therapy",
    description:
      "Structured therapeutic groups where participants share experiences, gain insights, and build supportive connections with peers.",
    icon: "users-round",
    color: "blue",
  },
  {
    id: 7,
    title: "Psychological Assessments",
    description:
      "Comprehensive psychological evaluations using standardized tools to accurately diagnose and understand mental health conditions.",
    icon: "clipboard",
    color: "green",
  },
];

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Suman Prasad Adhikari",
    designation: "Neuro Psychiatrist",
    license: "NMC: 9120",
    bio: "With extensive experience in neuropsychiatry, Dr. Adhikari specializes in diagnosing and treating complex psychiatric conditions with a compassionate, patient-centered approach.",
    initials: "SA",
    color: "bg-brand-green",
  },
  {
    id: 2,
    name: "Trishna Ghosh Chhetri",
    designation: "Consultant Clinical Psychologist",
    license: "NHPC: 01",
    bio: "Trishna brings expertise in cognitive behavioral therapy and evidence-based treatments, helping clients overcome anxiety, depression, and trauma with skill and empathy.",
    initials: "TG",
    color: "bg-brand-blue",
  },
  {
    id: 3,
    name: "Sajjan Shrestha",
    designation: "Psychologist",
    license: "",
    bio: "Sajjan specializes in individual counseling and psychological assessment, with a focus on helping clients understand themselves and achieve their full potential.",
    initials: "SS",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "Sarita Shrestha",
    designation: "Counseling Psychologist",
    license: "",
    bio: "Sarita specializes in child and adolescent mental health, providing age-appropriate therapeutic interventions to support young people through developmental challenges.",
    initials: "SS",
    color: "bg-sky-500",
  },
  {
    id: 5,
    name: "Pammi Thakur",
    designation: "Counseling Psychologist",
    license: "",
    bio: "Pammi is passionate about family therapy and relationship counseling, helping families build healthier communication patterns and stronger bonds.",
    initials: "PT",
    color: "bg-teal-500",
  },
  {
    id: 6,
    name: "Sharda Nepal",
    designation: "Counseling Psychologist",
    license: "",
    bio: "Sharda works with adolescents and adults experiencing difficulties such as anxiety, depression, ADHD, relationship issues, and other emotional or life challenges. Her approach focuses on emotional awareness, resilience, and practical coping.",
    initials: "SN",
    color: "bg-indigo-500",
  },
];

export const STATS: Stat[] = [
  { number: "500+", label: "Clients Helped", icon: "users" },
  { number: "6+", label: "Years of Service", icon: "calendar" },
  { number: "6", label: "Expert Specialists", icon: "award" },
  { number: "7", label: "Services Offered", icon: "heart" },
];

export const CONTACT_INFO: ContactInfo = {
  address: "Lalitpur-1, Kupondole, Lalitpur, Nepal",
  phone: "9708072525",
  email: "manoshastracounseling@gmail.com",
  facebook: "https://www.facebook.com/manoshastracounseling",
  hours: "Sun - Fri: 9:00 AM - 6:00 PM",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1907870516696!2d85.31446657534413!3d27.685056327120267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19be62c47cc7%3A0xdecb8b8e52f28b6c!2sKupondole%2C+Lalitpur+44700!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
};

export const SERVICE_OPTIONS: string[] = [
  "Psychiatric OPD",
  "Individual Counseling",
  "Family Therapy",
  "Child & Adolescent Support",
  "Crisis Intervention",
  "Group Therapy",
  "Psychological Assessment",
];
