import React from 'react';

// import parse from 'html-react-parser';

import Link from 'next/link';

import styles from '../page.module.css';
import ParseAndHighlight from './ParseAndHighlight';

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
    <article className="mx-auto w-full max-w-5xl grow text-zinc-800">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-16 flex gap-x-3 text-gray-500">
        <p>{formatter.format(utcDate_createdAt)}</p>
        <p>更新：{formatter.format(utcDate_updatedAt)}</p>
      </div>
      {/* {post.category && (
        <div className="mt-3 flex items-center">
          <p className="rounded border border-slate-600 px-2 py-1 text-sm">{post.category.name}</p>
        </div>
      )} */}
      {post.categories && (
        <ul className="mt-3 flex items-center gap-x-4">
          {post.categories.map((category) => {
            return (
              <li key={category.id}>
                <Link href={`/categories/${category.id}`}>
                  <div>
                    <p className="rounded border border-slate-600 px-2 py-1 text-sm">
                      {category.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {/* <div className={`${styles['prose']} mt-20`}>{parse(post.content)}</div> */}
      <div className={`${styles['prose']} mt-20`}>{ParseAndHighlight(post.content)}</div>
    </article>
  );
};
