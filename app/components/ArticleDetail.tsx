import React from 'react';

import parse from 'html-react-parser';

import styles from '../page.module.css';

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
  const utcDate_createdAt = new Date(post.createdAt);
  const utcDate_updatedAt = new Date(post.updatedAt);

  return (
    <article className="mx-auto w-full max-w-5xl grow py-12 text-zinc-800">
      <h2 className="text-3xl font-bold">{post.title}</h2>
      <div className="mt-16 flex gap-x-3 text-gray-500">
        <h3>{formatter.format(utcDate_createdAt)}</h3>
        <h3>更新：{formatter.format(utcDate_updatedAt)}</h3>
      </div>
      {post.category && <p className="mt-3">{post.category.name}</p>}
      <div className={`${styles['prose']} mt-20`}>{parse(post.content)}</div>
    </article>
  );
};
