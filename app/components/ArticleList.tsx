import Link from 'next/link';

import { CategoryList } from './CategoryList';
import { LeadingText } from './LeadingText';
import { type Blog } from '../../types/blog';

const options = {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
} as const;

const formatter = new Intl.DateTimeFormat('ja-JP', options);

export const ArticleList: React.FC<{ contents: Blog[] }> = ({ contents }) => {
  if (contents == null || contents.length === 0) return;

  return (
    <div className="mt-8">
      <ul className="mx-auto grid max-w-5xl gap-x-4 gap-y-10">
        {contents.map((post) => {
          return (
            <li key={post.id} className="grid gap-y-2 overflow-hidden">
              <Link href={`/${post.id}`} className="mr-auto hover:underline">
                <h2 className="text-lg font-bold">{post.title}</h2>
              </Link>
              {post.categories != null && post.categories.length > 0 && (
                <CategoryList categories={post.categories} />
              )}
              <LeadingText content={post.content} />
              <div className="flex gap-x-2">
                <p className="text-xs text-gray-500">
                  公開日 : {formatter.format(new Date(post.publishedAt ?? post.createdAt))}
                </p>
                <p className="text-xs text-gray-500">
                  更新日 : {formatter.format(new Date(post.updatedAt))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
