import type { CSSProperties } from 'react'

import type { UnderlayVisual as UnderlayVisualType } from '@/lib/content/homepage-document'
import { withBasePath } from '@/lib/site'

type UnderlayVisualProps = {
  visual: UnderlayVisualType
  className: string
  surface: 'section' | 'panel'
}

export function UnderlayVisual({ visual, className, surface }: UnderlayVisualProps) {
  const style = {
    '--underlay-top-alpha': visual.overlay.topOpacity,
    '--underlay-mid-alpha': visual.overlay.midOpacity,
    '--underlay-bottom-alpha': visual.overlay.bottomOpacity,
    '--underlay-top-stop': `${visual.overlay.topStop}%`,
    '--underlay-mid-stop': `${visual.overlay.midStop}%`,
    '--underlay-bottom-stop': `${visual.overlay.bottomStop}%`,
  } as CSSProperties

  return (
    <div className={`${className} underlay-surface-${surface}`} style={style} aria-hidden={visual.image.decorative}>
      <img src={withBasePath(visual.image.src)} alt={visual.image.decorative ? '' : visual.image.alt} />
    </div>
  )
}
