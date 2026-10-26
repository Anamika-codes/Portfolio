export const profile = {
  name: 'Anamika Mukherjee',
  badge: "CSE '27",
  role: 'Full Stack Developer',
  subtitle: "Full Stack Developer | B.Tech CSE '27 | Machine Learning",
  headline: 'I turn ideas into working web apps and smart tools.',
  location: 'Prayagraj, India',
  company: '',
  email: 'anamikamukh11@gmail.com',
  github: 'github.com/Anamika-codes',
  githubUrl: 'https://github.com/Anamika-codes',
}

export const navLinks = [
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'DNA / Qualities', href: '#qualities', id: 'qualities' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const stats = [
  { icon: 'folder', value: '5', label: 'Projects Built' },
  { icon: 'bolt', value: '1', label: 'Live Product' },
  { icon: 'briefcase', value: 'Available', label: 'Open to Opportunities' },
  { icon: 'cap', value: '2027', label: 'B.Tech CSE Class' },
]

/** The seven architectural principles — one per letter of A-N-A-M-I-K-A. */
export const dna = [
  {
    letter: 'A',
    title: 'Ambitious',
    description: 'Setting high goals and turning ideas into shipped, working products.',
  },
  {
    letter: 'N',
    title: 'Nimble',
    description: 'Rapid prototyping, agile feature iteration, and efficient deployment feedback cycles.',
  },
  {
    letter: 'A',
    title: 'Analytical',
    description: 'Explainable AI, rigorous parameter modeling, and data-driven algorithmic decisions.',
  },
  {
    letter: 'M',
    title: 'Meticulous',
    description: 'Rigorous attention to edge cases, clean git hygiene, and high standard code craftsmanship.',
  },
  {
    letter: 'I',
    title: 'Innovative',
    description: 'Blending accessible web UI design with practical predictive machine learning capabilities.',
  },
  {
    letter: 'K',
    title: 'Keen Learner',
    description: 'Continuously mastering evolving web technologies, ML runtimes, and engineering frameworks.',
  },
  {
    letter: 'A',
    title: 'Adaptable',
    description: 'Bridging polished frontend aesthetics with resilient server logic and responsive APIs.',
  },
]

export const projects = [
  {
    tag: 'Full Stack',
    status: 'Live Application',
    statusTone: 'live',
    icon: 'mail',
    title: 'Cold Email Generator',
    description:
      'Generates structured, personalized cold outreach emails with dynamic parameters.',
    bullets: [
      'Automated subject and personalized body generation',
      'Instant live preview with single-click copy',
    ],
    chips: ['HTML5', 'CSS3', 'JavaScript', 'Python/Streamlit'],
    buttons: [
      { label: 'Live Demo', variant: 'primary', href: 'https://github.com/Anamika-codes' },
      { label: 'Code', variant: 'outline', href: 'https://github.com/Anamika-codes' },
    ],
  },
  {
    tag: 'ML / AI',
    status: 'In Development',
    statusTone: 'dev',
    icon: 'compass',
    title: 'SkillScout',
    description:
      'Evaluates candidate competencies, interests, and profile data to recommend a customized career roadmap.',
    bullets: [
      'Multi-parameter candidate evaluation engine',
      'Data-driven career trajectory mappings',
    ],
    chips: ['Python', 'HTML/CSS', 'Recommendation'],
    buttons: [{ label: 'View Repository', variant: 'outline', href: 'https://github.com/Anamika-codes' }],
  },
  {
    tag: 'ML / AI',
    status: 'In Development',
    statusTone: 'dev',
    icon: 'chart',
    title: 'AI Salary Predictor',
    description:
      'Predicts industry compensation using machine learning models and provides explainable results.',
    bullets: [
      'Scikit-learn pipeline with explainability',
      'Interactive parameter-driven UI',
    ],
    chips: ['Python', 'scikit-learn', 'SHAP', 'Streamlit'],
    buttons: [{ label: 'View Repository', variant: 'outline', href: 'https://github.com/Anamika-codes' }],
  },
  {
    tag: 'Full Stack / AI',
    status: 'In Development',
    statusTone: 'dev',
    icon: 'bolt',
    title: 'AlertNexa',
    description:
      'A responsive crisis-awareness platform that anticipates natural hazards and keeps vulnerable communities informed, alerted and prepared.',
    bullets: [
      'Predictive hazard alert pipelines with live geodata',
      'Accessible, responsive alert dashboards for the public',
    ],
    chips: ['HTML5', 'CSS3', 'JavaScript', 'Python'],
    buttons: [{ label: 'View Repository', variant: 'outline', href: 'https://github.com/Anamika-codes' }],
  },
  {
    tag: 'Web Application',
    status: 'In Development',
    statusTone: 'dev',
    icon: 'compass',
    title: 'Word-Morph',
    description:
      'Translates and mutates textual content across dialects and languages through an accessible, keyboard-first interface.',
    bullets: [
      'Multi-dialect transformation and mutation pipeline',
      'Keyboard-first accessible text tooling',
    ],
    chips: ['JavaScript', 'HTML5', 'CSS3'],
    buttons: [{ label: 'View Repository', variant: 'outline', href: 'https://github.com/Anamika-codes' }],
  },
]

export const timeline = [
  {
    id: 'education',
    icon: 'cap',
    left: {
      card: true,
      heading: 'B.Tech in Computer Science & Engineering',
      text: 'Building a strong foundation in Data Structures, Algorithms, Web Engineering, Machine Learning, OOP, DBMS and Software Architecture.',
      chips: ['DSA', 'DBMS', 'Web Engineering', 'Machine Learning', 'OOP'],
    },
    right: {
      card: true,
      bullets: [
        'Expected Graduation: 2027',
        'Prayagraj, India',
        'Focus: Full-Stack Development & Applied ML',
      ],
    },
  },
]

export const skills = [
  {
    icon: 'code',
    title: 'Frontend',
    description: 'Interactive & accessible interfaces',
    chips: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React'],
  },
  {
    icon: 'layers',
    title: 'Backend',
    description: 'Server runtimes & APIs',
    chips: ['Node.js', 'Express'],
  },
  {
    icon: 'database',
    title: 'Database',
    description: 'Data persistence & models',
    chips: ['MongoDB'],
  },
  {
    icon: 'cpu',
    title: 'AI & ML',
    description: 'Predictive pipelines & XAI',
    chips: ['Python', 'scikit-learn', 'SHAP', 'Streamlit'],
  },
  {
    icon: 'wrench',
    title: 'Tools',
    description: 'Version control & dev',
    chips: ['Git', 'GitHub', 'VS Code'],
  },
]

export const services = [
  {
    icon: 'monitor',
    title: 'Responsive Website',
    description:
      'Fast, mobile-friendly personal or business websites engineered cleanly for any screen size.',
    timeline: '1-2 weeks',
  },
  {
    icon: 'layers',
    title: 'Full-Stack Web App',
    description:
      'Interactive web applications with databases, authentication, responsive views, and tailored business logic.',
    timeline: '2-4 weeks',
  },
  {
    icon: 'rocket',
    title: 'High-Converting Landing Page',
    description:
      'Clean, focused landing pages tailored to your product and content visions into stunning pages.',
    timeline: '3-5 days',
  },
  {
    icon: 'wrench',
    title: 'Bug Fixes & Site Improvements',
    description:
      'Performance optimization, responsive layout corrections, or integrating new endpoints into existing apps.',
    timeline: '1-3 days',
  },
]

export const process = [
  {
    step: '1',
    title: 'Discuss',
    description: 'We define your project goals, architectural constraints, and milestones clearly upfront.',
  },
  {
    step: '2',
    title: 'Design',
    description:
      'Structuring component hierarchies, data schemas, and interface wireframes before writing code.',
  },
  {
    step: '3',
    title: 'Build',
    description:
      'Clean, modular engineering with continuous progress updates, staged URLs, and feedback loops.',
  },
  {
    step: '4',
    title: 'Deliver',
    description:
      'Thorough verification, live production handover, documentation, and dedicated post-launch support.',
  },
]

export const about = {
  paragraphs: [
    'Hi! I am Anamika Mukherjee, a Computer Science undergraduate (graduating in 2027) based in Prayagraj, India and a Full Stack Developer. I enjoy connecting intuitive web applications with practical, explainable machine learning tools to solve meaningful problems.',
    'I believe in honest engineering: writing readable code, building systems that actually work, and continuously learning by shipping real software.',
    'Outside of technical work, I enjoy diving into books and discovering new places.',
  ],
  tags: [
    { icon: 'pen', label: 'Literary Explorer' },
    { icon: 'compass', label: 'Travel Lover' },
    { icon: 'spark', label: 'Continuous Learner' },
  ],
  quote: {
    label: 'Core Mindset',
    text: 'Pragmatic solutions over trendy frameworks. Shipping working software consistently.',
  },
}

export const contactCards = [
  { icon: 'mail', label: 'Email', value: 'anamikamukh11@gmail.com', href: 'mailto:anamikamukh11@gmail.com' },
  { icon: 'github', label: 'GitHub Profile', value: 'github.com/Anamika-codes', href: 'https://github.com/Anamika-codes' },
  { icon: 'social', label: 'LinkedIn', value: 'Anamika Mukherjee', href: 'https://www.linkedin.com/in/anamika-mukherjee-a04879320' },
  { icon: 'instagram', label: 'Instagram', value: '@anamika_codes', href: 'https://www.instagram.com/anamika_codes/' },
]

export const projectTypes = [
  'Job Opportunity (Fresher/Full-Time)',
  'Freelance Project',
  'Internship',
  'Other',
]
