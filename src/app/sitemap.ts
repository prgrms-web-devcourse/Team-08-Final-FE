import { DEPLOYMENT_URL } from '@/constants/url';
import type { MetadataRoute } from 'next';

import { default as bookSitemap } from './book/sitemap';
import { default as bookshelfSitemap } from './bookshelf/sitemap';
import { default as bookGroupSitemap } from './group/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${DEPLOYMENT_URL}/bookarchive`,
      lastModified: new Date(),
    },
    {
      url: `${DEPLOYMENT_URL}/group`,
      lastModified: new Date(),
    },
    {
      url: `${DEPLOYMENT_URL}/profile/me`,
      lastModified: new Date(),
    },
    ...(await bookSitemap()),
    ...(await bookshelfSitemap()),
    ...(await bookGroupSitemap()),
  ];
}
