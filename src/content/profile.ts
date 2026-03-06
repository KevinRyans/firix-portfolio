
export type Language = 'en'

export type ProjectCategory = 'All' | 'Frontend' | 'Backend' | 'Fullstack' | 'Open Source'

export type ProjectFilterOption = {
  value: ProjectCategory
  label: string
}

export type NavItem = {
  label: string
  to: string
}

export type ProjectOverride = {
  repo: string
  displayName?: string
  description?: string
  longDescription?: string
  demoUrl?: string
  tags?: string[]
  category?: ProjectCategory
  openSource?: boolean
  featured?: boolean
  status?: string
}

export type OpenSourceHighlight = {
  title: string
  problem: string
  solution: string
  tech: string[]
  repo?: string
}

export type TimelineItem = {
  time: string
  title: string
  description: string
}

export type ContactLink = {
  type: 'github' | 'discord' | 'email' | 'linkedin'
  label: string
  href: string
  value: string
}

export type ResumeEntry = {
  time: string
  title: string
  description: string
  details?: string[]
}

export type ResumeProject = {
  name: string
  description: string
}

const en = {
  meta: {
    title: 'FIRIX.NO',
    description:
      'Premium developer portfolio with modern dark UI, smooth motion, and GitHub-powered projects.',
  },
  brand: {
    name: 'FIRIX.NO',
    mark: 'F',
  },
  name: 'Michael',
  role: 'Fullstack Developer',
  tagline: 'I build things I am proud of — clean, fast, and with real attention to detail.',
  intro:
    '24 years old, self-taught, and been coding as a hobby for about 6 years. By day I run technical operations as a Maintenance Manager.',
  bio:
    'Based in Tønsberg, Norway. I work as Maintenance Manager at Quality Hotel — handling technical systems, compliance, and vendor coordination. Coding is a hobby I take seriously. Most of what I have built was for gaming communities and never made it to GitHub, but the experience is real. I have spent a lot of time on FiveM servers and other game server stacks, and I care about clean UI and solid architecture.',
  links: {
    github: 'https://github.com/KevinRyans',
    discord: 'https://discord.com/users/337288161094795294',
    email: 'mailto:michael@firix.no',
    linkedin: 'https://www.linkedin.com/in/michaelfiring/',
  },
  githubUsername: 'KevinRyans',
  hiddenProjects: ['ONYXportifolio'],
  ctas: {
    primaryLabel: 'View projects',
    secondaryLabel: 'Contact me',
  },
  navigation: [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Open Source', to: '/open-source' },
    { label: 'About', to: '/about' },
    { label: 'Resume', to: '/resume' },
    { label: 'Contact', to: '/contact' },
  ] satisfies NavItem[],
  home: {
    heroEyebrow: 'Fullstack Developer',
    heroTitle: "Hi, I'm Michael",
    heroSubtitle:
      'Self-taught fullstack developer building modern web projects as a hobby, while running technical operations full-time.',
    whatIDoTitle: 'What I do',
    whatIDoSubtitle:
      'Mixing modern web development with hands-on technical operations and a focus on clean delivery.',
    latestWorksTitle: 'Latest Works',
    latestWorksSubtitle: 'A selection of projects pulled directly from GitHub.',
    stackTitle: 'Stack',
    stackSubtitle: 'Tools I reach for when building modern web products.',
    nowTitle: 'Now',
    nowSubtitle: 'What I am working on at the moment.',
    latestWorksCount: 6,
  },
  boot: {
    loadingLabel: 'Assembling interface modules',
    completeLabel: 'Complete',
  },
  media: {
    profileImage: 'images/profile.png',
    profileAlt: 'Portrait of me',
    profileLabel: 'Profile',
    profileNote: 'Self-taught - Hobby',
    memojiImage: 'images/memoji.png',
    memojiAlt: 'Apple Memoji',
    profileScale: 1.06,
    profileOffsetY: 14,
  },
  heroStats: [
    { value: '24', label: 'Years old' },
    { value: '6+', label: 'Years building' },
    { value: 'FiveM', label: 'Specialist' },
  ],
  whatIDo: [
    {
      title: 'Frontend',
      description:
        'React, modern components, and smooth interactions with accessibility in mind.',
      icon: 'Layout',
    },
    {
      title: 'Backend',
      description:
        'APIs, auth, and data flows that are robust, fast, and easy to maintain - including game server backends.',
      icon: 'Server',
    },
    {
      title: 'UI/UX',
      description:
        'Clean, premium design with strong contrast, typography, and thoughtful flows.',
      icon: 'Palette',
    },
    {
      title: 'Technical Operations',
      description:
        'Facilities management, compliance, and reliable technical systems in day-to-day operations.',
      icon: 'Shield',
    },
  ],
  stack: [
    'React',
    'TypeScript',
    'Node.js',
    'Vite',
    'Tailwind CSS',
    'Framer Motion',
    'PostgreSQL',
    'Docker',
    'GitHub Actions',
  ],
  skills: ['Frontend', 'Backend', 'UI/UX', 'System Design', 'Quality'],
  now:
    'Running day-to-day technical operations as Maintenance Manager. On the side: finishing this portfolio and tinkering with game server tooling.',
  projects: {
    title: 'Projects',
    subtitle:
      'Live overview of my repos. Filter by focus and sort to find the most relevant work.',
    filters: [
      { value: 'All', label: 'All' },
      { value: 'Frontend', label: 'Frontend' },
      { value: 'Backend', label: 'Backend' },
      { value: 'Fullstack', label: 'Fullstack' },
      { value: 'Open Source', label: 'Open Source' },
    ] as ProjectFilterOption[],
    categoryLabels: {
      All: 'All',
      Frontend: 'Frontend',
      Backend: 'Backend',
      Fullstack: 'Fullstack',
      'Open Source': 'Open Source',
    } as Record<ProjectCategory, string>,
    sortOptions: [
      { label: 'Most starred', value: 'stars' },
      { label: 'Recently updated', value: 'updated' },
    ],
    emptyStateTitle: 'No projects match this filter.',
    emptyStateSubtitle: 'Adjust filters or sorting to find more projects.',
    fallbackNotice:
      'GitHub API is unavailable. Showing sample projects from local config.',
  },
  openSource: {
    title: 'Open Source',
    subtitle:
      'Projects where I focus on sharing code, building community, and documenting clearly.',
    highlightsTitle: 'Case Studies',
    projectsTitle: 'Open Source Repos',
    problemLabel: 'Problem',
    solutionLabel: 'Solution',
  },
  about: {
    title: 'About',
    subtitle:
      'Self-taught fullstack developer from Tønsberg, Norway — 24 years old, 6+ years of building things, and a full-time role in technical operations.',
    timelineTitle: 'Milestones',
    toolboxTitle: 'Toolbox',
    workStyleTitle: 'How I work',
  },
  milestones: [
    {
      time: '2019 – 2021',
      title: 'Self-taught foundations',
      description:
        'Picked up HTML, CSS, JavaScript, and modern frontend tooling from scratch.',
    },
    {
      time: '2021 – 2024',
      title: 'Fullstack projects',
      description:
        'Built apps with React, REST APIs, and databases — mostly for gaming communities.',
    },
    {
      time: '2024 – Now',
      title: 'Premium UI and quality',
      description:
        'Focused on design systems, component quality, and shipping cleaner, faster products.',
    },
  ] satisfies TimelineItem[],
  toolbox: [
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'GraphQL',
    'Docker',
    'Vercel',
    'Cloudflare',
    'Figma',
  ],
  workStyle: [
    'Start with clear goals and scope so everyone knows what to deliver.',
    'Prototype quickly and iterate on design and flows early.',
    'Keep code quality high with structure, linting, and light test coverage.',
    'Sweat the small details: performance, spacing, and edge cases matter.',
  ],
  contact: {
    title: 'Contact',
    subtitle:
      'Have a project idea or just want to connect? Fill out the form or reach out directly.',
    cardTitle: 'Contact card',
    cardSubtitle: 'Pick a channel or copy the info directly.',
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    form: {
      subject: 'New project',
      messagePlaceholder: 'Tell me a bit about your project...',
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone (NO)',
      phonePlaceholder: '+47 93 01 02 75',
      messageLabel: 'Message',
      sendLabel: 'Send message',
      sendingLabel: 'Sending...',
      successMessage: "Sent! I'll reply to the email you provided.",
      errorMessage: 'Something went wrong. Please try again or email me directly.',
      note: 'This form sends directly to my inbox.',
    },
    links: [
      {
        type: 'github',
        label: 'GitHub',
        href: 'https://github.com/KevinRyans',
        value: 'github.com/KevinRyans',
      },
      {
        type: 'discord',
        label: 'Discord',
        href: 'https://discord.com/users/337288161094795294',
        value: 'onyxnor',
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/michaelfiring/',
        value: 'linkedin.com/in/michaelfiring',
      },
      {
        type: 'email',
        label: 'Email',
        href: 'mailto:michael@firix.no',
        value: 'michael@firix.no',
      },
    ] satisfies ContactLink[],
  },
  footer: {
    title: 'FIRIX.NO',
    subtitle: 'Dark, premium, and modern web development.',
    note: 'Built with React, Tailwind, and Framer Motion.',
  },
  labels: {
    viewAll: 'View all projects',
    viewGitHub: 'View on GitHub',
    viewDemo: 'Live demo',
    backToProjects: 'Back to projects',
    loadMore: 'Load more',
    searchPlaceholder: 'Search projects...',
    filterLabel: 'Filter',
    sortLabel: 'Sort',
    commandHint: 'Press Ctrl+K for command palette',
    githubLabel: 'GitHub',
    toggleNavLabel: 'Toggle navigation',
    featuredLabel: 'Featured',
    navigationGroup: 'Navigation',
    projectsGroup: 'Projects',
    contactGroup: 'Contact',
    noCommandResults: 'No results.',
    projectNotFoundTitle: 'Project not found',
    projectNotFoundSubtitle:
      'This project is not in the list. Try another project or return to the list.',
    detailsLabel: 'Details',
    tagsLabel: 'Tags',
    languageLabel: 'Language',
    starsLabel: 'Stars',
    forksLabel: 'Forks',
    updatedLabel: 'Updated',
    notAvailable: 'N/A',
    topicsLabel: 'Topics',
    noDescription: 'No description provided.',
    notFoundTitle: 'Page not found',
    notFoundSubtitle: 'The page does not exist. Use the menu to navigate.',
    backHomeLabel: 'Back to home',
    statusLabel: 'Status',
  },
  pinnedProjects: [
    {
      repo: 'firix-portfolio',
      displayName: 'Firix Portfolio',
      description:
        'Personal developer portfolio showcasing premium dark UI, smooth motion, and a GitHub-driven projects list.',
      tags: ['Frontend', 'React', 'Vite', 'Tailwind'],
      category: 'Frontend',
      openSource: false,
      featured: true,
      status: 'In progress',
    },
    {
      repo: 'huben',
      displayName: 'Huben',
      description:
        'Lightweight fullstack app with React + Tailwind frontend and Express backend.',
      tags: ['Fullstack', 'React', 'Express'],
      category: 'Fullstack',
      openSource: true,
      featured: true,
      status: 'In progress',
    },
    {
      repo: 'vaktliste',
      displayName: 'Vaktliste',
      description:
        'Web app that reads schedules from Google Sheets and shows a filterable table.',
      tags: ['Frontend', 'Google Sheets', 'SheetJS'],
      category: 'Frontend',
      openSource: true,
      featured: true,
      status: 'Completed',
    },
  ] satisfies ProjectOverride[],
  projectOverrides: [
    {
      repo: 'Mafiaspill',
      displayName: 'Mafiaspill',
      description:
        'Text-based crime RPG inspired by classic MMO progression, with economy systems, factions, and turn-based combat.',
      longDescription:
        'A modern text-based MMO-inspired RPG with a fictional crypto-noir theme, built as a monorepo with a React web app, Fastify API, PostgreSQL, and real-time features via Socket.IO.',
      tags: ['Fullstack', 'TypeScript', 'Fastify', 'PostgreSQL', 'Socket.IO'],
      category: 'Fullstack',
      status: 'In progress',
    },
    {
      repo: 'KevinRyans',
      displayName: 'KevinRyans',
      description:
        'Personal profile hub and experiments space for testing ideas, layouts, and UI concepts.',
      tags: ['Frontend', 'UI'],
      category: 'Frontend',
      status: 'In progress',
    },
  ] satisfies ProjectOverride[],
  sampleProjects: [
    {
      id: 4,
      name: 'firix-portfolio',
      full_name: 'KevinRyans/firix-portfolio',
      html_url: 'https://github.com/KevinRyans/firix-portfolio',
      description:
        'Personal developer portfolio showcasing premium dark UI, smooth motion, and a GitHub-driven projects list.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-02-03T12:00:00Z',
      topics: ['frontend', 'portfolio', 'react', 'tailwind', 'vite'],
      homepage: '',
      license: null,
    },
    {
      id: 1,
      name: 'huben',
      full_name: 'KevinRyans/huben',
      html_url: 'https://github.com/KevinRyans/huben',
      description:
        'Lightweight fullstack app with React + Tailwind frontend and Express backend.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-02-01T12:00:00Z',
      topics: ['fullstack', 'react', 'express'],
      homepage: '',
      license: null,
    },
    {
      id: 2,
      name: 'vaktliste',
      full_name: 'KevinRyans/vaktliste',
      html_url: 'https://github.com/KevinRyans/vaktliste',
      description:
        'Web app that reads schedules from Google Sheets and shows a filterable table.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-01-25T12:00:00Z',
      topics: ['frontend', 'google-sheets', 'sheetjs'],
      homepage: '',
      license: null,
    },
    {
      id: 3,
      name: 'Mafiaspill',
      full_name: 'KevinRyans/Mafiaspill',
      html_url: 'https://github.com/KevinRyans/Mafiaspill',
      description:
        'Text-based crime RPG inspired by classic MMO progression, with economy systems, factions, and turn-based combat.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-01-30T12:00:00Z',
      topics: ['fullstack', 'rpg', 'socket-io', 'postgres'],
      homepage: '',
      license: null,
    },
  ],
  openSourceHighlights: [
    {
      title: 'Vaktliste',
      problem: 'Needed a simple, filterable overview of schedules from Google Sheets.',
      solution:
        'Built a web app that fetches data from Sheets and filters it in a table.',
      tech: ['JavaScript', 'SheetJS', 'Google Sheets'],
      repo: 'vaktliste',
    },
    {
      title: 'Huben',
      problem: 'Wanted to consolidate simple functionality into a small fullstack app.',
      solution:
        'Built a lightweight app with React + Tailwind in frontend and Express backend.',
      tech: ['React', 'Tailwind CSS', 'Express'],
      repo: 'huben',
    },
  ] satisfies OpenSourceHighlight[],
  resume: {
    title: 'Resume',
    subtitle: 'A clean, print-ready overview for interviews or quick sharing.',
    locationLabel: 'Location',
    location: 'Tønsberg, Norway',
    summaryTitle: 'Summary',
    summary:
      'Fullstack developer from Tønsberg with 6+ years of self-taught experience. Currently working as Maintenance Manager at Quality Hotel Tønsberg, handling technical systems, vendor relationships, and compliance. Most of my development background comes from building tools for gaming communities — a lot of it local and off GitHub, but the depth is genuine. Strong interest in networking, server development, and cybersecurity. I focus on quality in everything I build.',
    highlightsTitle: 'Highlights',
    highlights: [
      'Maintenance Manager — facilities operations and compliance at Quality Hotel Tønsberg',
      '6+ years of self-taught development experience',
      'Hands-on game server development (FiveM and other stacks)',
      'Higher vocational studies in cybersecurity',
      'Built tools for gaming communities and internal workflows',
    ],
    experienceTitle: 'Experience',
    experience: [
      {
        time: 'Jun 2025 – Present',
        title: 'Maintenance Manager · Quality Hotel Tønsberg',
        description:
          'Responsible for strategic and operational facilities management, technical systems, and vendor coordination.',
        details: [
          'Oversee FM operations and ensure compliant, reliable building systems',
          'Manage service agreements and external vendors for quality and cost control',
          'Ensure stable operation of HVAC, plumbing, fire safety, and access control',
          'Plan coordinated maintenance, repairs, and safety routines',
        ],
      },
      {
        time: 'Jul 2024 – Jun 2025',
        title: 'Maintenance Assistant · Quality Hotel Tønsberg',
        description: 'Handled day-to-day maintenance tasks and property upkeep.',
        details: [
          'Performed routine maintenance and minor repairs',
          'Maintained outdoor areas, including lawn care',
          'Handled snow clearing and entrance safety',
        ],
      },
      {
        time: 'Sep 2021 – Jul 2024',
        title: 'Conference & Events Coordinator · Quality Hotel Tønsberg',
        description: 'Planned and coordinated courses and conferences for up to 700 guests.',
        details: [
          'Acted as primary contact for organizers and event leads',
          'Coordinated with event agencies and internal teams',
          'Ensured technical setup, catering, and logistics ran smoothly',
        ],
      },
    ] satisfies ResumeEntry[],
    educationTitle: 'Education',
    education: [
      {
        time: 'Aug 2023 – Jun 2025',
        title: 'Higher Vocational Education, Cybersecurity',
        description: 'Gokstad Akademiet, Sandefjord.',
      },
      {
        time: 'Aug 2018 – Sep 2021',
        title: 'Trade Certificate, Building Operations',
        description: 'Re Videregående Skole, Tønsberg.',
      },
      {
        time: 'Aug 2017 – Jun 2018',
        title: 'Building & Construction Technology',
        description: 'Re Videregående Skole, Tønsberg.',
      },
    ] satisfies ResumeEntry[],
    projectsTitle: 'Selected Projects',
    projects: [
      {
        name: 'Firix Portfolio',
        description:
          'Premium dark developer portfolio with smooth motion, printable resume, and GitHub-driven projects list.',
      },
      {
        name: 'Mafiaspill',
        description:
          'Text-based crime RPG with progression, economy systems, and multiplayer-focused features.',
      },
      {
        name: 'Huben',
        description:
          'Lightweight fullstack app with React + Tailwind frontend and Express backend.',
      },
    ] satisfies ResumeProject[],
    skillsTitle: 'Core Skills',
    skills: [
      'Cybersecurity fundamentals',
      'Networking & server development',
      'React',
      'TypeScript',
      'Node.js',
      'Microsoft Azure',
      'Microsoft 365',
      'Game server tooling (FiveM)',
    ],
    interestsTitle: 'Interests',
    interests: [
      'Networking & server development',
      'Cybersecurity',
      'Programming & development',
      'Gaming communities',
    ],
    contactTitle: 'Contact',
    printLabel: 'Print resume',
    printHint:
      'Use your browser print dialog to save as PDF or print a clean copy.',
  },
}

export type Profile = typeof en

export const profiles: Record<Language, Profile> = {
  en,
}
