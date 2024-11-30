import Image from 'next/image';
import Link from 'next/link';

import { getList } from '../../libs/microcms';

export const ArticleList = async (): Promise<JSX.Element> => {
  const { contents } = await getList();

  if (contents == null || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div className="mt-8 grid justify-items-center">
      <ul className="mx-auto flex max-w-4xl gap-4">
        {contents.map((post) => {
          return (
            <li
              key={post.id}
              className="grid w-96 overflow-hidden rounded-lg bg-white drop-shadow-lg"
            >
              <Link href={`/${post.id}`} className="">
                <div>
                  <Image
                    src={post.eyecatch?.url ?? 'https://placehold.jp/1200x630.png'}
                    alt="アイキャッチ画像"
                    width={post.eyecatch?.width ?? 1200}
                    height={post.eyecatch?.height ?? 630}
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
