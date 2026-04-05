import { CounterDemo } from '@/components/primitives/counter-demo'
import { SignalStage } from '@/components/primitives/signal-stage'
import type { ProjectReference } from '@/lib/content/homepage-document'
import { withBasePath } from '@/lib/site'

type ProjectSurfaceProps = {
  project: ProjectReference
  expanded?: boolean
}

export function ProjectSurface({ project, expanded = false }: ProjectSurfaceProps) {
  if (project.projectKind === 'native') {
    switch (project.projectKey) {
      case 'signal_canvas':
        return <SignalStage height={expanded ? 620 : 420} />
      case 'counter':
        return <CounterDemo expanded={expanded} />
      default:
        return null
    }
  }

  return (
    <div className="iframe-shell">
      <iframe
        title={project.iframeTitle}
        src={withBasePath(project.src)}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
