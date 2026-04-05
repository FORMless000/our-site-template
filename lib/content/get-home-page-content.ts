import { defaultHomePageContent, type HomePageContent } from '@/lib/content/home-page'
import { getBuilderHomePageContent } from '@/lib/integrations/builder/home-page'

export async function getHomePageContent(): Promise<HomePageContent> {
  const builderContent = await getBuilderHomePageContent()

  if (!builderContent) {
    return defaultHomePageContent
  }

  return builderContent
}
