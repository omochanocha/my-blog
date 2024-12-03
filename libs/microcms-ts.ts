import { createClient } from 'microcms-ts-sdk';

import type { Category } from '../types/blog';
import type { MicroCMSImage, MicroCMSQueries } from 'microcms-js-sdk';

if (process.env['MICROCMS_SERVICE_DOMAIN'] == null) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (process.env['MICROCMS_API_KEY'] == null) {
  throw new Error('MICROCMS_API_KEY is required');
}

type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category?: Category;
};

interface Endpoints {
  list: {
    blogs: Blog;
  };
}

const client = createClient<Endpoints>({
  serviceDomain: process.env['MICROCMS_SERVICE_DOMAIN'],
  apiKey: process.env['MICROCMS_API_KEY'],
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getListTS = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList({ endpoint: 'blogs', ...queries });
  return listData;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDetailTS = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailDate = await client.getListDetail({ endpoint: 'blogs', contentId, ...queries });
  return detailDate;
};
