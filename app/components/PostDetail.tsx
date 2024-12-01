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

const PostDetail: React.FC<Props> = ({ post }) => {
  const utcDate_createdAt = new Date(post.createdAt);
  const utcDate_updatedAt = new Date(post.updatedAt);

  return (
    <div className="mx-auto max-w-5xl text-slate-800 w-full mt-12">
      <h2 className="text-3xl">{post.title}</h2>
      <div className="flex">
        <h3>作成日：{formatter.format(utcDate_createdAt)}</h3>
        <h3>更新日：{formatter.format(utcDate_updatedAt)}</h3>
      </div>
      {post.category && <p>カテゴリー：{post.category.name}</p>}
      <div className={styles['prose']}>{parse(post.content)}</div>
    </div>
  );
};

export default PostDetail;
