export type DemoKind = 'webapp' | 'visual'
export type DemoMode = 'native' | 'iframe'
export type DemoStatus = 'ready' | 'placeholder'

export interface DemoEntry {
  slug: string
  title: string
  summary: string
  kind: DemoKind
  route: string
  mode: DemoMode
  status: DemoStatus
  highlights: string[]
  notes: string[]
}

export const demoEntries: DemoEntry[] = [
  {
    slug: 'pulse-lab',
    title: 'Pulse Lab',
    summary:
      'A sandboxed iframe route for older exported mini apps or self-contained interactive tools.',
    kind: 'webapp',
    route: '/demos/pulse-lab',
    mode: 'iframe',
    status: 'ready',
    highlights: [
      'Loaded from a static file in public/embedded',
      'Good fit for older builds you do not want to deeply refactor yet',
      'Preserves the main site shell while isolating app-specific code',
    ],
    notes: [
      'Use iframe demos when the existing project already exports clean static files.',
      'Keep the embedded app self-contained so static hosting remains straightforward.',
      'Sandbox rules can be tightened further when a demo no longer needs script freedom.',
    ],
  },
  {
    slug: 'signal-canvas',
    title: 'Signal Canvas',
    summary:
      'A native client-rendered visual module that stands in for future WebGL work on the homepage and in the gallery.',
    kind: 'visual',
    route: '/demos/signal-canvas',
    mode: 'native',
    status: 'ready',
    highlights: [
      'Client-rendered for heavier visual behavior',
      'Reusable on the homepage and on a dedicated route',
      'Easy to replace with a real WebGL renderer later',
    ],
    notes: [
      'Use this pattern for native visuals you want to integrate tightly with the surrounding layout.',
      'A later React Three Fiber or WebGL scene can replace the canvas internals without changing the route shape.',
      'Keeping the wrapper stable makes homepage reuse much easier.',
    ],
  },
]

const demoMap = new Map(demoEntries.map((demo) => [demo.slug, demo]))

export function getDemoBySlug(slug: string) {
  return demoMap.get(slug)
}
