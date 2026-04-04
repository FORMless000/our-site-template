import Link from 'next/link'
import { notFound } from 'next/navigation'

import { demoEntries, getDemoBySlug } from '@/lib/demos'
import { SignalStage } from '@/components/signal-stage'
import { withBasePath } from '@/lib/site'

export function generateStaticParams() {
  return demoEntries.map((demo) => ({ slug: demo.slug }))
}

function DemoPreview({ slug }: { slug: string }) {
  if (slug === 'signal-canvas') {
    return <SignalStage height={560} />
  }

  if (slug === 'pulse-lab') {
    return (
      <div className="iframe-shell">
        <iframe
          title="Pulse Lab"
          src={withBasePath('/embedded/pulse-lab/index.html')}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    )
  }

  return null
}

export default async function DemoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const demo = getDemoBySlug(slug)

  if (!demo) {
    notFound()
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="button-row">
          <Link href="/demos" className="button button-secondary">
            Back to demos
          </Link>
        </div>

        <div className="demo-detail-grid">
          <div className="demo-detail-copy">
            <div className="detail-meta">
              <span className="meta-pill">{demo.kind}</span>
              <span className="meta-pill">{demo.mode}</span>
              <span className="meta-pill">{demo.status}</span>
            </div>

            <h1>{demo.title}</h1>
            <p>{demo.summary}</p>

            <section className="detail-panel">
              <h3>Highlights</h3>
              <ul>
                {demo.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="detail-panel">
              <h3>Integration notes</h3>
              <ul>
                {demo.notes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="page-frame">
            <DemoPreview slug={slug} />
          </div>
        </div>
      </div>
    </main>
  )
}
