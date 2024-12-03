import { createClient } from 'microcms-ts-sdk';

import type { Category } from '../types/blog';
import type { MicroCMSImage, MicroCMSQueries } from 'microcms-js-sdk';

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
  serviceDomain: process.env['MICROCMS_SERVICE_DOMAIN'] as string,
  apiKey: process.env['MICROCMS_API_KEY'] as string,
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
