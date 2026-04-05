import Link from 'next/link'

import { SignalStage } from '@/components/primitives/signal-stage'
import type { HomeHeroSectionContent } from '@/lib/content/home-page'

export function HomeHeroSection({ content }: { content: HomeHeroSectionContent }) {
  return (
    <section id="main-content" className="hero-band">
      <div className="container hero-layout">
        <div className="hero-visual">
          <div className="stage-frame">
            <div className="eyebrow">{content.eyebrow}</div>
            <SignalStage height={content.stageHeight} />
          </div>
        </div>

        <div className="hero-copy">
          <span className="kicker">{content.kicker}</span>
          <h1>{content.title}</h1>
          <p className="lead">{content.lead}</p>

          <div className="button-row">
            <Link href={content.primaryCta.href} className="button button-primary">
              {content.primaryCta.label}
            </Link>
            <a href={content.secondaryCta.href} className="button button-secondary">
              {content.secondaryCta.label}
            </a>
          </div>

          <div className="feature-strip">
            {content.features.map((feature) => (
              <div key={feature.title} className="feature-tile">
                <strong>{feature.title}</strong>
                <span>{feature.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
