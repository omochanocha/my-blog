import { useMemo } from 'react';

import styles from '../page.module.css';
import { CategoryList } from './CategoryList';
import { ParseAndHighlight } from './ParseAndHighlight';

import type { Blog } from '../../types/blog';

type Props = {
  post: Blog;
};

const options = {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
} as const;

const formatter = new Intl.DateTimeFormat('ja-JP', options);

export const ArticleDetail: React.FC<Props> = ({ post }) => {
  const utcDate_publishedAt = useMemo(
    () => new Date(post.publishedAt ?? post.createdAt),
    [post.createdAt, post.publishedAt],
  );
  const utcDate_updatedAt = useMemo(() => new Date(post.updatedAt), [post.updatedAt]);

  return (
    <article className="mx-auto w-full max-w-5xl">
      <h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>
      <div className="mt-8 flex gap-x-3 text-gray-500">
        <p>{formatter.format(utcDate_publishedAt)}</p>
        <p>更新：{formatter.format(utcDate_updatedAt)}</p>
      </div>
      {post.categories != null && post.categories.length > 0 && (
        <div className="mt-3">
          <CategoryList categories={post.categories} />
        </div>
      )}
      <div className={`${styles['prose']} mt-14`}>{ParseAndHighlight(post.content)}</div>
    </article>
  );
};
