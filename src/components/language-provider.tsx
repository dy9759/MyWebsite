'use client'

import { CONFIG, CONFIG_EN } from '@/config'
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
            productProjects: '产品 / AI 项目',
            researchProjects: '科研项目',
            openSource: '开源项目 / GitHub',
            futureWork: '未来工作',
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
            productProjects: 'Product / AI Projects',
            researchProjects: 'Research Projects',
            openSource: 'Open Source / GitHub',
            futureWork: 'Future Work',
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
