'use client'

import { useEffect, useRef, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import PinToggle from '@/components/pin-toggle'
import { useAIConfig, useSiteCopy } from '@/components/language-provider'
import { usePinnedList } from '@/lib/use-pinned-items'

const PromptAccordion = () => {
    const [copiedKey, setCopiedKey] = useState<string | null>(null)
    const copyTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
    useEffect(() => () => clearTimeout(copyTimerRef.current), [])
        const aiConfig = useAIConfig()
    const siteCopy = useSiteCopy()
    const { items: prompts, isPinned, togglePinned } = usePinnedList(aiConfig.prompts, 'ai-prompt', (prompt) => prompt.title)

    const copyToClipboard = async (text: string, key: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedKey(key)
            clearTimeout(copyTimerRef.current)
            copyTimerRef.current = setTimeout(() => setCopiedKey(null), 1500)
        } catch {
            setCopiedKey(null)
        }
    }

    return (
        <section
            id='prompts'
            className='flex flex-col gap-4 px-4 animate-slide-from-down-and-fade-5 scroll-mt-8'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>{siteCopy.ai.prompts.heading}</h2>
                <p className='text-sm text-muted-foreground'>
                    {siteCopy.ai.prompts.description}
                </p>
            </div>

            <Accordion type='multiple' className='rounded-lg border px-4'>
                {prompts.map((prompt) => (
                    <AccordionItem key={prompt.pinKey} value={prompt.pinKey}>
                        <AccordionTrigger className='text-left'>
                            <div className='flex flex-col items-start gap-0.5'>
                                <span className='font-medium'>
                                    {prompt.title}
                                </span>
                                <span className='text-xs font-normal text-muted-foreground'>
                                    {prompt.description}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex flex-col gap-2'>
                                <pre className='overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-3 font-mono text-xs'>
                                    {prompt.content}
                                </pre>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() =>
                                        copyToClipboard(
                                            prompt.content,
                                            prompt.pinKey,
                                        )
                                    }
                                    className='self-end'
                                >
                                    {copiedKey === prompt.pinKey ? (
                                        <>
                                            <Check className='mr-1.5 size-3.5' />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className='mr-1.5 size-3.5' />
                                            Copy
                                        </>
                                    )}
                                </Button>
                                <PinToggle
                                    pinned={isPinned(
                                        prompt.pinKey,
                                        prompt.pinned,
                                    )}
                                    label={prompt.title}
                                    onToggle={() =>
                                        togglePinned(
                                            prompt.pinKey,
                                            prompt.pinned,
                                        )
                                    }
                                    className='self-end'
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}

export default PromptAccordion
