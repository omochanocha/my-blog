import { notFound } from 'next/navigation';

import { getDetail, getList } from '../../libs/microcms';
import PostDetail from '../components/PostDetail';

/**
 * この関数があるとstatic renderingになる
 * @returns は次のようになる
 * const paths = [
 *  {postId: "1"},
 *  {postId: "2"},
 *  {postId: "abc3"}
 * ]
 */
export const generateStaticParams = async (): Promise<
  {
    postId: string;
  }[]
> => {
  // generateStaticParams関数内でfetchリクエストでコンテンツを取得した場合はそのリクエストは自動的にメモ化される
  // 今回は違う
  const { contents } = await getList();

  const paths = contents.map((post) => {
    return {
      postId: post.id,
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
  // ここをparamsだけにするとpostIdは44行目のように取得することになる
  params: { postId },
}: {
  params: { postId: string };
}): Promise<React.JSX.Element> => {
  // const { postId } = params;
  const post = await getDetail(postId);

  if (post == null) {
    notFound();
  }

  return <PostDetail post={post} />;
};

export default Page;
