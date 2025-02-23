import Image from 'next/image';
import Link from 'next/link';

import { Blog } from '../../types/blog';

export const ArticleList: React.FC<{ contents: Blog[] }> = ({ contents }) => {
  if (contents == null || contents.length === 0) {
    return <p></p>;
  }

  return (
    <div className="mt-8">
      <ul className="mx-auto grid max-w-5xl gap-x-4 gap-y-10 md:grid-cols-[repeat(auto-fit,minmax(224px,1fr))]">
        {contents.map((post) => {
          return (
            <li key={post.id} className="grid">
              <Link
                href={`/${post.id}`}
                className="flex items-start gap-x-3 md:flex-col md:gap-y-2"
              >
                <div>
                  <Image
                    src={post.eyecatch?.url ?? 'https://placehold.jp/660x346.png'}
                    alt="アイキャッチ画像"
                    width={post.eyecatch?.width ?? 330}
                    height={post.eyecatch?.height ?? 173}
                    priority={true}
                  />
                </div>
                <p className="text-slate-800">{post.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
