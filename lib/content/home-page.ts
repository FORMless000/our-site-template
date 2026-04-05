export type ContentCta = {
  label: string
  href: string
}

export type FeatureTileContent = {
  title: string
  description: string
}

export type InfoCardContent = {
  title: string
  body: string
}

export type HomeHeroSectionContent = {
  eyebrow: string
  kicker: string
  title: string
  lead: string
  primaryCta: ContentCta
  secondaryCta: ContentCta
  stageHeight: number
  features: FeatureTileContent[]
}

export type HomeApproachSectionContent = {
  sectionId: string
  kicker: string
  title: string
  cards: InfoCardContent[]
}

export type HomeDemosSectionContent = {
  kicker: string
  title: string
  body: string
}

export type HomePageContent = {
  hero: HomeHeroSectionContent
  approach: HomeApproachSectionContent
  demos: HomeDemosSectionContent
}

export const defaultHomePageContent: HomePageContent = {
  hero: {
    eyebrow: 'Embedded live surface',
    kicker: 'Interactive site starter',
    title: 'Build a showcase site for tools, visuals, and a popup AI guide.',
    lead:
      'Signal Studio is rebuilt from a smaller custom foundation. The homepage centers a native visual experiment, the chatbot lives in a floating launcher, and the gallery is ready for future web apps or exported interactive demos.',
    primaryCta: {
      label: 'Explore demos',
      href: '/demos',
    },
    secondaryCta: {
      label: 'Read the approach',
      href: '#approach',
    },
    stageHeight: 430,
    features: [
      {
        title: 'Popup chat',
        description: 'Floating interface instead of a full demo page.',
      },
      {
        title: 'Static-ready',
        description: 'Local serving now, exportable for GitHub Pages later.',
      },
      {
        title: 'Expandable',
        description: 'Swap in your own apps, prompts, models, or WebGL scenes.',
      },
    ],
  },
  approach: {
    sectionId: 'approach',
    kicker: 'Why this structure works',
    title: 'A homepage for impact, a gallery for depth, and a chat layer for guided tours.',
    cards: [
      {
        title: 'Homepage visual block',
        body:
          'The left-aligned visual embed gives you room to feature a native canvas or WebGL experience directly on the main screen without burying it behind extra navigation.',
      },
      {
        title: 'Popup assistant',
        body:
          'The fake assistant is local-only for now. Later, the adapter can switch to your own prompts and API keys without changing the overlay behavior.',
      },
      {
        title: 'Demo expansion',
        body:
          'Keep native demos inside the app, and mount older exported projects through sandboxed iframes when that is the safer integration path.',
      },
    ],
  },
  demos: {
    kicker: 'Current demos',
    title: 'Start with two patterns: one native, one embedded.',
    body:
      'This gives you a clean baseline for the site while keeping room for more ambitious interactive work later.',
  },
}
