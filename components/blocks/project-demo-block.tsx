'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'

import { SmartLink } from '@/components/primitives/smart-link'
import { ProjectSurface } from '@/components/projects/project-surface'
import type { ProjectDemoBlock as ProjectDemoBlockType } from '@/lib/content/homepage-document'

export function ProjectDemoBlock({ block }: { block: ProjectDemoBlockType }) {
  const [open, setOpen] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const layoutClassName = useMemo(
    () =>
      `project-demo-grid ${block.mediaSide === 'right' ? 'project-demo-grid-right' : 'project-demo-grid-left'}`,
    [block.mediaSide],
  )

  useEffect(() => {
    if (!open) {
      return
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    toggleButtonRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open])

  return (
    <section id={block.id} className="section">
      <div className="container">
        {open ? (
          <button
            className="project-demo-overlay"
            type="button"
            aria-label="Close fullscreen project"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div className={layoutClassName}>
          <div className={`project-demo-media-shell ${open ? 'is-fullscreen' : ''}`}>
            <div className="project-demo-frame">
              <div className="project-demo-toolbar">
                <span className="eyebrow">{block.kicker ?? 'Project demo'}</span>
                <button
                  ref={toggleButtonRef}
                  className="project-demo-icon-button"
                  type="button"
                  onClick={() => setOpen((current) => !current)}
                  aria-label={open ? 'Exit fullscreen project' : 'Open fullscreen project'}
                >
                  {open ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>
              <ProjectSurface project={block.project} expanded={open} />
            </div>
          </div>

          <div className="project-demo-copy">
            {block.kicker ? <span className="kicker">{block.kicker}</span> : null}
            <h2>{block.title}</h2>
            <p>{block.body}</p>
            <SmartLink href={block.goToHref} className="text-link text-link-accent">
              {block.goToLabel} {'>'}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  )
}
