import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getList, getListCategories } from '../../../libs/microcms-ts';

/**
 * この関数があるとstatic renderingになる
 * @returns は次のようになる
 * const paths = [
 *  {categoryId: "1"},
 *  {categoryId: "2"},
 *  {categoryId: "abc3"}
 * ]
 */
export const generateStaticParams = async (): Promise<
  {
    categoryId: string;
  }[]
> => {
  // generateStaticParams関数内でfetchリクエストでコンテンツを取得した場合はそのリクエストは自動的にメモ化される
  // 今回は違う
  const { contents } = await getListCategories();

  const paths = contents.map((category) => {
    return {
      categoryId: category.id,
    };
  });

  return [...paths];
};

/**
 *
 * @param paramsにはgenerateStaticParams関数が返すpaths配列の中のこのページのpostIdが入る
 * @returns JSXElement
 */
const Page = async ({
  // ここをparamsだけにするとcategoryIdは44行目のように取得することになる
  params: { categoryId },
}: {
  params: { categoryId: string };
}): Promise<React.JSX.Element> => {
  // const { categoryId } = params;
  const { contents } = await getList({ filters: `categories[contains]${categoryId}` });

  if (contents == null || contents.length === 0) {
    notFound();
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

export default Page;
