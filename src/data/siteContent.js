/** Personal site copy — edit here to update the portfolio. */
export const site = {
  name: 'Viraj Sonawane',
  firstName: 'Viraj',
  navBrand: 'Viraj Sonawane',
  credential: 'M.Sc. (Computer Science)',
  title: 'Software Developer',
  tagline:
    'Building production-grade web applications with React, .NET, and clean, maintainable code.',
  hero: {
    statusRole: 'Software Developer',
    statusNote: 'Open to opportunities',
    taglineLead: 'I design and build web apps that',
    taglineAccent: 'are built to last.',
    meta: [
      { icon: 'map-pin', strong: 'Based in Pune,', muted: 'India' },
      { icon: 'layers', strong: 'Full-stack dev,', muted: 'React · .NET · Django' },
      { icon: 'graduation-cap', strong: 'M.Sc. CS,', muted: 'PG-DAC · CDAC' },
    ],
    sayHi: 'Say hi on',
  },
  heroIntro:
    'I focus on growing my skills and contributing to teams that value hard work and quality delivery. Based in Pune, India.',
  about: {
    eyebrow: 'Who I am',
    heading: 'About',
    bio: `I'm a Junior Software Developer at IBN Technologies Ltd, building production web apps with React, Vite, and JavaScript (JSX). I hold an M.Sc. in Computer Science and a PG-DAC from CDAC, with hands-on experience across frontend (Tailwind, Radix, shadcn/ui, Zustand) and backend (C#, .NET, Python, Django REST, MySQL).`,
    facts: [
      { label: 'Currently', value: 'Junior Software Developer @ IBN Technologies' },
      { label: 'Education', value: 'M.Sc. Computer Science · PG-DAC (CDAC)' },
      { label: 'Focus', value: 'React frontends · .NET & Django backends' },
      { label: 'Location', value: 'Pune, India' },
    ],
    skills: [
      { name: 'React / Vite / JavaScript', level: 92 },
      { name: 'HTML / CSS / Tailwind CSS', level: 90 },
      { name: 'Python / Django / REST APIs', level: 85 },
      { name: 'C# / ASP.NET / .NET', level: 82 },
      { name: 'MySQL / Git / GitHub', level: 86 },
    ],
  },
  showcase: {
    eyebrow: 'Selected work',
    heading: 'Showcase',
    intro: 'Production work I can talk about in depth.',
  },
  projects: [
    {
      title: 'CADashboard',
      description:
        'Enterprise-style dashboard for managing clients, employees, tasks, documents, expenses, invoices, and reporting. Full-stack delivery across admin and business workflows.',
      highlights: [
        'Clients, employees, tasks, and documents managed in one place',
        'Expense, invoice, and reporting workflows for admin teams',
        'React frontend backed by C#/.NET Web API and Django REST services',
      ],
      stack: [
        'React',
        'C#',
        'Web API',
        'ASP.NET',
        'Python',
        'Django',
        'MySQL',
      ],
      href: '#contact',
      liveLabel: 'Ask me about this project',
    },
  ],
  skillset: {
    eyebrow: 'My skillset',
    headingLead: 'The stack',
    headingAccent: 'behind the work.',
    items: [
      'React',
      'Vite',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Radix UI',
      'shadcn/ui',
      'Zustand',
      'Axios',
      'Zod',
      'Recharts',
      'Python',
      'Django',
      'Django REST',
      'C#',
      'ASP.NET',
      '.NET',
      'MySQL',
      'JWT Auth',
      'Pandas',
      'NumPy',
      'Git',
      'GitHub',
    ],
    marquee: [
      'Responsive',
      'Accessible',
      'Reliable',
      'Scalable',
      'Maintainable',
      'Fast',
      'Secure',
      'Polished',
    ],
  },
  resume: {
    eyebrow: 'The journey',
    heading: 'Resume',
    intro: 'Education, experience, and highlights from my CV.',
    education: [
      {
        period: 'Mar 2024 — Aug 2024',
        title: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
        org: 'Know-IT CDAC · Pune',
        detail:
          'Intensive postgraduate programme in advanced computing and software engineering.',
      },
      {
        period: 'Aug 2021 — Jun 2023',
        title: "Master's in Computer Science",
        org: "Rajgad Dnyanpeeth's Anantrao Thopte College · Bhor, Pune",
        detail: 'Percentage: 76.35% · CGPA: 8.35',
      },
    ],
    experience: [
      {
        period: 'Jan 2026 — Present',
        title: 'Junior Software Developer',
        org: 'IBN Technologies Ltd · Pune, India',
        detail:
          'Building production-grade web applications with React, Vite, and JavaScript (JSX).',
      },
      {
        period: 'Mar 2025 — Dec 2025',
        title: 'Intern',
        org: 'IBN Technologies Ltd · Pune, India',
        detail:
          'Frontend: HTML, CSS, JavaScript, React, Vite, JSX, Tailwind CSS, Radix UI, shadcn/ui. State & data: Zustand, Context API, Axios, Zod, Recharts. Backend: C# (.NET Framework 4.7), Python, Django, Django REST Framework. Data & tools: MySQL, JWT auth, Pandas, NumPy.',
      },
    ],
    achievements: [
      'PG Diploma in Advanced Computing (PG-DAC), CDAC',
      'HTML & CSS — Cursa',
      'Agile Methodology — Forage / Cognizant',
      'JAVA — LinkedIn Learning',
    ],
    languages: [
      { name: 'English', level: 'Full professional proficiency' },
      { name: 'Hindi', level: 'Full professional proficiency' },
      { name: 'Marathi', level: 'Full professional proficiency' },
    ],
    softSkills: ['Communication', 'Problem-solving', 'Decision making'],
  },
  /**
   * Testimonials — the section renders only when this list is non-empty.
   * Add entries like:
   * { quote: '…', name: 'Person Name', role: 'Their role · Company' }
   */
  testimonials: {
    eyebrow: 'What others say',
    headingLead: 'The voices',
    headingAccent: 'behind the work.',
    items: [],
  },
  contact: {
    eyebrow: 'Get in touch',
    headingLead: "Let's build",
    headingAccent: 'something together.',
    email: 'virajsonawane22@gmail.com',
    phone: '+91 8698449087',
    location: 'Pune, India',
    social: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/viraj-sonawane-2bb234232',
        icon: 'linkedin',
      },
      { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    ],
  },
  footer: {
    bigText: 'Viraj Sonawane',
    note: 'Designed & built with React, Tailwind CSS, and Framer Motion.',
  },
}
