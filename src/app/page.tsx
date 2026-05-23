import AboutSection from '@/components/about-section'
import Achievements from '@/components/achievements'
import ContactSection from '@/components/contact-section'
import Education from '@/components/education'
import Header from '@/components/header'
import ProjectExperience from '@/components/project-experience'
import WorkExperience from '@/components/work-experience'

export default function Home() {
    return (
        <div className='flex flex-col gap-12'>
            <Header />
            <ContactSection />
            <AboutSection />
            <WorkExperience />
            <ProjectExperience />
            <Education />
            <Achievements />
        </div>
    )
}
