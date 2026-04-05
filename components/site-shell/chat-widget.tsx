'use client'

import { useEffect, useState } from 'react'
import { MessageSquare, X } from 'lucide-react'

import { FakeChatPanel } from '@/components/site-shell/fake-chat-panel'

export function ChatWidget() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      {open ? <button className="chat-overlay" aria-label="Close chat overlay" onClick={() => setOpen(false)} /> : null}

      {open ? (
        <div className="chat-widget" role="dialog" aria-modal="true" aria-label="Site chat assistant">
          <button className="icon-button chat-close" type="button" onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={18} />
          </button>
          <FakeChatPanel />
        </div>
      ) : null}

      <button
        className="chat-toggle"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? 'Close chat widget' : 'Open chat widget'}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </>
  )
}
