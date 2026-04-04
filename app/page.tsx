import Link from 'next/link'

import { DemoList } from '@/components/demo-list'
import { SignalStage } from '@/components/signal-stage'
import { demoEntries } from '@/lib/demos'

export default function Home() {
  return (
    <main>
      <section id="main-content" className="hero-band">
        <div className="container hero-layout">
          <div className="hero-visual">
            <div className="stage-frame">
              <div className="eyebrow">Embedded live surface</div>
              <SignalStage height={430} />
            </div>
          </div>

          <div className="hero-copy">
            <span className="kicker">Interactive site starter</span>
            <h1>Build a showcase site that can host tools, visuals, and a popup AI guide.</h1>
            <p className="lead">
              Signal Studio is rebuilt from a smaller custom foundation. The homepage centers a
              native visual experiment, the chatbot lives in a floating launcher, and the gallery
              is ready for future web apps or exported interactive demos.
            </p>

            <div className="button-row">
              <Link href="/demos" className="button button-primary">
                Explore demos
              </Link>
              <a href="#approach" className="button button-secondary">
                Read the approach
              </a>
            </div>

            <div className="feature-strip">
              <div className="feature-tile">
                <strong>Popup chat</strong>
                <span>Floating interface instead of a full demo page.</span>
              </div>
              <div className="feature-tile">
                <strong>Static-ready</strong>
                <span>Local serving now, exportable for GitHub Pages later.</span>
              </div>
              <div className="feature-tile">
                <strong>Expandable</strong>
                <span>Swap in your own apps, prompts, models, or WebGL scenes.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="section">
        <div className="container section-grid">
          <div>
            <span className="kicker">Why this structure works</span>
            <h2>A homepage for impact, a gallery for depth, and a chat layer for guided exploration.</h2>
          </div>
          <div className="card-stack">
            <article className="info-card">
              <h3>Homepage visual block</h3>
              <p>
                The left-aligned visual embed gives you room to feature a native canvas or WebGL
                experience directly on the main screen without burying it behind extra navigation.
              </p>
            </article>
            <article className="info-card">
              <h3>Popup assistant</h3>
              <p>
                The fake assistant is local-only for now. Later, the adapter can switch to your own
                prompts and API keys without changing the overlay behavior.
              </p>
            </article>
            <article className="info-card">
              <h3>Demo expansion</h3>
              <p>
                Keep native demos inside the app, and mount older exported projects through
                sandboxed iframes when that is the safer integration path.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <span className="kicker">Current demos</span>
            <h2>Start with two patterns: one native, one embedded.</h2>
            <p>
              This gives you a clean baseline for the site while keeping room for more ambitious
              interactive work later.
            </p>
          </div>

          <DemoList demos={demoEntries} />
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-row">
          <div>
            <strong>Signal Studio</strong>
            <p>A clean-room showcase shell for interactive web projects.</p>
          </div>
          <div className="footer-links">
            <Link href="/demos">Demos</Link>
            <a href="#approach">Approach</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
