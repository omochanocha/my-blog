import Image from 'next/image';
import Link from 'next/link';

import { Blog } from '../../types/blog';

// import { getList } from '../../libs/microcms';

export const ArticleList: React.FC<{ contents: Blog[] }> = ({ contents }) => {
  if (contents == null || contents.length === 0) {
    return <p></p>;
  }

  return (
    <div className="grid items-center justify-items-center">
      <ul className="mx-auto grid max-w-5xl grid-cols-3 gap-x-4 gap-y-10">
        {contents.map((post) => {
          return (
            <li key={post.id} className="grid">
              <Link href={`/${post.id}`} className="">
                <div>
                  <Image
                    src={post.eyecatch?.url ?? 'https://placehold.jp/660x346.png'}
                    alt="アイキャッチ画像"
                    width={post.eyecatch?.width ?? 330}
                    height={post.eyecatch?.height ?? 173}
                    priority={true}
                  />
                </div>
                <p className="mt-2 text-slate-800">{post.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
