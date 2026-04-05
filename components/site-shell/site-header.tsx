import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link href="/" className="brand-lockup">
          <span className="brand-mark">SS</span>
          <span className="brand-copy">
            <strong>Signal Studio</strong>
            <span>Interactive previews, popup chat, and export-ready hosting</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
        </nav>
      </div>
    </header>
  )
}
