'use client'

import { CONFIG, CONFIG_EN } from '@/config'
import { AI_CONFIG } from '@/ai-config'
import { AI_CONFIG_EN } from '@/ai-config-en'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

export type Language = 'zh' | 'en'

const STORAGE_KEY = 'personal-site-language'

export const SITE_COPY = {
    zh: {
        nav: {
            home: '主页',
            projects: '项目',
            research: '研究',
            ai: 'AI资源库',
        },
        sections: {
            contact: '联系方式',
            about: '个人介绍',
            work: '工作经验',
            projects: '项目经验',
            productProjects: 'AI 产品项目',
            consumerProjects: 'C 端项目',
            enterpriseProjects: 'B 端项目',
            contentProjects: '内容项目',
            agentProjects: 'A 端项目',
            researchProjects: '科研项目',
            openSource: '开源项目',
            futureWork: '正在开展的项目',
            education: '教育背景',
            qualifications: '荣誉与资质',
            achievements: '研究成果',
            journalPapers: '期刊论文',
            conferencePapers: '会议论文',
            allProjects: '全部项目',
        },
        labels: {
            location: 'HangZhou,China',
            description: '描述:',
            role: '职责:',
            outcomes: '成果:',
            sourceCode: 'Source Code',
            visitWebsite: 'Visit Website',
            repository: 'GitHub repository',
            pinned: '已 Pin',
            pin: 'Pin',
            unpin: '取消 Pin',
            viewAll: '查看完整',
            copied: '已复制',
        },
        languageToggle: '语言切换',
        sectionNav: '主页章节导航',
        projectSectionNav: '项目分类导航',
        researchSectionNav: '研究分类导航',
        ai: {
            breadcrumbHome: '主页',
            breadcrumbCurrent: 'AI 资源库',
            sidebarTitle: 'AI 资源库',
            sectionNavAria: 'AI 资源分类导航',
            sectionNav: {
                usage: '使用说明',
                layer1: 'L1 聚合',
                layer2: 'L2 人物',
                layer3: 'L3 播客',
                layer4: 'L4 技术',
                layer5: 'L5 社区',
                layer6: 'L6 中文圈',
            },
            usageIntro: {
                heading: '使用说明 · How to use this library',
                paragraph:
                    '本库按 6 个层次组织 AI 与科技信息源，从最广的聚合到最深的研究。下面是我在实际使用中遵循的三条原则，帮助你判断该看什么、以什么顺序看。',
            },
            sourcesOverride: {
                layer2: '个人博客 · 传记推荐',
                layer4: '开发者大会 · 博客 · 论文 · 人物主页',
            },
            people: {
                heading: 'People to Follow',
                description: 'Builders and researchers worth following on X.',
            },
            newsletters: {
                heading: 'Newsletters & Articles',
                description: '持续输出高信噪比的作者。',
            },
            podcasts: {
                heading: 'Podcasts',
                description: '深度访谈与行业内幕。',
            },
            videos: {
                heading: 'Videos & TLDW Notes',
                description: '长视频附简短笔记，便于回顾。',
            },
            products: {
                heading: 'Products & Tools',
                description: '我日常用来加速工作的 AI 产品。',
            },
            prompts: {
                heading: 'Prompt Library',
                description: '可直接复制的高质量提示词。',
            },
            skills: {
                heading: 'Skills & Projects',
                description: '我用于练手的开源仓库与小项目。',
            },
            bigTech: {
                heading: 'AI 大厂动态 · Big Tech Watch',
                description: '跟踪关键人物、发布会与播客访谈。点开每家公司展开。',
                tracking: '追踪中',
                empty: '关键人物与事件清单待补充。',
            },
        },
    },
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            research: 'Research',
            ai: 'AI Library',
        },
        sections: {
            contact: 'Contact',
            about: 'About',
            work: 'Work Experience',
            projects: 'Project Experience',
            productProjects: 'AI Product Projects',
            consumerProjects: 'Consumer (C) Projects',
            enterpriseProjects: 'Enterprise (B) Projects',
            contentProjects: 'Content Projects',
            agentProjects: 'Agent (A) Projects',
            researchProjects: 'Research Projects',
            openSource: 'Open Source',
            futureWork: 'Ongoing Projects',
            education: 'Education',
            qualifications: 'Qualifications',
            achievements: 'Research Achievements',
            journalPapers: 'Journal Papers',
            conferencePapers: 'Conference Papers',
            allProjects: 'All Projects',
        },
        labels: {
            location: 'Hangzhou, China',
            description: 'Overview:',
            role: 'Role:',
            outcomes: 'Outcomes:',
            sourceCode: 'Source Code',
            visitWebsite: 'Visit Website',
            repository: 'GitHub repository',
            pinned: 'Pinned',
            pin: 'Pin',
            unpin: 'Unpin',
            viewAll: 'View all',
            copied: 'Copied',
        },
        languageToggle: 'Language switcher',
        sectionNav: 'Homepage section navigation',
        projectSectionNav: 'Project category navigation',
        researchSectionNav: 'Research category navigation',
        ai: {
            breadcrumbHome: 'Home',
            breadcrumbCurrent: 'AI Library',
            sidebarTitle: 'AI LIBRARY',
            sectionNavAria: 'AI library section navigation',
            sectionNav: {
                usage: 'How to use',
                layer1: 'L1 Aggregation',
                layer2: 'L2 People',
                layer3: 'L3 Podcasts',
                layer4: 'L4 Technical',
                layer5: 'L5 Community',
                layer6: 'L6 Chinese Sphere',
            },
            usageIntro: {
                heading: 'How to use this library',
                paragraph:
                    'This library organizes AI and tech information sources across 6 layers, from the broadest aggregators to the deepest research. Below are the three rules I follow in practice — they help you decide what to read and in what order.',
            },
            sourcesOverride: {
                layer2: 'Personal Blogs · Recommended Biographies',
                layer4: 'Developer Conferences · Blogs · Papers · People Sites',
            },
            people: {
                heading: 'People to Follow',
                description: 'Builders and researchers worth following on X.',
            },
            newsletters: {
                heading: 'Newsletters & Articles',
                description: 'Writers who consistently publish signal over noise.',
            },
            podcasts: {
                heading: 'Podcasts',
                description: 'Deep interviews and inside takes on the industry.',
            },
            videos: {
                heading: 'Videos & TLDW Notes',
                description: 'Long videos with short notes for easy revisit.',
            },
            products: {
                heading: 'Products & Tools',
                description: 'AI products I use daily to speed up my work.',
            },
            prompts: {
                heading: 'Prompt Library',
                description: 'High-quality prompts ready to copy and use.',
            },
            skills: {
                heading: 'Skills & Projects',
                description: 'Open-source repos and small projects I practice with.',
            },
            bigTech: {
                heading: 'Big Tech Watch',
                description:
                    'Track key people, launch events, and podcast interviews. Click any company to expand.',
                tracking: 'Tracking',
                empty: 'Key people and event list coming soon.',
            },
        },
    },
} as const

