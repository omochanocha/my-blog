import Link from 'next/link';

import { LeadingText } from './LeadingText';
import { Blog } from '../../types/blog';

const options = {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
} as const;

const formatter = new Intl.DateTimeFormat('ja-JP', options);

export const ArticleList: React.FC<{ contents: Blog[] }> = ({ contents }) => {
  if (contents == null || contents.length === 0) {
    return <p></p>;
  }

  return (
    <div className="mt-8">
      <ul className="mx-auto grid max-w-5xl gap-x-4 gap-y-10">
        {contents.map((post) => {
          return (
            <li key={post.id} className="grid gap-y-2 overflow-hidden">
              <Link href={`/${post.id}`} className="mr-auto hover:underline">
                <h2 className="text-lg font-bold">{post.title}</h2>
              </Link>
              {post.categories && post.categories.length > 0 && (
                <ul className="flex items-center gap-x-4">
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
              <LeadingText content={post.content} />
              <div className="flex gap-x-2">
                <p className="text-xs text-gray-500">
                  公開日 : {formatter.format(new Date(post.createdAt))}
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
