import { createClient } from 'microcms-js-sdk';

import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSListResponse,
  MicroCMSContentId,
} from 'microcms-js-sdk';

export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

//ブログの型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category?: Category;
} & MicroCMSDate;

if (process.env['MICROCMS_SERVICE_DOMAIN'] == null) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (process.env['MICROCMS_API_KEY'] == null) {
  throw new Error('MICROCMS_API_KEY is required');
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env['MICROCMS_SERVICE_DOMAIN'],
  apiKey: process.env['MICROCMS_API_KEY'],
});

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries): Promise<MicroCMSListResponse<Blog>> => {
  const listData = await client.getList<Blog>({
    endpoint: 'blogs',
    ...(queries && { queries }),
  });

  // データの取得が目視しやすいよう明示的に遅延効果を追加
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return listData;
};

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
): Promise<Blog & MicroCMSDate & MicroCMSContentId> => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId,
    ...(queries && { queries }),
  });

  // データの取得が目視しやすいよう明示的に遅延効果を追加
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return detailData;
};
