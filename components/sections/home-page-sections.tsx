import { HomeApproachSection } from '@/components/sections/home-approach-section'
import { HomeDemosSection } from '@/components/sections/home-demos-section'
import { HomeHeroSection } from '@/components/sections/home-hero-section'
import type { HomePageContent } from '@/lib/content/home-page'

export function HomePageSections({ content }: { content: HomePageContent }) {
  return (
    <>
      <HomeHeroSection content={content.hero} />
      <HomeApproachSection content={content.approach} />
      <HomeDemosSection content={content.demos} />
    </>
  )
}
