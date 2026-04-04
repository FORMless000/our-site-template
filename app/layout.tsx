import type React from 'react'
import type { Metadata } from 'next'

import { ChatWidget } from '@/components/chat-widget'
import { SiteHeader } from '@/components/site-header'

import './globals.css'

export const metadata: Metadata = {
  title: 'Signal Studio',
  description:
    'A clean-room Next.js showcase for interactive web projects with popup chat and static-ready hosting.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <ChatWidget />
        </div>
      </body>
    </html>
  )
}
