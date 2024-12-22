import { notFound } from 'next/navigation';

import { getList, getListCategories } from '../../../libs/microcms-ts';
import { ArticleList } from '../../components/ArticleList';

// キャッシュを利用しない(SSR)、> 1でstatic renderingになる
// export const revalidate = 0;

/**
 * この関数で動的ルーティング時のパスとなる文字列を生成している
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

type Props = {
  params: { categoryId: string };
};

/**
 *
 * @param paramsにはgenerateStaticParams関数が返すpaths配列の中のこのページのpostIdが入る
 * @returns JSX
 */
const Page: React.FC<Props> = async ({
  // ここをparamsだけにするとcategoryIdは44行目のように取得することになる
  params: { categoryId },
}) => {
  // const { categoryId } = params;
  const { contents } = await getList({ filters: `categories[contains]${categoryId}` });

  if (contents == null || contents.length === 0) {
    notFound();
  }

  return <ArticleList contents={contents} />;
};

export default Page;
