export function isExternalHref(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isHashHref(path: string) {
  return path.startsWith('#')
}

export function withBasePath(path: string) {
  if (!path || isExternalHref(path) || isHashHref(path)) {
    return path
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${basePath}${normalizedPath}`
}
