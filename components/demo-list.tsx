import Link from 'next/link'

import type { DemoEntry } from '@/lib/demos'

export function DemoList({ demos }: { demos: DemoEntry[] }) {
  return (
    <div className="demo-list">
      {demos.map((demo) => (
        <article key={demo.slug} className="demo-card">
          <div className="demo-meta">
            <span className="meta-pill">{demo.kind}</span>
            <span className="meta-pill">{demo.mode}</span>
          </div>
          <h3>{demo.title}</h3>
          <p>{demo.summary}</p>
          <div className="button-row">
            <Link href={demo.route} className="button button-primary">
              Open demo
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
