export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: string
}

function hashInput(value: string) {
  let hash = 7

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

function pick<T>(items: T[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length]
}

function extractFocus(input: string) {
  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3)

  return cleaned.slice(0, 3).join(' ') || 'your request'
}

export function generateFakeReply(input: string, history: ChatMessage[]) {
  const seed = hashInput(`${input}:${history.length}:${history[0]?.content ?? ''}`)
  const focus = extractFocus(input)

  const openers = [
    'Here is the current studio-style answer:',
    'A lightweight assistant stub would say:',
    'For this local preview, a likely response is:',
    'The fake guide would frame it like this:',
  ]

  const middle = [
    `I would anchor the response around ${focus} and keep it actionable instead of vague.`,
    `I would treat ${focus} as the main signal, then map it to a clear next step for the visitor.`,
    `I would keep the answer grounded in ${focus} and only ask a follow-up if the request stayed fuzzy.`,
    `I would translate ${focus} into a short checklist so the popup feels useful before a real model is connected.`,
  ]

  const closers = [
    'Later, this adapter can call your real LLM with your own prompts and keys.',
    'When you connect a real backend, the overlay behavior can stay the same and only the reply layer changes.',
    'The stub stays local-only so the interface can be shaped before any secrets are introduced.',
    'That keeps the popup safe for demos, previews, and visual polish work.',
  ]

  return [
    pick(openers, seed),
    pick(middle, seed, 1),
    pick(closers, seed, 2),
  ].join(' ')
}
