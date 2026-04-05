import { SmartLink } from '@/components/primitives/smart-link'
import { UnderlayVisual } from '@/components/primitives/underlay-visual'
import type { TitleDisplayBlock as TitleDisplayBlockType } from '@/lib/content/homepage-document'

export function TitleDisplayBlock({ block }: { block: TitleDisplayBlockType }) {
  return (
    <section id={block.id} className={`hero-band title-display-section title-align-${block.contentAlign}`}>
      {block.imageUnderlay ? (
        <UnderlayVisual visual={block.imageUnderlay} className="section-underlay title-display-underlay" surface="section" />
      ) : null}
      <div className="container">
        <div className="title-display-copy">
          {block.kicker ? <span className="kicker">{block.kicker}</span> : null}
          <h1>{block.title}</h1>
          {block.subtitle ? <p className="title-display-subtitle">{block.subtitle}</p> : null}
          {block.body ? <p className="lead">{block.body}</p> : null}
          {block.actions.length > 0 ? (
            <div className="button-row">
              {block.actions.map((action) => (
                <SmartLink
                  key={`${block.id}-${action.label}-${action.href}`}
                  href={action.href}
                  className={`button ${action.style === 'secondary' ? 'button-secondary' : 'button-primary'}`}
                >
                  {action.label}
                </SmartLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
