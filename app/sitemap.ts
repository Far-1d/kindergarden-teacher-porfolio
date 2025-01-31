import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const Url = process.env.NEXT_PUBLIC_SITE_URL as string;
  return [
    {
      url: Url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}