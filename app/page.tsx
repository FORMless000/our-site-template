import { HomePageSections } from '@/components/sections/home-page-sections'
import { getHomePageContent } from '@/lib/content/get-home-page-content'

export default async function Home() {
  const content = await getHomePageContent()

  return (
    <main>
      <HomePageSections content={content} />
    </main>
  )
}
