export type ProjectCategory = 'All' | 'Frontend' | 'Backend' | 'Fullstack' | 'Open Source'

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
  label: string
  href: string
  value: string
}

export const profile = {
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
  tagline: 'Extremely passionate about development and I love seeing real results.',
  intro:
    'I am 24 years old, self-taught, and have been building projects for about 6 years as a hobby.',
  bio:
    'I am based in Norway and I love clean, premium UI with strong structure and user experience. A lot of my work was built for myself in gaming-related contexts, and many of those projects lived locally instead of on GitHub. Some of that work is gone, but the knowledge and experience remain. I am extremely passionate about development and I love to see real results. I have also built solid experience in game server development, spending a lot of time with FiveM servers and other game server stacks.',
  links: {
    github: 'https://github.com/KevinRyans',
    discord: 'https://discord.com/users/337288161094795294',
    email: 'mailto:michael@firix.no',
    linkedin: 'https://www.linkedin.com/in/your-handle/',
  },
  githubUsername: 'KevinRyans',
  ctas: {
    primaryLabel: 'View projects',
    secondaryLabel: 'Contact me',
  },
  navigation: [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Open Source', to: '/open-source' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ] satisfies NavItem[],
  home: {
    heroEyebrow: 'Fullstack Developer',
    heroTitle: "Hi, I'm Michael",
    heroSubtitle:
      'Self-taught fullstack developer building modern web experiences with a premium dark aesthetic.',
    whatIDoTitle: 'What I do',
    whatIDoSubtitle:
      'I build fullstack products from idea to production with focus on quality and clarity.',
    latestWorksTitle: 'Latest Works',
    latestWorksSubtitle: 'A curated selection of projects pulled from GitHub.',
    stackTitle: 'Stack',
    stackSubtitle: 'Tools I use to build modern web products.',
    nowTitle: 'Now',
    nowSubtitle: 'What I am focusing on right now.',
    latestWorksCount: 6,
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
    { value: '6+', label: 'Years learning' },
    { value: 'Results', label: 'Driven' },
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
      title: 'Quality',
      description:
        'Structured code, consistent components, and attention to performance details.',
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
    'Building a premium dark portfolio as a hobby, refining design systems, and experimenting with game server tooling.',
  projects: {
    title: 'Projects',
    subtitle:
      'Live overview of my repos. Filter by focus and sort to find the most relevant work.',
    filters: ['All', 'Frontend', 'Backend', 'Fullstack', 'Open Source'] as ProjectCategory[],
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
      'Self-taught fullstack developer from Norway, 24 years old, with about 6 years of experience and a love for premium UI.',
    timelineTitle: 'Milestones',
    toolboxTitle: 'Toolbox',
    workStyleTitle: 'How I work',
  },
  milestones: [
    {
      time: '2019 - 2021',
      title: 'Self-taught foundations',
      description:
        'Learned the basics of HTML, CSS, JavaScript, and modern frontend tooling.',
    },
    {
      time: '2021 - 2024',
      title: 'Fullstack projects',
      description:
        'Built apps with React, APIs, and databases with a focus on UI and functionality.',
    },
    {
      time: '2024 - Now',
      title: 'Premium UI and quality',
      description:
        'Refining design, components, and structure across hobby projects.',
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
    'Iterate often to improve quality, performance, and details.',
  ],
  contact: {
    title: 'Contact',
    subtitle:
      'Want to collaborate or share a project? Send a message and I will reply soon.',
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
      sendLabel: 'Send request',
      sendingLabel: 'Sending...',
      successMessage: "Sent! I'll reply to the email you provided.",
      errorMessage: 'Something went wrong. Please try again or email me directly.',
      note: 'This form sends a message directly to my inbox.',
    },
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/KevinRyans',
        value: 'github.com/KevinRyans',
      },
      {
        label: 'Discord',
        href: 'https://discord.com/users/337288161094795294',
        value: 'onyxnor',
      },
      {
        label: 'Phone',
        href: 'tel:+4793010275',
        value: '+47 93 01 02 75',
      },
      {
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
      name: 'ONYXportifolio',
      full_name: 'KevinRyans/ONYXportifolio',
      html_url: 'https://github.com/KevinRyans/ONYXportifolio',
      description:
        'Premium dark developer portfolio built with Vite, React, Tailwind, and Framer Motion.',
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
}

export type Profile = typeof profile

