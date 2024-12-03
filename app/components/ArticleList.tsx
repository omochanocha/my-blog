import Image from 'next/image';
import Link from 'next/link';

// import { getList } from '../../libs/microcms';
import { getListTS } from '../../libs/microcms-ts';

export const ArticleList = async (): Promise<JSX.Element> => {
  const { contents } = await getListTS();

  if (contents == null || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div className="grid justify-items-center">
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
                  />
                </div>
                <p className="text-slate-800 mt-2">{post.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
