'use client'

import { useEffect, useRef, useState } from 'react'

import type { ChatMessage } from '@/lib/fake-chat'
import { generateFakeReply } from '@/lib/fake-chat'

const starter: ChatMessage[] = [
  {
    id: 'intro-message',
    role: 'assistant',
    content:
      'I am a local guide for the site. Ask about the demos, hosting setup, or how the studio can evolve.',
    createdAt: new Date().toISOString(),
  },
]

export function FakeChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(starter)
  const [draft, setDraft] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isThinking])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = draft.trim()

    if (!value || isThinking) {
      return
    }

    const userMessage: ChatMessage = {
      id: `user-${messages.length + 1}`,
      role: 'user',
      content: value,
      createdAt: new Date().toISOString(),
    }

    const nextHistory = [...messages, userMessage]
    setMessages(nextHistory)
    setDraft('')
    setIsThinking(true)

    timerRef.current = setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${nextHistory.length + 1}`,
        role: 'assistant',
        content: generateFakeReply(value, nextHistory),
        createdAt: new Date().toISOString(),
      }

      setMessages((current) => [...current, assistantMessage])
      setIsThinking(false)
    }, 360 + (value.length % 4) * 110)
  }

  return (
    <div className="chat-shell">
      <div className="chat-log" ref={scrollRef}>
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.role}`}>
            <span className="chat-label">{message.role}</span>
            {message.content}
          </div>
        ))}

        {isThinking ? (
          <div className="chat-message assistant">
            <span className="chat-label">assistant</span>
            Drafting a local placeholder answer...
          </div>
        ) : null}
      </div>

      <form className="chat-form" onSubmit={submitMessage}>
        <textarea
          className="chat-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask how the site could expand, how demos are hosted, or what a real AI layer might do next..."
        />
        <div className="chat-actions">
          <span className="chat-caption">Fake local assistant. No API keys are used yet.</span>
          <button className="button button-primary" type="submit" disabled={!draft.trim() || isThinking}>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
