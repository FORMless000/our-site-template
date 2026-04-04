/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === '1'
const rawBasePath = process.env.BASE_PATH || ''
const normalizedBasePath =
  rawBasePath && rawBasePath !== '/'
    ? rawBasePath.startsWith('/')
      ? rawBasePath
      : `/${rawBasePath}`
    : ''

const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: normalizedBasePath || undefined,
  assetPrefix: isStaticExport && normalizedBasePath ? normalizedBasePath : undefined,
  trailingSlash: isStaticExport,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: normalizedBasePath,
  },
}

export default nextConfig
