import { HomePageSections } from '@/components/sections/home-page-sections'
import { getHomePageDocument } from '@/lib/content/get-homepage-document'

export default async function Home() {
  const document = await getHomePageDocument()

  return (
    <main>
      <HomePageSections document={document} />
    </main>
  )
}
