/**
 * ============================================================
 *  ★  PORTFOLIO CMS  ★
 *  This is the ONLY file you need to edit to update your
 *  portfolio. Change your name, add projects, update skills —
 *  the UI re-renders automatically from this data.
 * ============================================================
 */

const PORTFOLIO = {

  /* ─── PERSONAL META ─────────────────────────────────────── */
  meta: {
    name:        "John Lloyd Danton",
    title:       "IT Graduate • Web Development & Agile Project Delivery",
    tagline:     "Bridging software development fundamentals with Agile delivery to build reliable applications.",
    bio:         "Bachelor of Science in Information Technology graduate from City College of Tagaytay (Dean's Lister) with hands-on experience supporting website development, digital projects, and Agile delivery. Skilled in C++, Java, JavaScript, SQL, WordPress, and cross-functional team coordination.",
    location:    "Tagaytay, Calabarzon, Philippines",
    email:       "lloyd.danton02@gmail.com",
    phone:       "+63 919 775 2848",
    resumeUrl:   "assets/resume.pdf",
    avatar:      "",
    social: {
      github:    "https://github.com/VBJlad",
      linkedin:  "https://linkedin.com/in/johnlloyddanton",
      twitter:   "",
      discord:   "",
    },
  },

  /* ─── HERO STATS COUNTERS ───────────────────────────────── */
  stats: [
    { value: 5,    suffix: "",   label: "Accounts Managed" },
    { value: 3,    suffix: "+",  label: "Global & Local Internships" },
    { value: 100,  suffix: "%",  label: "On-Time Sprint Delivery" },
    { value: 2,    suffix: "",   label: "Key Certifications" },
  ],

  /* ─── AVAILABILITY / STATUS ─────────────────────────────── */
  availability: {
    open:     true,
    status:   "Available for IT & Software Opportunities",
    timezone: "Asia/Manila",
  },

  /* ─── SKILLS ────────────────────────────────────────────── */
  skillCategories: [
    {
      id: "programming", label: "Programming", icon: "⌨",
      skills: [
        { name: "JavaScript (ES6+)",       level: 85 },
        { name: "Java (OOP)",              level: 80 },
        { name: "C++",                     level: 78 },
        { name: "SQL / Database Queries",  level: 82 },
        { name: "OOP Fundamentals",        level: 88 },
        { name: "Debugging & Code Review", level: 82 },
      ],
    },
    {
      id: "webdev", label: "Web Development", icon: "⌗",
      skills: [
        { name: "HTML5 & Semantic Markup", level: 92 },
        { name: "CSS3 / Modern Layouts",   level: 88 },
        { name: "JavaScript Web Tech",     level: 84 },
        { name: "WordPress CMS",           level: 86 },
        { name: "Responsive UI Design",    level: 90 },
        { name: "Git / GitHub Versioning", level: 85 },
      ],
    },
    {
      id: "agile", label: "Agile & Delivery", icon: "↻",
      skills: [
        { name: "Agile / Scrum Delivery",   level: 92 },
        { name: "Sprint Planning & Review", level: 90 },
        { name: "Backlog Management",       level: 94 },
        { name: "Risk & Dependency Mgmt",   level: 85 },
        { name: "Stakeholder Communication",level: 88 },
        { name: "Technical Documentation",  level: 92 },
      ],
    },
    {
      id: "tools", label: "Tools & QA", icon: "⚙︎",
      skills: [
        { name: "ClickUp Project Tracking", level: 90 },
        { name: "Notion Knowledge Base",    level: 88 },
        { name: "Software Testing Basics",  level: 80 },
        { name: "Google Workspace",         level: 95 },
        { name: "Action Logs & QA Tracking",level: 90 },
        { name: "TOPCIT Certified Skills",  level: 85 },
      ],
    },
  ],

  /* ─── PROJECTS ──────────────────────────────────────────── */
  // Category options: "fullstack" | "distributed" | "ai" | "cloud"
  projects: [
    {
      id:          "cdab-redesign",
      title:       "CDAB Website Redesign",
      description: "Coordinated cross-border website redesign for NWS, Australia, establishing sprint communication and delivering planned features on schedule.",
      detail:      "Developed a comprehensive project communication plan establishing regular client status reviews and internal standups. Facilitated Sprint Planning and Sprint Review sessions by preparing sprint backlogs, tracking deliverables, and actively managing blockers to ensure seamless milestone deliveries.",
      category:    "fullstack",
      tags:        ["Website Redesign", "Agile / Scrum", "Sprint Planning", "Risk Tracking", "Client Stakeholders"],
      metrics:     { client: "Australia", sprints: "Completed On-Time", milestones: "100% Met" },
      github:      "",
      demo:        "",
      featured:    true,
      year:        2026,
    },
    {
      id:          "startuplab-backlog",
      title:       "StartupLab Multi-Account Backlog System",
      description: "Structured and managed digital marketing and web backlogs across 5 accounts in General Trias, Cavite.",
      detail:      "Created, prioritized, and updated sprint tasks prior to supervisor review and approval, ensuring backlog alignment with project objectives. Decomposed large initiatives into actionable sprint tickets, monitored velocity, and reported blockers to achieve timely deliverables.",
      category:    "cloud",
      tags:        ["Agile / Scrum", "Backlog Grooming", "Sprint Planning", "ClickUp", "Account Management"],
      metrics:     { accounts: "5 Accounts", delivery: "On-Schedule", team: "Coordinated" },
      github:      "",
      demo:        "",
      featured:    true,
      year:        2026,
    },
    {
      id:          "pelvic-global-dev",
      title:       "Pelvic Global Web Delivery & Scheduling",
      description: "Tracked website development schedules and task execution for a Florida-based organization with clear visibility.",
      detail:      "Prepared development schedules, maintained real-time task tracking, created detailed meeting documentation, and logged action items to guarantee accountability. Delivered weekly status reports to executive stakeholders, summarizing progress, risk mitigation, and upcoming sprints.",
      category:    "distributed",
      tags:        ["Project Scheduling", "Web Dev Tracking", "Stakeholder Reporting", "QA Logging"],
      metrics:     { client: "Florida, USA", reporting: "Weekly Updates", visibility: "Real-time" },
      github:      "",
      demo:        "",
      featured:    true,
      year:        2026,
    },
    {
      id:          "sql-db-app",
      title:       "Database & Application Management System",
      description: "Engineered relational database models and application logic utilizing SQL, Java, and OOP fundamentals.",
      detail:      "Built structured relational schemas with normalized tables, primary/foreign key constraints, and optimized SQL queries. Incorporated object-oriented programming principles to handle business logic, data validation, and automated report generation.",
      category:    "fullstack",
      tags:        ["Java", "SQL", "OOP", "Relational DB", "Testing"],
      metrics:     { database: "SQL Normalized", architecture: "OOP Principles", testing: "Validated" },
      github:      "https://github.com/VBJlad",
      demo:        "",
      featured:    false,
      year:        2025,
    },
    {
      id:          "wordpress-responsive-web",
      title:       "Responsive Web & Content Management Portal",
      description: "Modern responsive website developed with HTML5, CSS3, JavaScript, and custom WordPress architecture.",
      detail:      "Designed and deployed responsive web layouts optimized for mobile, tablet, and desktop viewing. Integrated dynamic content management, accessibility standards, cross-browser compatibility, and fast load times.",
      category:    "ai",
      tags:        ["HTML5", "CSS3", "JavaScript", "WordPress", "Responsive"],
      metrics:     { responsiveness: "Mobile-First", compatibility: "Cross-Browser", cms: "WordPress" },
      github:      "https://github.com/VBJlad",
      demo:        "",
      featured:    false,
      year:        2025,
    },
  ],

  /* ─── CAREER TIMELINE ───────────────────────────────────── */
  timeline: [
    {
      type:         "work",
      role:         "Project Coordinator Trainee",
      organization: "Pelvic Global",
      period:       "May 2026 – July 2026",
      location:     "Florida, USA (Remote)",
      achievements: [
        "Prepared project schedules and tracked website development tasks, providing clear visibility into project progress and upcoming deadlines.",
        "Created meeting documentation, maintained action logs, and followed up on assigned tasks, improving accountability.",
        "Produced weekly project status updates for stakeholders, highlighting completed work, risks, and next priorities to support informed decisions.",
      ],
    },
    {
      type:         "work",
      role:         "Project Coordinator Intern",
      organization: "CDAB Website Redesign",
      period:       "February 2026 – June 2026",
      location:     "NWS, Australia (Remote)",
      achievements: [
        "Developed a project communication plan establishing regular client updates and internal team meetings, improving stakeholder collaboration.",
        "Facilitated Sprint Planning and Sprint Review sessions by preparing sprint backlogs, documenting action items, and tracking deliverables.",
        "Maintained project timeline, monitored risks, dependencies, and blockers, enabling early issue escalation and timely delivery.",
      ],
    },
    {
      type:         "work",
      role:         "Project Coordinator Intern",
      organization: "StartupLab",
      period:       "January 2026 – May 2026",
      location:     "General Trias, Cavite",
      achievements: [
        "Managed digital marketing backlogs across 5 accounts by creating, prioritizing, and updating sprint tasks aligned with project priorities.",
        "Prepared sprint plans by breaking initiatives into actionable tasks and coordinating with team members for timely completion.",
        "Monitored sprint progress, updated task statuses, and resolved blockers promptly with the supervisor.",
      ],
    },
    {
      type:         "education",
      role:         "Bachelor of Science in Information Technology",
      organization: "City College of Tagaytay",
      period:       "Graduated July 2026",
      location:     "Tagaytay, Philippines",
      achievements: [
        "Dean's Lister A.Y. 2023.",
        "Strong foundation in software development fundamentals, OOP, database design (SQL), and web technologies.",
      ],
    },
    {
      type:         "education",
      role:         "Certifications & Competency Excellence",
      organization: "National & Global IT Credentials",
      period:       "Certified",
      location:     "Philippines",
      achievements: [
        "TOPCIT Level 2 Competency Certificate of Excellence — Assessment of practical software and IT capabilities.",
        "ICT User Certification Examination — Recognized proficiency in digital and information technology skills.",
      ],
    },
  ],

  /* ─── TERMINAL CLI ──────────────────────────────────────── */
  terminal: {
    prompt:     "johnlloyd@portfolio",
    welcomeMsg: "Welcome to John Lloyd Danton's terminal. Type 'help' to explore qualifications.",
    commands: {
      whoami:         "John Lloyd Danton — BS Information Technology graduate (City College of Tagaytay, Dean's Lister).\nSkilled in Web Development (HTML/CSS/JS/WordPress), Programming (C++, Java, SQL), and Agile Project Coordination.",
      skills:         "• Programming: C++, Java, JavaScript, SQL, OOP\n• Web Dev: HTML5, CSS3, JavaScript, WordPress, Git/GitHub\n• Agile & Project Delivery: Scrum, Sprint Planning, Backlogs, ClickUp, Notion\n• Testing & QA: Software Testing Fundamentals, Debugging",
      certifications: "1. TOPCIT Level 2 Competency Certificate of Excellence\n2. ICT User Certification Examination",
      education:      "Bachelor of Science in Information Technology — City College of Tagaytay (July 2026)\nHonors: Dean's Lister A.Y. 2023",
      contact:        "Email: lloyd.danton02@gmail.com\nPhone: +63 919 775 2848\nLocation: Tagaytay, Calabarzon, Philippines",
      location:       "Tagaytay, Calabarzon, Philippines (UTC+8)",
      status:         "Open to entry-level & associate opportunities in Software Engineering, Web Development, and IT Project Delivery.",
      sudo:           "Access granted: Welcome to John Lloyd's team!",
      coffee:         "Sprint task ready. Backlog groomed. Ready to build and coordinate!",
    },
  },

};
