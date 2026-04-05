import type { CSSProperties } from 'react'

import { SmartLink } from '@/components/primitives/smart-link'
import { UnderlayVisual } from '@/components/primitives/underlay-visual'
import type { TextualGatewayGroupBlock as TextualGatewayGroupBlockType } from '@/lib/content/homepage-document'

export function TextualGatewayGroupBlock({ block }: { block: TextualGatewayGroupBlockType }) {
  const gridStyle = {
    '--desktop-columns': block.layout.desktopColumns,
    '--tablet-columns': block.layout.tabletColumns,
    '--mobile-columns': block.layout.mobileColumns,
    '--card-aspect-ratio': block.layout.aspectRatio,
  } as CSSProperties

  return (
    <section id={block.id} className="section section-muted">
      <div className="container">
        <div className="section-heading">
          {block.kicker ? <span className="kicker">{block.kicker}</span> : null}
          <h2>{block.title}</h2>
        </div>

        <div className="gateway-grid gateway-grid-textual" style={gridStyle}>
          {block.cards.map((card) => (
            <SmartLink key={`${block.id}-${card.title}`} href={card.href} className="gateway-card gateway-card-textual">
              {card.imageUnderlay ? (
                <UnderlayVisual visual={card.imageUnderlay} className="gateway-card-underlay section-underlay" surface="panel" />
              ) : null}
              <div className="gateway-card-copy">
                {card.eyebrow ? <span className="eyebrow">{card.eyebrow}</span> : null}
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}
