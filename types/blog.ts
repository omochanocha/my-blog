import type { MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

export type Category = {
  id: string;
  name: string;
};

//ブログの型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  categories?: Category[];
} & MicroCMSDate;
