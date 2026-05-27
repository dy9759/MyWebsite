'use client'

import { useState } from 'react'
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
import { sortPinnedFirst } from '@/lib/pin'
import { createPinKey, usePinnedItems } from '@/lib/use-pinned-items'

const PromptAccordion = () => {
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
    const pinState = usePinnedItems()
    const aiConfig = useAIConfig()
    const siteCopy = useSiteCopy()
    const promptItems = aiConfig.prompts.map((prompt, idx) => ({
        ...prompt,
        pinKey: createPinKey('ai-prompt', idx),
    }))
    const prompts = sortPinnedFirst(promptItems, (prompt) =>
        pinState.isPinned(prompt.pinKey, prompt.pinned),
    )

    const copyToClipboard = async (text: string, idx: number) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedIdx(idx)
            setTimeout(() => setCopiedIdx(null), 1500)
        } catch {
            setCopiedIdx(null)
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
                {prompts.map((prompt, idx) => (
                    <AccordionItem key={idx} value={`prompt-${idx}`}>
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
                                        copyToClipboard(prompt.content, idx)
                                    }
                                    className='self-end'
                                >
                                    {copiedIdx === idx ? (
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
                                    pinned={pinState.isPinned(
                                        prompt.pinKey,
                                        prompt.pinned,
                                    )}
                                    label={prompt.title}
                                    onToggle={() =>
                                        pinState.togglePinned(
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
