// Bilingual UI copy for the site chrome. Kept in its own module so the
// language provider stays focused on state/context logic. Structural
// parity between zh and en is guarded by site-copy-parity.test.ts.
export const SITE_COPY = {
  zh: {
    nav: {
      home: "首页",
      projects: "代表案例",
      lab: "Builder Lab",
      research: "研究",
      wiki: "Wiki",
    },
    sections: {
      achievements: "研究成果",
      journalPapers: "期刊论文",
      conferencePapers: "会议论文",
    },
    labels: {
      role: "职责:",
      pin: "Pin",
      unpin: "取消 Pin",
      viewAll: "查看完整",
      pinEditOn: "开启置顶编辑",
      pinEditOff: "关闭置顶编辑",
      themeToggle: "切换主题",
      themeToLight: "切换到日版",
      themeToDark: "切换到夜版",
      videosEmpty: "没有匹配所选标签的视频。",
      collapse: "收起",
      viewComplete: "查看完整合集",
    },
    mainNav: "主导航",
    sectionNav: "主页章节导航",
    projectSectionNav: "项目分类导航",
    researchSectionNav: "研究分类导航",
    ai: {
      breadcrumbHome: "主页",
      breadcrumbCurrent: "AI Sense Sources",
      sidebarTitle: "AI Sense Sources",
      sectionNavAria: "AI 资源分类导航",
      sectionNav: {
        usage: "使用说明",
        layer1: "L1 聚合",
        layer2: "L2 人物",
        layer3: "L3 播客",
        layer4: "L4 技术",
        layer5: "L5 社区",
        layer6: "L6 中文圈",
      },
      usageIntro: {
        heading: "使用说明 · How to use this library",
        paragraph:
          "本库按 6 个层次组织 AI 与科技信息源，从最广的聚合到最深的研究。下面是我在实际使用中遵循的三条原则，帮助你判断该看什么、以什么顺序看。",
      },
      sourcesOverride: {
        layer2: "个人博客 · 传记推荐",
        layer4: "开发者大会 · 博客 · 论文 · 人物主页",
      },
      people: {
        heading: "People to Follow",
        description: "Builders and researchers worth following on X.",
      },
      newsletters: {
        heading: "Newsletters & Articles",
        description: "持续输出高信噪比的作者。",
      },
      podcasts: {
        heading: "Podcasts",
        description: "深度访谈与行业内幕。",
        columns: { name: "播客", description: "简介", link: "链接" },
      },
      videos: {
        heading: "Videos & TLDW Notes",
        description: "长视频附简短笔记，便于回顾。",
      },
      products: {
        heading: "Products & Tools",
        description: "我日常用来加速工作的 AI 产品。",
        columns: { name: "产品", description: "我为什么用它", link: "链接" },
      },
      prompts: {
        heading: "Prompt Library",
        description: "可直接复制的高质量提示词。",
      },
      skills: {
        heading: "Skills & Projects",
        description: "我用于练手的开源仓库与小项目。",
      },
      bigTech: {
        heading: "AI 大厂动态 · Big Tech Watch",
        description: "跟踪关键人物、发布会与播客访谈。点开每家公司展开。",
        tracking: "追踪中",
        empty: "关键人物与事件清单待补充。",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Case Studies",
      lab: "Builder Lab",
      research: "Research",
      wiki: "Wiki",
    },
    sections: {
      achievements: "Research Achievements",
      journalPapers: "Journal Papers",
      conferencePapers: "Conference Papers",
    },
    labels: {
      role: "Role:",
      pin: "Pin",
      unpin: "Unpin",
      viewAll: "View all",
      pinEditOn: "Enable pin editing",
      pinEditOff: "Disable pin editing",
      themeToggle: "Toggle theme",
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      videosEmpty: "No videos match the selected tag.",
      collapse: "Collapse",
      viewComplete: "View complete collection",
    },
    mainNav: "Main navigation",
    sectionNav: "Homepage section navigation",
    projectSectionNav: "Project category navigation",
    researchSectionNav: "Research category navigation",
    ai: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "AI Sense Sources",
      sidebarTitle: "AI LIBRARY",
      sectionNavAria: "AI library section navigation",
      sectionNav: {
        usage: "How to use",
        layer1: "L1 Aggregation",
        layer2: "L2 People",
        layer3: "L3 Podcasts",
        layer4: "L4 Technical",
        layer5: "L5 Community",
        layer6: "L6 Chinese Sphere",
      },
      usageIntro: {
        heading: "How to use this library",
        paragraph:
          "This library organizes AI and tech information sources across 6 layers, from the broadest aggregators to the deepest research. Below are the three rules I follow in practice — they help you decide what to read and in what order.",
      },
      sourcesOverride: {
        layer2: "Personal Blogs · Recommended Biographies",
        layer4: "Developer Conferences · Blogs · Papers · People Sites",
      },
      people: {
        heading: "People to Follow",
        description: "Builders and researchers worth following on X.",
      },
      newsletters: {
        heading: "Newsletters & Articles",
        description: "Writers who consistently publish signal over noise.",
      },
      podcasts: {
        heading: "Podcasts",
        description: "Deep interviews and inside takes on the industry.",
        columns: { name: "Podcast", description: "Description", link: "Link" },
      },
      videos: {
        heading: "Videos & TLDW Notes",
        description: "Long videos with short notes for easy revisit.",
      },
      products: {
        heading: "Products & Tools",
        description: "AI products I use daily to speed up my work.",
        columns: { name: "Product", description: "Why I use it", link: "Link" },
      },
      prompts: {
        heading: "Prompt Library",
        description: "High-quality prompts ready to copy and use.",
      },
      skills: {
        heading: "Skills & Projects",
        description: "Open-source repos and small projects I practice with.",
      },
      bigTech: {
        heading: "Big Tech Watch",
        description:
          "Track key people, launch events, and podcast interviews. Click any company to expand.",
        tracking: "Tracking",
        empty: "Key people and event list coming soon.",
      },
    },
  },
} as const;
