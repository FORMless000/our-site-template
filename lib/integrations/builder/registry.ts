export type BuilderInput =
  | {
      name: string
      type: 'string' | 'number'
      required?: boolean
      defaultValue?: string | number
    }
  | {
      name: string
      type: 'list'
      subFields: BuilderInput[]
    }
  | {
      name: string
      type: 'object'
      subFields: BuilderInput[]
    }

export type BuilderComponentRegistration = {
  name: string
  description: string
  inputs: BuilderInput[]
}

export const builderComponentRegistry: BuilderComponentRegistration[] = [
  {
    name: 'Home Hero Section',
    description: 'Hero section with preserved Signal Studio stage layout.',
    inputs: [
      { name: 'eyebrow', type: 'string', required: true },
      { name: 'kicker', type: 'string', required: true },
      { name: 'title', type: 'string', required: true },
      { name: 'lead', type: 'string', required: true },
      {
        name: 'primaryCta',
        type: 'object',
        subFields: [
          { name: 'label', type: 'string', required: true },
          { name: 'href', type: 'string', required: true },
        ],
      },
      {
        name: 'secondaryCta',
        type: 'object',
        subFields: [
          { name: 'label', type: 'string', required: true },
          { name: 'href', type: 'string', required: true },
        ],
      },
      { name: 'stageHeight', type: 'number', defaultValue: 430 },
      {
        name: 'features',
        type: 'list',
        subFields: [
          { name: 'title', type: 'string', required: true },
          { name: 'description', type: 'string', required: true },
        ],
      },
    ],
  },
  {
    name: 'Home Approach Section',
    description: 'Section heading plus a fixed-style stack of info cards.',
    inputs: [
      { name: 'sectionId', type: 'string', defaultValue: 'approach' },
      { name: 'kicker', type: 'string', required: true },
      { name: 'title', type: 'string', required: true },
      {
        name: 'cards',
        type: 'list',
        subFields: [
          { name: 'title', type: 'string', required: true },
          { name: 'body', type: 'string', required: true },
        ],
      },
    ],
  },
  {
    name: 'Home Demo Showcase Intro',
    description: 'Heading and copy for the demos section above the code-owned demo list.',
    inputs: [
      { name: 'kicker', type: 'string', required: true },
      { name: 'title', type: 'string', required: true },
      { name: 'body', type: 'string', required: true },
    ],
  },
]
