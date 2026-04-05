import type { HomeApproachSectionContent } from '@/lib/content/home-page'

export function HomeApproachSection({ content }: { content: HomeApproachSectionContent }) {
  return (
    <section id={content.sectionId} className="section">
      <div className="container section-grid">
        <div>
          <span className="kicker">{content.kicker}</span>
          <h2>{content.title}</h2>
        </div>
        <div className="card-stack">
          {content.cards.map((card) => (
            <article key={card.title} className="info-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
