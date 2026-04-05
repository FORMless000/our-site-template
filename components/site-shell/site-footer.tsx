import Link from 'next/link'

export function SiteFooter() {
  return (
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
  )
}
