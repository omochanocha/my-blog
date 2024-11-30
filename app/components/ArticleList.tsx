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
      <ul className="mx-auto max-w-4xl">
        {contents.map((post) => {
          return (
            <li key={post.id} className="grid w-96 overflow-hidden rounded-lg bg-white drop-shadow">
              <Link href={`/${post.id}`} className="">
                <Image
                  src={post.eyecatch?.url ?? ''}
                  alt="アイキャッチ画像"
                  width={post.eyecatch?.width}
                  height={post.eyecatch?.height}
                />
                <p className="text-slate-800">{post.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
