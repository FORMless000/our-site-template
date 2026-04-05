export type LinkStyle = 'primary' | 'secondary'
export type HomePageBlockType =
  | 'title_display'
  | 'project_demo'
  | 'textual_gateway_group'
  | 'graphical_gateway_group'
export type ProjectKind = 'native' | 'iframe'
export type MediaSide = 'left' | 'right'
export type NativeProjectKey = 'signal_canvas' | 'counter'
export type ContentAlign = 'left' | 'center' | 'right'

export type OverlayGradient = {
  topOpacity: number
  midOpacity: number
  bottomOpacity: number
  topStop: number
  midStop: number
  bottomStop: number
}

export type LinkAction = {
  label: string
  href: string
  style: LinkStyle
}

export type ImageAsset = {
  src: string
  alt: string
  decorative: boolean
}

export type UnderlayVisual = {
  image: ImageAsset
  overlay: OverlayGradient
}

export type GatewayGridLayout = {
  desktopColumns: number
  tabletColumns: number
  mobileColumns: number
  aspectRatio: string
}

export type TitleDisplayBlock = {
  type: 'title_display'
  id: string
  kicker?: string
  title: string
  subtitle?: string
  body?: string
  contentAlign: ContentAlign
  imageUnderlay?: UnderlayVisual
  actions: LinkAction[]
}

export type NativeProjectReference = {
  projectKind: 'native'
  projectKey: NativeProjectKey
}

export type IframeProjectReference = {
  projectKind: 'iframe'
  src: string
  iframeTitle: string
}

export type ProjectReference = NativeProjectReference | IframeProjectReference

export type ProjectDemoBlock = {
  type: 'project_demo'
  id: string
  kicker?: string
  title: string
  body: string
  mediaSide: MediaSide
  project: ProjectReference
  goToLabel: string
  goToHref: string
}

export type TextualGatewayCard = {
  eyebrow?: string
  title: string
  body: string
  href: string
  imageUnderlay?: UnderlayVisual
}

export type TextualGatewayGroupBlock = {
  type: 'textual_gateway_group'
  id: string
  kicker?: string
  title: string
  layout: GatewayGridLayout
  cards: TextualGatewayCard[]
}

export type GraphicalGatewayCard = {
  image: ImageAsset
  href: string
  ariaLabel: string
}

export type GraphicalGatewayGroupBlock = {
  type: 'graphical_gateway_group'
  id: string
  kicker?: string
  title: string
  layout: GatewayGridLayout
  cards: GraphicalGatewayCard[]
}

export type HomePageBlock =
  | TitleDisplayBlock
  | ProjectDemoBlock
  | TextualGatewayGroupBlock
  | GraphicalGatewayGroupBlock

export type HomePageDocument = {
  title: string
  blocks: HomePageBlock[]
}
