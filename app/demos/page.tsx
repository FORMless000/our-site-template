import Link from 'next/link'

import { DemoList } from '@/components/demo-list'
import { demoEntries } from '@/lib/demos'

export default function DemosPage() {
  return (
    <main className="page-main">
      <div className="container">
        <div className="page-intro">
          <span className="kicker">Demo index</span>
          <h1>Two integration patterns, one consistent site shell.</h1>
          <p>
            Use native components for experiments you want to deeply integrate, and iframe-backed
            routes for self-contained exports from older projects.
          </p>
          <div className="button-row">
            <Link href="/" className="button button-secondary">
              Back home
            </Link>
          </div>
        </div>

        <DemoList demos={demoEntries} />
      </div>
    </main>
  )
}
