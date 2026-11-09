export const companyData = {
  name: "Vericode AI",
  tagline: "Learning, Practice, & Secure Coding — Unified.",
  introHeadline: "The Unified Workspace for Modern Developers",
  introSubheadline: "Why switch between browser tabs, AI assistants, and coding sandboxes? Vericode AI integrates ChatGPT, LeetCode, and GeeksforGeeks into a single, cohesive, lovable environment. Form built-in habits for secure development from day one.",
  
  integrations: [
    {
      id: "chatgpt",
      name: "ChatGPT AI Copilot",
      icon: "message-square",
      color: "#ffffff",
      accentColor: "#888888",
      headline: "Context-Aware AI Guidance",
      description: "Get real-time feedback, code explanations, and debugging advice directly next to your learning materials and editor. Ask questions, clarify algorithms, and write better code without breaking focus.",
      bullets: [
        "Instant code explanation and bug detection",
        "Generates customized test cases based on LeetCode questions",
        "Suggests security enhancements and optimal algorithms"
      ]
    },
    {
      id: "leetcode",
      name: "LeetCode Workspace",
      icon: "code-2",
      color: "#000000",
      accentColor: "#cccccc",
      headline: "Gamified Coding Challenges",
      description: "Work through coding problems, run them against test cases, and compile right there. Practise competitive programming while the reference guides and AI debugging stay on the same screen.",
      bullets: [
        "In-dashboard compilation and execution environment",
        "Progress tracking and achievement milestones",
        "Hooks straight into the AI chat for hints and quick code reviews"
      ]
    },
    {
      id: "geeksforgeeks",
      name: "GeeksforGeeks Hub",
      icon: "book-open",
      color: "#777777",
      accentColor: "#ffffff",
      headline: "Comprehensive CS Tutorials",
      description: "Quickly browse and reference structured articles, tutorials, and data structure documentation. Bridge the gap between understanding theory and implementing practical, clean code.",
      bullets: [
        "Curated learning paths for data structures and algorithms",
        "Direct link between theory articles and practice problems",
        "Quick-reference cheatsheets for multiple programming languages"
      ]
    }
  ],
  
  roadmap: [
    {
      phase: "Phase 1",
      title: "The Unified Workspace",
      status: "Active",
      desc: "Integrate coding sandboxes, AI chat, and educational content into a premium, unified web dashboard."
    },
    {
      phase: "Phase 2",
      title: "Collaborative Sandbox",
      status: "In Development",
      desc: "Multi-user coding rooms with shared AI context, live pair programming, and peer reviews."
    },
    {
      phase: "Phase 3",
      title: "Vericode Secure IDE",
      status: "Future Release",
      desc: "A lightweight, secure desktop/web IDE with real-time AI security audits, vulnerability detection, and auto-patching."
    }
  ],

  // ---------------------------------------------------------------------------
  // Founding & engineering team.
  // Placeholder identities — swap `name`, `bio`, `photo`, and `links` here when
  // the real member details arrive. Nothing else in the UI needs to change.
  // `photo` may be a path under /public; leave empty ("") to fall back to the
  // generated monogram avatar built from `initials`.
  // ---------------------------------------------------------------------------
  team: {
    leadership: [
      {
        id: "ceo",
        name: "Founder Name",
        initials: "CE",
        role: "Chief Executive Officer",
        tenure: "Vision & Direction",
        bio: "Sets the company direction and keeps the product honest to the people who rely on it. Spends most of the week with customers, not slide decks.",
        photo: "",
        links: { linkedin: "#", x: "#", email: "#" }
      },
      {
        id: "coo",
        name: "Founder Name",
        initials: "CO",
        role: "Chief Operating Officer",
        tenure: "Operations & Growth",
        bio: "Turns the roadmap into shipped work. Owns hiring, process, and the unglamorous plumbing that lets the team move fast without breaking trust.",
        photo: "",
        links: { linkedin: "#", x: "#", email: "#" }
      },
      {
        id: "cto",
        name: "Founder Name",
        initials: "CT",
        role: "Chief Technology Officer",
        tenure: "Architecture & Security",
        bio: "Owns the technical bet: how the platform is built, how it scales, and how it stays secure. Still reviews pull requests when it matters.",
        photo: "",
        links: { linkedin: "#", x: "#", email: "#" }
      },
      {
        id: "manager",
        name: "Team Member",
        initials: "PM",
        role: "Product Manager",
        tenure: "Delivery & Planning",
        bio: "Sits between engineering, design, and customers. Decides what gets built next and, harder still, what gets left out.",
        photo: "",
        links: { linkedin: "#", x: "#", email: "#" }
      }
    ],
    engineering: [
      {
        id: "frontend",
        name: "Team Member",
        initials: "FE",
        role: "Frontend Engineer",
        tenure: "Interface & Experience",
        bio: "Builds the workspace people actually touch every day — the layout, the motion, and the small details that make it feel fast.",
        photo: "",
        links: { linkedin: "#", x: "#", email: "#" }
      },
      {
        id: "backend",
        name: "Team Member",
        initials: "BE",
        role: "Backend Engineer",
        tenure: "Systems & Data",
        bio: "Keeps the services, data, and integrations running quietly underneath. If you never notice this work, it is doing its job.",
        photo: "",
        links: { linkedin: "#", x: "#", email: "#" }
      }
    ]
  }
};
