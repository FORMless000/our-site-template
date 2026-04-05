import type { CSSProperties } from 'react'

import { SmartLink } from '@/components/primitives/smart-link'
import type { GraphicalGatewayGroupBlock as GraphicalGatewayGroupBlockType } from '@/lib/content/homepage-document'
import { withBasePath } from '@/lib/site'

export function GraphicalGatewayGroupBlock({ block }: { block: GraphicalGatewayGroupBlockType }) {
  const gridStyle = {
    '--desktop-columns': block.layout.desktopColumns,
    '--tablet-columns': block.layout.tabletColumns,
    '--mobile-columns': block.layout.mobileColumns,
    '--card-aspect-ratio': block.layout.aspectRatio,
  } as CSSProperties

  return (
    <section id={block.id} className="section">
      <div className="container">
        <div className="section-heading">
          {block.kicker ? <span className="kicker">{block.kicker}</span> : null}
          <h2>{block.title}</h2>
        </div>

        <div className="gateway-grid gateway-grid-graphical" style={gridStyle}>
          {block.cards.map((card) => (
            <SmartLink
              key={`${block.id}-${card.href}-${card.ariaLabel}`}
              href={card.href}
              className="gateway-card gateway-card-graphical"
              ariaLabel={card.ariaLabel}
            >
              <img src={withBasePath(card.image.src)} alt={card.image.alt} />
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}
