import AboutSection from '@/components/about-section'
import Achievements from '@/components/achievements'
import ContactSection from '@/components/contact-section'
import Education from '@/components/education'
import Header from '@/components/header'
import HomeSectionNav from '@/components/home-section-nav'
import ProjectExperience from '@/components/project-experience'
import WorkExperience from '@/components/work-experience'

export default function Home() {
    return (
        <div className='grid gap-6 md:grid-cols-[8rem_minmax(0,1fr)] md:items-start'>
            <HomeSectionNav />
            <div className='flex min-w-0 flex-col gap-12'>
                <Header />
                <ContactSection />
                <AboutSection />
                <WorkExperience />
                <ProjectExperience />
                <Education />
                <Achievements />
            </div>
        </div>
    )
}
