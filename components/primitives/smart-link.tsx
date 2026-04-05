import Link from 'next/link'
import type { ReactNode } from 'react'

import { isExternalHref, isHashHref } from '@/lib/site'

type SmartLinkProps = {
  href: string
  className?: string
  children: ReactNode
  ariaLabel?: string
  target?: string
  rel?: string
}

export function SmartLink({ href, className, children, ariaLabel, target, rel }: SmartLinkProps) {
  if (isHashHref(href) || isExternalHref(href)) {
    return (
      <a href={href} className={className} aria-label={ariaLabel} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
