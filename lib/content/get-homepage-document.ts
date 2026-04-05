import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { parse } from 'smol-toml'

import type {
  ContentAlign,
  GraphicalGatewayCard,
  GraphicalGatewayGroupBlock,
  HomePageBlock,
  HomePageDocument,
  ImageAsset,
  LinkAction,
  LinkStyle,
  MediaSide,
  NativeProjectKey,
  OverlayGradient,
  ProjectDemoBlock,
  TextualGatewayCard,
  TextualGatewayGroupBlock,
  TitleDisplayBlock,
} from '@/lib/content/homepage-document'

const homepagePath = path.join(process.cwd(), 'content', 'homepage.toml')

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function expectObject(value: unknown, pathLabel: string) {
  if (!isObject(value)) {
    throw new Error(`${pathLabel} must be a TOML table`)
  }

  return value
}

function expectString(value: unknown, pathLabel: string) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${pathLabel} must be a non-empty string`)
  }

  return value.trim()
}

function optionalString(value: unknown, pathLabel: string) {
  if (value === undefined) {
    return undefined
  }

  return expectString(value, pathLabel)
}

function optionalLooseString(value: unknown, pathLabel: string) {
  if (value === undefined) {
    return undefined
  }

  if (typeof value !== 'string') {
    throw new Error(`${pathLabel} must be a string`)
  }

  return value
}

function expectArray(value: unknown, pathLabel: string) {
  if (!Array.isArray(value)) {
    throw new Error(`${pathLabel} must be an array`)
  }

  return value
}

function optionalLinkStyle(value: unknown, pathLabel: string): LinkStyle {
  if (value === undefined) {
    return 'primary'
  }

  if (value === 'primary' || value === 'secondary') {
    return value
  }

  throw new Error(`${pathLabel} must be "primary" or "secondary"`)
}

function optionalMediaSide(value: unknown, pathLabel: string): MediaSide {
  if (value === undefined) {
    return 'left'
  }

  if (value === 'left' || value === 'right') {
    return value
  }

  throw new Error(`${pathLabel} must be "left" or "right"`)
}

function optionalContentAlign(value: unknown, pathLabel: string): ContentAlign {
  if (value === undefined) {
    return 'center'
  }

  if (value === 'left' || value === 'center' || value === 'right') {
    return value
  }

  throw new Error(`${pathLabel} must be "left", "center", or "right"`)
}

function expectNumber(value: unknown, pathLabel: string) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`${pathLabel} must be a number`)
  }

  return value
}

function expectPositiveInteger(value: unknown, pathLabel: string) {
  const number = expectNumber(value, pathLabel)

  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`${pathLabel} must be a positive integer`)
  }

  return number
}

function expectOpacity(value: unknown, pathLabel: string) {
  const number = expectNumber(value, pathLabel)

  if (number < 0 || number > 1) {
    throw new Error(`${pathLabel} must be between 0 and 1`)
  }

  return number
}

function expectPercent(value: unknown, pathLabel: string) {
  const number = expectNumber(value, pathLabel)

  if (number < 0 || number > 100) {
    throw new Error(`${pathLabel} must be between 0 and 100`)
  }

  return number
}

function expectAspectRatio(value: unknown, pathLabel: string) {
  const ratio = expectString(value, pathLabel)
  const match = ratio.match(/^(\d+)\s*:\s*(\d+)$/)

  if (!match) {
    throw new Error(`${pathLabel} must look like "4:3" or "16:9"`)
  }

  const width = Number(match[1])
  const height = Number(match[2])

  if (width < 1 || height < 1) {
    throw new Error(`${pathLabel} must contain positive values`)
  }

  return `${width} / ${height}`
}

function expectHref(value: unknown, pathLabel: string) {
  const href = expectString(value, pathLabel)

  if (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href
  }

  throw new Error(`${pathLabel} must start with "/", "#", "http://", "https://", "mailto:", or "tel:"`)
}

function normalizeImageAsset(value: unknown, pathLabel: string, requireAlt: boolean) {
  const record = expectObject(value, pathLabel)
  const src = expectHref(record.src, `${pathLabel}.src`)
  const decorative = record.decorative === undefined ? true : Boolean(record.decorative)
  const altValue = optionalLooseString(record.alt, `${pathLabel}.alt`) ?? ''
  const alt = decorative ? altValue || '' : altValue

  if (requireAlt && !alt) {
    throw new Error(`${pathLabel}.alt must be set when the image carries content`)
  }

  if (!decorative && !alt) {
    throw new Error(`${pathLabel}.alt must be set when decorative is false`)
  }

  const image: ImageAsset = {
    src,
    alt,
    decorative,
  }

  return image
}

function normalizeOverlayGradient(value: unknown, pathLabel: string, fallback: OverlayGradient) {
  if (value === undefined) {
    return fallback
  }

  const record = expectObject(value, pathLabel)

  return {
    topOpacity:
      record.top_opacity === undefined ? fallback.topOpacity : expectOpacity(record.top_opacity, `${pathLabel}.top_opacity`),
    midOpacity:
      record.mid_opacity === undefined ? fallback.midOpacity : expectOpacity(record.mid_opacity, `${pathLabel}.mid_opacity`),
    bottomOpacity:
      record.bottom_opacity === undefined
        ? fallback.bottomOpacity
        : expectOpacity(record.bottom_opacity, `${pathLabel}.bottom_opacity`),
    topStop: record.top_stop === undefined ? fallback.topStop : expectPercent(record.top_stop, `${pathLabel}.top_stop`),
    midStop: record.mid_stop === undefined ? fallback.midStop : expectPercent(record.mid_stop, `${pathLabel}.mid_stop`),
    bottomStop:
      record.bottom_stop === undefined
        ? fallback.bottomStop
        : expectPercent(record.bottom_stop, `${pathLabel}.bottom_stop`),
  }
}

function normalizeUnderlayVisual(value: unknown, pathLabel: string, fallbackOverlay: OverlayGradient) {
  const record = expectObject(value, pathLabel)

  return {
    image: normalizeImageAsset(record, pathLabel, false),
    overlay: normalizeOverlayGradient(record.overlay, `${pathLabel}.overlay`, fallbackOverlay),
  }
}

function normalizeGatewayGridLayout(value: unknown, pathLabel: string) {
  const record = value === undefined ? {} : expectObject(value, pathLabel)

  return {
    desktopColumns:
      record.desktop_columns === undefined ? 3 : expectPositiveInteger(record.desktop_columns, `${pathLabel}.desktop_columns`),
    tabletColumns:
      record.tablet_columns === undefined ? 2 : expectPositiveInteger(record.tablet_columns, `${pathLabel}.tablet_columns`),
    mobileColumns:
      record.mobile_columns === undefined ? 1 : expectPositiveInteger(record.mobile_columns, `${pathLabel}.mobile_columns`),
    aspectRatio:
      record.aspect_ratio === undefined ? '4 / 3' : expectAspectRatio(record.aspect_ratio, `${pathLabel}.aspect_ratio`),
  }
}

function normalizeAction(value: unknown, pathLabel: string): LinkAction {
  const record = expectObject(value, pathLabel)

  return {
    label: expectString(record.label, `${pathLabel}.label`),
    href: expectHref(record.href, `${pathLabel}.href`),
    style: optionalLinkStyle(record.style, `${pathLabel}.style`),
  }
}

function normalizeTitleDisplayBlock(value: unknown, index: number): TitleDisplayBlock {
  const pathLabel = `blocks[${index}]`
  const record = expectObject(value, pathLabel)
  const fallbackOverlay = {
    topOpacity: 0.5,
    midOpacity: 0.24,
    bottomOpacity: 0,
    topStop: 0,
    midStop: 52,
    bottomStop: 100,
  }

  return {
    type: 'title_display',
    id: expectString(record.id, `${pathLabel}.id`),
    kicker: optionalString(record.kicker, `${pathLabel}.kicker`),
    title: expectString(record.title, `${pathLabel}.title`),
    subtitle: optionalString(record.subtitle, `${pathLabel}.subtitle`),
    body: optionalString(record.body, `${pathLabel}.body`),
    contentAlign: optionalContentAlign(record.content_align, `${pathLabel}.content_align`),
    imageUnderlay:
      record.image_underlay === undefined
        ? undefined
        : normalizeUnderlayVisual(record.image_underlay, `${pathLabel}.image_underlay`, fallbackOverlay),
    actions:
      record.actions === undefined
        ? []
        : expectArray(record.actions, `${pathLabel}.actions`).map((entry, actionIndex) =>
            normalizeAction(entry, `${pathLabel}.actions[${actionIndex}]`),
          ),
  }
}

function normalizeProjectDemoBlock(value: unknown, index: number): ProjectDemoBlock {
  const pathLabel = `blocks[${index}]`
  const record = expectObject(value, pathLabel)
  const projectKind = expectString(record.project_kind, `${pathLabel}.project_kind`)

  let project: ProjectDemoBlock['project']

  if (projectKind === 'native') {
    const projectKey = expectString(record.project_key, `${pathLabel}.project_key`)

    if (projectKey !== 'signal_canvas' && projectKey !== 'counter') {
      throw new Error(`${pathLabel}.project_key must currently be "signal_canvas" or "counter"`)
    }

    project = {
      projectKind: 'native',
      projectKey: projectKey as NativeProjectKey,
    }
  } else if (projectKind === 'iframe') {
    project = {
      projectKind: 'iframe',
      src: expectHref(record.src, `${pathLabel}.src`),
      iframeTitle: optionalString(record.iframe_title, `${pathLabel}.iframe_title`) ?? expectString(record.title, `${pathLabel}.title`),
    }
  } else {
    throw new Error(`${pathLabel}.project_kind must be "native" or "iframe"`)
  }

  return {
    type: 'project_demo',
    id: expectString(record.id, `${pathLabel}.id`),
    kicker: optionalString(record.kicker, `${pathLabel}.kicker`),
    title: expectString(record.title, `${pathLabel}.title`),
    body: expectString(record.body, `${pathLabel}.body`),
    mediaSide: optionalMediaSide(record.media_side, `${pathLabel}.media_side`),
    project,
    goToLabel: optionalString(record.go_to_label, `${pathLabel}.go_to_label`) ?? 'Learn More',
    goToHref: expectHref(record.go_to_href, `${pathLabel}.go_to_href`),
  }
}

function normalizeTextualGatewayCard(value: unknown, pathLabel: string): TextualGatewayCard {
  const record = expectObject(value, pathLabel)
  const fallbackOverlay = {
    topOpacity: 0.1,
    midOpacity: 0.15,
    bottomOpacity: 0,
    topStop: 0,
    midStop: 50,
    bottomStop: 100,
  }

  return {
    eyebrow: optionalString(record.eyebrow, `${pathLabel}.eyebrow`),
    title: expectString(record.title, `${pathLabel}.title`),
    body: expectString(record.body, `${pathLabel}.body`),
    href: expectHref(record.href, `${pathLabel}.href`),
    imageUnderlay:
      record.image_underlay === undefined
        ? undefined
        : normalizeUnderlayVisual(record.image_underlay, `${pathLabel}.image_underlay`, fallbackOverlay),
  }
}

function normalizeTextualGatewayGroupBlock(value: unknown, index: number): TextualGatewayGroupBlock {
  const pathLabel = `blocks[${index}]`
  const record = expectObject(value, pathLabel)
  const cards = expectArray(record.cards, `${pathLabel}.cards`)

  if (cards.length === 0) {
    throw new Error(`${pathLabel}.cards must contain at least one card`)
  }

  return {
    type: 'textual_gateway_group',
    id: expectString(record.id, `${pathLabel}.id`),
    kicker: optionalString(record.kicker, `${pathLabel}.kicker`),
    title: expectString(record.title, `${pathLabel}.title`),
    layout: normalizeGatewayGridLayout(record.layout, `${pathLabel}.layout`),
    cards: cards.map((entry, cardIndex) => normalizeTextualGatewayCard(entry, `${pathLabel}.cards[${cardIndex}]`)),
  }
}

function normalizeGraphicalGatewayCard(value: unknown, pathLabel: string): GraphicalGatewayCard {
  const record = expectObject(value, pathLabel)
  const imageAlt = optionalLooseString(record.image_alt, `${pathLabel}.image_alt`) ?? ''
  const ariaLabel = optionalLooseString(record.aria_label, `${pathLabel}.aria_label`) ?? ''

  if (!imageAlt && !ariaLabel) {
    throw new Error(`${pathLabel} requires image_alt or aria_label`)
  }

  return {
    image: {
      src: expectHref(record.image_src, `${pathLabel}.image_src`),
      alt: imageAlt,
      decorative: false,
    },
    href: expectHref(record.href, `${pathLabel}.href`),
    ariaLabel: ariaLabel || imageAlt,
  }
}

function normalizeGraphicalGatewayGroupBlock(value: unknown, index: number): GraphicalGatewayGroupBlock {
  const pathLabel = `blocks[${index}]`
  const record = expectObject(value, pathLabel)
  const cards = expectArray(record.cards, `${pathLabel}.cards`)

  if (cards.length === 0) {
    throw new Error(`${pathLabel}.cards must contain at least one card`)
  }

  return {
    type: 'graphical_gateway_group',
    id: expectString(record.id, `${pathLabel}.id`),
    kicker: optionalString(record.kicker, `${pathLabel}.kicker`),
    title: expectString(record.title, `${pathLabel}.title`),
    layout: normalizeGatewayGridLayout(record.layout, `${pathLabel}.layout`),
    cards: cards.map((entry, cardIndex) => normalizeGraphicalGatewayCard(entry, `${pathLabel}.cards[${cardIndex}]`)),
  }
}

function normalizeBlock(value: unknown, index: number): HomePageBlock {
  const record = expectObject(value, `blocks[${index}]`)
  const type = expectString(record.type, `blocks[${index}].type`)

  switch (type) {
    case 'title_display':
      return normalizeTitleDisplayBlock(record, index)
    case 'project_demo':
      return normalizeProjectDemoBlock(record, index)
    case 'textual_gateway_group':
      return normalizeTextualGatewayGroupBlock(record, index)
    case 'graphical_gateway_group':
      return normalizeGraphicalGatewayGroupBlock(record, index)
    default:
      throw new Error(`blocks[${index}].type "${type}" is not supported`)
  }
}

function normalizeHomePageDocument(value: unknown): HomePageDocument {
  const record = expectObject(value, 'homepage')
  const blocks = expectArray(record.blocks, 'blocks')

  if (blocks.length === 0) {
    throw new Error('blocks must contain at least one block')
  }

  return {
    title: expectString(record.title, 'title'),
    blocks: blocks.map((entry, index) => normalizeBlock(entry, index)),
  }
}

export async function getHomePageDocument(): Promise<HomePageDocument> {
  const source = await readFile(homepagePath, 'utf8')

  try {
    const parsed = parse(source)
    return normalizeHomePageDocument(parsed)
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Unknown TOML parsing error'
    throw new Error(`Failed to load content/homepage.toml: ${detail}`)
  }
}
