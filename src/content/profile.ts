
export type Language = 'en' | 'no'

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
  type: 'github' | 'discord' | 'phone' | 'email' | 'linkedin'
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
  tagline: 'Extremely passionate about development and I love seeing real results.',
  intro:
    'I am 24 years old, self-taught, and have been building projects for about 6 years as a hobby. By day I work in technical operations as a Maintenance Manager.',
  bio:
    'I am based in Norway and work as Maintenance Manager at a hotel property, responsible for technical operations, compliance, and vendor coordination. I love clean, premium UI with strong structure and user experience, and I build fullstack projects as a hobby. Much of my work was built for gaming communities and kept locally rather than on GitHub, but the knowledge and experience remain. I have solid experience in game server development, spending a lot of time with FiveM servers and other game server stacks.',
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
      'Self-taught fullstack developer (hobby) building modern web experiences, alongside a full-time role in technical operations.',
    whatIDoTitle: 'What I do',
    whatIDoSubtitle:
      'I combine modern web development with real-world technical operations and structured delivery.',
    latestWorksTitle: 'Latest Works',
    latestWorksSubtitle: 'A curated selection of projects pulled from GitHub.',
    stackTitle: 'Stack',
    stackSubtitle: 'Tools I use to build modern web products.',
    nowTitle: 'Now',
    nowSubtitle: 'What I am focusing on right now.',
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
    'Leading technical operations as a Maintenance Manager while refining my portfolio, design system, and game server tooling on the side.',
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
      'Self-taught fullstack developer from Norway, 24 years old, with about 6 years of experience and a full-time role in technical operations.',
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
        type: 'phone',
        label: 'Phone',
        href: 'tel:+4793010275',
        value: '+47 93 01 02 75',
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
      'Service-minded, solution-focused fullstack developer from Tønsberg, Norway with 6+ years of self-taught experience and a strong interest in cybersecurity, networking, and server development. I currently work as Maintenance Manager, coordinating technical operations, vendors, and compliance. Many projects were built for personal gaming communities and kept locally rather than on GitHub, but the hands-on learning remains. I combine technical curiosity with structured execution and a strong focus on quality.',
    highlightsTitle: 'Highlights',
    highlights: [
      'Maintenance Manager with responsibility for facilities operations and compliance',
      '6+ years of self-taught development experience',
      'Hands-on game server development (FiveM and other stacks)',
      'Higher vocational studies in cybersecurity',
      'Built tools for gaming communities and internal workflows',
    ],
    experienceTitle: 'Experience',
    experience: [
      {
        time: 'Jun 2025 - Present',
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
        time: 'Jul 2024 - Jun 2025',
        title: 'Maintenance Assistant · Quality Hotel Tønsberg',
        description: 'Handled day-to-day maintenance tasks and property upkeep.',
        details: [
          'Performed routine maintenance and minor repairs',
          'Maintained outdoor areas, including lawn care',
          'Handled snow clearing and entrance safety',
        ],
      },
      {
        time: 'Sep 2021 - Jul 2024',
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
        time: 'Aug 2023 - Jun 2025',
        title: 'Higher Vocational Education, Cybersecurity',
        description: 'Gokstad Akademiet, Sandefjord.',
      },
      {
        time: 'Aug 2018 - Sep 2021',
        title: 'Trade Certificate, Building Operations',
        description: 'Re Videregående Skole, Tønsberg.',
      },
      {
        time: 'Aug 2017 - Jun 2018',
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
      'Game server tooling',
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
      'Tip: use your browser print dialog to save as PDF or print a clean copy.',
  },
}

export type Profile = typeof en

function mergeDeep(base: any, override: any): any {
  if (override === undefined) return base
  if (Array.isArray(base) && Array.isArray(override)) return override
  if (
    typeof base === 'object' &&
    base !== null &&
    typeof override === 'object' &&
    override !== null &&
    !Array.isArray(override)
  ) {
    const result: Record<string, unknown> = { ...base }
    for (const key of Object.keys(override)) {
      result[key] = mergeDeep((base as Record<string, unknown>)[key], override[key])
    }
    return result
  }
  return override
}

