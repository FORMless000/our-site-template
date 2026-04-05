import { DemoList } from '@/components/demo-list'
import type { HomeDemosSectionContent } from '@/lib/content/home-page'
import { demoEntries } from '@/lib/demos'

export function HomeDemosSection({ content }: { content: HomeDemosSectionContent }) {
  return (
    <section className="section section-muted">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">{content.kicker}</span>
          <h2>{content.title}</h2>
          <p>{content.body}</p>
        </div>

        <DemoList demos={demoEntries} />
      </div>
    </section>
  )
}
