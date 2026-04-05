import { defaultHomePageContent, type HomePageContent } from '@/lib/content/home-page'

type BuilderContentEnvelope = {
  data?: unknown
}

const DEFAULT_MODEL = 'home-page'

function getBuilderConfig() {
  const apiKey = process.env.BUILDER_PUBLIC_API_KEY
  const model = process.env.BUILDER_HOME_MODEL || DEFAULT_MODEL

  if (!apiKey) {
    return null
  }

  return {
    apiKey,
    model,
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function asRecordArray(value: unknown) {
  return Array.isArray(value) ? value.filter(isObject) : []
}

function normalizeHomePageContent(data: unknown): HomePageContent | null {
  if (!isObject(data)) {
    return null
  }

  const hero = isObject(data.hero) ? data.hero : {}
  const approach = isObject(data.approach) ? data.approach : {}
  const demos = isObject(data.demos) ? data.demos : {}

  const features = asRecordArray(hero.features)
  const cards = asRecordArray(approach.cards)

  return {
    hero: {
      eyebrow: asString(hero.eyebrow, defaultHomePageContent.hero.eyebrow),
      kicker: asString(hero.kicker, defaultHomePageContent.hero.kicker),
      title: asString(hero.title, defaultHomePageContent.hero.title),
      lead: asString(hero.lead, defaultHomePageContent.hero.lead),
      primaryCta: {
        label: asString(
          isObject(hero.primaryCta) ? hero.primaryCta.label : undefined,
          defaultHomePageContent.hero.primaryCta.label,
        ),
        href: asString(
          isObject(hero.primaryCta) ? hero.primaryCta.href : undefined,
          defaultHomePageContent.hero.primaryCta.href,
        ),
      },
      secondaryCta: {
        label: asString(
          isObject(hero.secondaryCta) ? hero.secondaryCta.label : undefined,
          defaultHomePageContent.hero.secondaryCta.label,
        ),
        href: asString(
          isObject(hero.secondaryCta) ? hero.secondaryCta.href : undefined,
          defaultHomePageContent.hero.secondaryCta.href,
        ),
      },
      stageHeight: asNumber(hero.stageHeight, defaultHomePageContent.hero.stageHeight),
      features:
        features.length > 0
          ? features.map((item, index) => ({
              title: asString(item.title, defaultHomePageContent.hero.features[index]?.title ?? 'Feature'),
              description: asString(
                item.description,
                defaultHomePageContent.hero.features[index]?.description ?? '',
              ),
            }))
          : defaultHomePageContent.hero.features,
    },
    approach: {
      sectionId: asString(approach.sectionId, defaultHomePageContent.approach.sectionId),
      kicker: asString(approach.kicker, defaultHomePageContent.approach.kicker),
      title: asString(approach.title, defaultHomePageContent.approach.title),
      cards:
        cards.length > 0
          ? cards.map((item, index) => ({
              title: asString(item.title, defaultHomePageContent.approach.cards[index]?.title ?? 'Card'),
              body: asString(item.body, defaultHomePageContent.approach.cards[index]?.body ?? ''),
            }))
          : defaultHomePageContent.approach.cards,
    },
    demos: {
      kicker: asString(demos.kicker, defaultHomePageContent.demos.kicker),
      title: asString(demos.title, defaultHomePageContent.demos.title),
      body: asString(demos.body, defaultHomePageContent.demos.body),
    },
  }
}

export async function getBuilderHomePageContent(): Promise<HomePageContent | null> {
  const config = getBuilderConfig()

  if (!config) {
    return null
  }

  const searchParams = new URLSearchParams({
    apiKey: config.apiKey,
    includeUnpublished: 'true',
    limit: '1',
  })

  try {
    const response = await fetch(
      `https://cdn.builder.io/api/v3/content/${config.model}?${searchParams.toString()}`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as {
      results?: BuilderContentEnvelope[]
    }

    return normalizeHomePageContent(payload.results?.[0]?.data)
  } catch {
    return null
  }
}
