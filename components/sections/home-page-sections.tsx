import { GraphicalGatewayGroupBlock } from '@/components/blocks/graphical-gateway-group-block'
import { ProjectDemoBlock } from '@/components/blocks/project-demo-block'
import { TextualGatewayGroupBlock } from '@/components/blocks/textual-gateway-group-block'
import { TitleDisplayBlock } from '@/components/blocks/title-display-block'
import type { HomePageDocument } from '@/lib/content/homepage-document'

export function HomePageSections({ document }: { document: HomePageDocument }) {
  return document.blocks.map((block) => {
    switch (block.type) {
      case 'title_display':
        return <TitleDisplayBlock key={block.id} block={block} />
      case 'project_demo':
        return <ProjectDemoBlock key={block.id} block={block} />
      case 'textual_gateway_group':
        return <TextualGatewayGroupBlock key={block.id} block={block} />
      case 'graphical_gateway_group':
        return <GraphicalGatewayGroupBlock key={block.id} block={block} />
      default:
        return null
    }
  })
}
