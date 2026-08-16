'use client'

import { useAIConfig } from '@/components/language-provider'

const AIHero = () => {
    const aiConfig = useAIConfig()
    return (
        <section className="flex flex-col gap-5 px-4 animate-slide-from-down-and-fade-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="border border-accent/60 px-2 py-1 font-medium text-accent">
                    {aiConfig.hero.curationLabel}
                </span>
                <span>
                    {aiConfig.hero.updatedLabel} {aiConfig.hero.lastUpdated}
                </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
                {aiConfig.hero.title}
            </h1>
            <div className="max-w-3xl space-y-3">
                <p className="text-lg leading-8">{aiConfig.hero.intro}</p>
                <p className="leading-7 text-muted-foreground">
                    {aiConfig.hero.positioning}
                </p>
            </div>
            <div className="grid gap-2 border-y py-4 text-sm text-muted-foreground sm:grid-cols-3">
                {aiConfig.hero.updateNotes.map((note) => (
                    <div key={note} className="flex gap-2">
                        <span
                            className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                        />
                        <span>{note}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AIHero