const noOverrides: Partial<Profile> = {
  meta: {
    title: 'FIRIX.NO',
    description:
      'Premium utviklerportefølje med moderne mørkt UI, myke animasjoner og GitHub-drevne prosjekter.',
  },
  role: 'Fullstack-utvikler',
  tagline: 'Ekstremt lidenskapelig for utvikling, og jeg elsker å se resultater.',
  intro:
    'Jeg er 24 år, selvlært, og har bygget prosjekter som hobby i rundt 6 år. På dagtid jobber jeg i teknisk drift som Maintenance Manager.',
  bio:
    'Jeg er basert i Norge og jobber som Maintenance Manager på et hotell, ansvarlig for teknisk drift, etterlevelse og leverandøroppfølging. Jeg elsker rent, premium UI med sterk struktur og brukeropplevelse, og bygger fullstack-prosjekter som hobby. Mye av arbeidet mitt ble laget for gaming-communities og lagret lokalt i stedet for på GitHub, men kunnskapen og erfaringen er der fortsatt. Jeg har solid erfaring med game server-utvikling og har brukt mye tid på FiveM-servere og andre stacks.',
  ctas: {
    primaryLabel: 'Se prosjekter',
    secondaryLabel: 'Kontakt meg',
  },
  navigation: [
    { label: 'Hjem', to: '/' },
    { label: 'Prosjekter', to: '/projects' },
    { label: 'Open Source', to: '/open-source' },
    { label: 'Om', to: '/about' },
    { label: 'CV', to: '/resume' },
    { label: 'Kontakt', to: '/contact' },
  ],
  home: {
    heroEyebrow: 'Fullstack-utvikler',
    heroTitle: 'Hei, jeg er Michael',
    heroSubtitle:
      'Selvlært fullstack-utvikler (hobby) som bygger moderne webopplevelser, ved siden av en fulltidsrolle i teknisk drift.',
    whatIDoTitle: 'Hva jeg gjør',
    whatIDoSubtitle:
      'Jeg kombinerer moderne webutvikling med praktisk teknisk drift og strukturert leveranse.',
    latestWorksTitle: 'Siste arbeid',
    latestWorksSubtitle: 'Et utvalg prosjekter hentet fra GitHub.',
    stackTitle: 'Stack',
    stackSubtitle: 'Verktøyene jeg bruker for å bygge moderne webprodukter.',
    nowTitle: 'Nå',
    nowSubtitle: 'Hva jeg fokuserer på akkurat nå.',
    latestWorksCount: 6,
  },
  boot: {
    loadingLabel: 'Setter sammen grensesnittmoduler',
    completeLabel: 'Ferdig',
  },
  media: {
    profileAlt: 'Portrett av meg',
    profileLabel: 'Profil',
    profileNote: 'Selvlært - Hobby',
    memojiAlt: 'Apple Memoji',
  },
  heroStats: [
    { value: '24', label: 'År gammel' },
    { value: '6+', label: 'År læring' },
    { value: 'Resultater', label: 'Drevet' },
  ],
  whatIDo: [
    {
      title: 'Frontend',
      description:
        'React, moderne komponenter og smidige interaksjoner med fokus på tilgjengelighet.',
      icon: 'Layout',
    },
    {
      title: 'Backend',
      description:
        'API-er, auth og dataflyt som er robuste, raske og enkle å vedlikeholde - inkludert game server-backends.',
      icon: 'Server',
    },
    {
      title: 'UI/UX',
      description:
        'Rent, premium design med god kontrast, typografi og gjennomtenkte flater.',
      icon: 'Palette',
    },
    {
      title: 'Teknisk drift',
      description:
        'Facility management, etterlevelse og stabile tekniske systemer i daglig drift.',
      icon: 'Shield',
    },
  ],
  skills: ['Frontend', 'Backend', 'UI/UX', 'Systemdesign', 'Kvalitet'],
  now:
    'Leder teknisk drift som Maintenance Manager samtidig som jeg videreutvikler porteføljen, designsystemet og game server-verktøy på siden.',
  projects: {
    title: 'Prosjekter',
    subtitle:
      'Live oversikt over repoene mine. Filtrer og sorter for å finne relevant arbeid.',
    filters: [
      { value: 'All', label: 'Alle' },
      { value: 'Frontend', label: 'Frontend' },
      { value: 'Backend', label: 'Backend' },
      { value: 'Fullstack', label: 'Fullstack' },
      { value: 'Open Source', label: 'Open Source' },
    ] as ProjectFilterOption[],
    categoryLabels: {
      All: 'Alle',
      Frontend: 'Frontend',
      Backend: 'Backend',
      Fullstack: 'Fullstack',
      'Open Source': 'Open Source',
    } as Record<ProjectCategory, string>,
    sortOptions: [
      { label: 'Mest stjerner', value: 'stars' },
      { label: 'Nylig oppdatert', value: 'updated' },
    ],
    emptyStateTitle: 'Ingen prosjekter matcher filteret.',
    emptyStateSubtitle: 'Juster filter eller sortering for å finne flere prosjekter.',
    fallbackNotice:
      'GitHub API er utilgjengelig. Viser eksempelprosjekter fra lokal config.',
  },
  openSource: {
    title: 'Open Source',
    subtitle:
      'Prosjekter der jeg fokuserer på å dele kode, bygge community og dokumentere tydelig.',
    highlightsTitle: 'Case-studier',
    projectsTitle: 'Open Source-repoer',
    problemLabel: 'Problem',
    solutionLabel: 'Løsning',
  },
  about: {
    title: 'Om',
    subtitle:
      'Selvlært fullstack-utvikler fra Norge, 24 år gammel, med rundt 6 års erfaring og en fulltidsrolle i teknisk drift.',
    timelineTitle: 'Milepæler',
    toolboxTitle: 'Verktøykasse',
    workStyleTitle: 'Slik jobber jeg',
  },
  milestones: [
    {
      time: '2019 - 2021',
      title: 'Selvlærte grunnlag',
      description:
        'Lærte det grunnleggende i HTML, CSS, JavaScript og moderne frontend-verktøy.',
    },
    {
      time: '2021 - 2024',
      title: 'Fullstack-prosjekter',
      description:
        'Bygde apper med React, API-er og databaser med fokus på UI og funksjonalitet.',
    },
    {
      time: '2024 - Nå',
      title: 'Premium UI og kvalitet',
      description:
        'Videreutvikler design, komponenter og struktur på hobbyprosjekter.',
    },
  ] satisfies TimelineItem[],
  workStyle: [
    'Starter med klare mål og scope slik at alle vet hva som skal leveres.',
    'Prototyper raskt og itererer tidlig på design og flyt.',
    'Holder kodekvalitet høy med struktur, linting og lett testdekning.',
    'Itererer ofte for å forbedre kvalitet, ytelse og detaljer.',
  ],
  contact: {
    title: 'Kontakt',
    subtitle:
      'Vil du samarbeide eller dele et prosjekt? Send en melding, så svarer jeg snart.',
    cardTitle: 'Kontaktkort',
    cardSubtitle: 'Velg en kanal eller kopier informasjonen direkte.',
    copyLabel: 'Kopier',
    copiedLabel: 'Kopiert',
    form: {
      subject: 'Ny forespørsel',
      messagePlaceholder: 'Fortell litt om prosjektet ditt...',
      nameLabel: 'Navn',
      emailLabel: 'E-post',
      phoneLabel: 'Telefon (NO)',
      phonePlaceholder: '+47 93 01 02 75',
      messageLabel: 'Melding',
      sendLabel: 'Send forespørsel',
      sendingLabel: 'Sender...',
      successMessage: 'Sendt! Jeg svarer på e-posten du oppga.',
      errorMessage: 'Noe gikk galt. Prøv igjen eller send e-post direkte.',
      note: 'Dette skjemaet sender en melding direkte til innboksen min.',
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
        type: 'phone',
        label: 'Telefon',
        href: 'tel:+4793010275',
        value: '+47 93 01 02 75',
      },
      {
        type: 'email',
        label: 'E-post',
        href: 'mailto:michael@firix.no',
        value: 'michael@firix.no',
      },
    ] satisfies ContactLink[],
  },
  footer: {
    title: 'FIRIX.NO',
    subtitle: 'Mørk, premium og moderne webutvikling.',
    note: 'Bygget med React, Tailwind og Framer Motion.',
  },
  labels: {
    viewAll: 'Se alle prosjekter',
    viewGitHub: 'Se på GitHub',
    viewDemo: 'Live demo',
    backToProjects: 'Tilbake til prosjekter',
    loadMore: 'Last mer',
    searchPlaceholder: 'Søk prosjekter...',
    filterLabel: 'Filter',
    sortLabel: 'Sorter',
    commandHint: 'Trykk Ctrl+K for kommandopalett',
    githubLabel: 'GitHub',
    toggleNavLabel: 'Veksle navigasjon',
    featuredLabel: 'Fremhevet',
    navigationGroup: 'Navigasjon',
    projectsGroup: 'Prosjekter',
    contactGroup: 'Kontakt',
    noCommandResults: 'Ingen treff.',
    projectNotFoundTitle: 'Prosjekt ikke funnet',
    projectNotFoundSubtitle:
      'Dette prosjektet finnes ikke i listen. Prøv et annet eller gå tilbake til listen.',
    detailsLabel: 'Detaljer',
    tagsLabel: 'Tagger',
    languageLabel: 'Språk',
    starsLabel: 'Stjerner',
    forksLabel: 'Forks',
    updatedLabel: 'Oppdatert',
    notAvailable: 'Ikke tilgjengelig',
    topicsLabel: 'Emner',
    noDescription: 'Ingen beskrivelse.',
    notFoundTitle: 'Siden finnes ikke',
    notFoundSubtitle: 'Siden eksisterer ikke. Bruk menyen for å navigere.',
    backHomeLabel: 'Tilbake til forsiden',
    statusLabel: 'Status',
  },
  pinnedProjects: [
    {
      repo: 'firix-portfolio',
      displayName: 'Firix Portfolio',
      description:
        'Personlig utviklerportefølje med premium dark UI, myke animasjoner og GitHub-drevet prosjektliste.',
      tags: ['Frontend', 'React', 'Vite', 'Tailwind'],
      category: 'Frontend',
      openSource: false,
      featured: true,
      status: 'Pågår',
    },
    {
      repo: 'huben',
      displayName: 'Huben',
      description:
        'Lettvekt fullstack-app med React + Tailwind frontend og Express backend.',
      tags: ['Fullstack', 'React', 'Express'],
      category: 'Fullstack',
      openSource: true,
      featured: true,
      status: 'Pågår',
    },
    {
      repo: 'vaktliste',
      displayName: 'Vaktliste',
      description:
        'Webapp som leser vakter fra Google Sheets og viser en filtrerbar tabell.',
      tags: ['Frontend', 'Google Sheets', 'SheetJS'],
      category: 'Frontend',
      openSource: true,
      featured: true,
      status: 'Fullført',
    },
  ] satisfies ProjectOverride[],
  projectOverrides: [
    {
      repo: 'Mafiaspill',
      displayName: 'Mafiaspill',
      description:
        'Tekstbasert crime RPG inspirert av klassisk MMO-progresjon, med økonomisystemer, fraksjoner og turbasert kamp.',
      longDescription:
        'Et moderne tekstbasert MMO-inspirert RPG med fiktiv crypto-noir setting, bygget som monorepo med React-webapp, Fastify API, PostgreSQL og sanntidsfunksjoner via Socket.IO.',
      tags: ['Fullstack', 'TypeScript', 'Fastify', 'PostgreSQL', 'Socket.IO'],
      category: 'Fullstack',
      status: 'Pågår',
    },
    {
      repo: 'KevinRyans',
      displayName: 'KevinRyans',
      description:
        'Personlig profilhub og eksperimentarena for å teste ideer, layout og UI-konsepter.',
      tags: ['Frontend', 'UI'],
      category: 'Frontend',
      status: 'Pågår',
    },
  ] satisfies ProjectOverride[],
  sampleProjects: [
    {
      id: 4,
      name: 'firix-portfolio',
      full_name: 'KevinRyans/firix-portfolio',
      html_url: 'https://github.com/KevinRyans/firix-portfolio',
      description:
        'Personlig utviklerportefølje med premium dark UI, myke animasjoner og GitHub-drevet prosjektliste.',
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
        'Lettvekt fullstack-app med React + Tailwind frontend og Express backend.',
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
        'Webapp som leser vakter fra Google Sheets og viser en filtrerbar tabell.',
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
        'Tekstbasert crime RPG inspirert av klassisk MMO-progresjon, med økonomisystemer, fraksjoner og turbasert kamp.',
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
      problem: 'Trengte en enkel og filtrerbar oversikt over vakter fra Google Sheets.',
      solution:
        'Bygde en webapp som henter data fra Sheets og filtrerer i en tabell.',
      tech: ['JavaScript', 'SheetJS', 'Google Sheets'],
      repo: 'vaktliste',
    },
    {
      title: 'Huben',
      problem: 'Ønsket å samle enkel funksjonalitet i en liten fullstack-app.',
      solution:
        'Bygde en lett app med React + Tailwind i frontend og Express backend.',
      tech: ['React', 'Tailwind CSS', 'Express'],
      repo: 'huben',
    },
  ] satisfies OpenSourceHighlight[],
  resume: {
    title: 'CV',
    subtitle: 'En ryddig, utskriftsvennlig oversikt for intervjuer eller deling.',
    locationLabel: 'Sted',
    location: 'Tønsberg, Norge',
    summaryTitle: 'Oppsummering',
    summary:
      'Serviceinnstilt og løsningsorientert fullstack-utvikler fra Tønsberg, Norge med 6+ års selvlært erfaring og sterk interesse for cybersikkerhet, nettverk og serverutvikling. Jeg jobber som Maintenance Manager og koordinerer teknisk drift, leverandører og etterlevelse. Mange prosjekter ble bygget for gaming-communities og lagret lokalt, men den praktiske læringen er fortsatt der. Jeg kombinerer teknisk nysgjerrighet med strukturert gjennomføring og fokus på kvalitet.',
    highlightsTitle: 'Høydepunkter',
    highlights: [
      'Maintenance Manager med ansvar for drift og etterlevelse',
      '6+ års selvlært utviklingserfaring',
      'Hands-on game server-utvikling (FiveM og andre stacks)',
      'Høyere fagskoleutdanning i cybersikkerhet',
      'Bygde verktøy for gaming-communities og interne arbeidsflyter',
    ],
    experienceTitle: 'Erfaring',
    experience: [
      {
        time: 'Jun 2025 - Nå',
        title: 'Maintenance Manager · Quality Hotel Tønsberg',
        description:
          'Ansvarlig for strategisk og operativ drift, tekniske systemer og leverandøroppfølging.',
        details: [
          'Overordnet ansvar for FM-drift og etterlevelse',
          'Oppfølging av serviceavtaler og eksterne leverandører',
          'Sikrer stabil drift av ventilasjon, VVS, brannvern og adgangskontroll',
          'Planlegger vedlikehold, reparasjoner og sikkerhetsrutiner',
        ],
      },
      {
        time: 'Jul 2024 - Jun 2025',
        title: 'Maintenance Assistant · Quality Hotel Tønsberg',
        description: 'Daglig vedlikehold og praktiske oppgaver på eiendommen.',
        details: [
          'Utførte løpende vedlikehold og mindre reparasjoner',
          'Vedlikehold av uteområder og plen',
          'Snømåking og trygging av inngangspartier',
        ],
      },
      {
        time: 'Sep 2021 - Jul 2024',
        title: 'Kurs & konferanse · Quality Hotel Tønsberg',
        description: 'Planla og koordinerte kurs og konferanser for opptil 700 gjester.',
        details: [
          'Kontaktpunkt for arrangører og kursledere',
          'Samarbeid med eventbyråer og interne team',
          'Sikret at teknikk, servering og logistikk fungerte sømløst',
        ],
      },
    ] satisfies ResumeEntry[],
    educationTitle: 'Utdanning',
    education: [
      {
        time: 'Aug 2023 - Jun 2025',
        title: 'Høyere fagskoleutdanning, Cybersikkerhet',
        description: 'Gokstad Akademiet, Sandefjord.',
      },
      {
        time: 'Aug 2018 - Sep 2021',
        title: 'Byggdrifter fagbrev',
        description: 'Re videregående skole, Tønsberg.',
      },
      {
        time: 'Aug 2017 - Jun 2018',
        title: 'Bygg og anleggsteknikk',
        description: 'Re videregående skole, Tønsberg.',
      },
    ] satisfies ResumeEntry[],
    projectsTitle: 'Utvalgte prosjekter',
    projects: [
      {
        name: 'Firix Portfolio',
        description:
          'Premium dark utviklerportefølje med myke animasjoner, utskriftsvennlig CV og GitHub-drevet prosjektliste.',
      },
      {
        name: 'Mafiaspill',
        description:
          'Tekstbasert crime RPG med progresjon, økonomisystemer og multiplayerfokus.',
      },
      {
        name: 'Huben',
        description:
          'Lettvekt fullstack-app med React + Tailwind frontend og Express backend.',
      },
    ] satisfies ResumeProject[],
    skillsTitle: 'Kjernekompetanse',
    skills: [
      'Cybersikkerhet (grunnleggende)',
      'Nettverk og serverutvikling',
      'React',
      'TypeScript',
      'Node.js',
      'Microsoft Azure',
      'Microsoft 365',
      'Game server-verktøy',
    ],
    interestsTitle: 'Interesser',
    interests: [
      'Nettverk og serverutvikling',
      'Cybersikkerhet',
      'Programmering og utvikling',
      'Gaming-communities',
    ],
    contactTitle: 'Kontakt',
    printLabel: 'Skriv ut CV',
    printHint:
      'Tips: bruk utskriftsdialogen for å lagre som PDF eller skrive ut en ryddig kopi.',
  },
}

const no = mergeDeep(en, noOverrides) as Profile

export const profiles: Record<Language, Profile> = {
  en,
  no,
}