type LanguageContextValue = {
    language: Language
    setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
    undefined,
)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('zh')
    const [hasLoadedStoredLanguage, setHasLoadedStoredLanguage] =
        useState(false)

    const setLanguage = useCallback((nextLanguage: Language) => {
        setLanguageState(nextLanguage)
        window.localStorage.setItem(STORAGE_KEY, nextLanguage)
        document.documentElement.lang = nextLanguage === 'zh' ? 'zh-CN' : 'en'
    }, [])

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored === 'zh' || stored === 'en') {
            setLanguageState(stored)
        }
        setHasLoadedStoredLanguage(true)
    }, [])

    useEffect(() => {
        if (!hasLoadedStoredLanguage) return

        window.localStorage.setItem(STORAGE_KEY, language)
        document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    }, [hasLoadedStoredLanguage, language])

    const value = useMemo(
        () => ({
            language,
            setLanguage,
        }),
        [language],
    )

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider')
    }
    return context
}

export function useSiteCopy() {
    const { language } = useLanguage()
    return SITE_COPY[language]
}

export function useSiteConfig() {
    const { language } = useLanguage()
    return language === 'en' ? CONFIG_EN : CONFIG
}

export function useAIConfig() {
    const { language } = useLanguage()
    return language === 'en' ? AI_CONFIG_EN : AI_CONFIG
}
