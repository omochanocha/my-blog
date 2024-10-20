import parse from 'html-react-parser';
import { notFound } from 'next/navigation';

import { getDetail, getList } from '../../../libs/microcms';

/**
 * この関数があるとstatic renderingになる
 * @returns 返り値は次のようになる
 * const paths = [
 *  {postId: "1"},
 *  {postId: "2"},
 *  {postId: "abc3"}
 * ]
 */
export async function generateStaticParams(): Promise<
  {
    postId: string;
  }[]
> {
  // generateStaticParams関数内でfetchリクエストでコンテンツを取得した場合はそのリクエストは自動的にメモ化される
  // 今回は違う
  const { contents } = await getList();

  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
}

/**
 *
 * @param paramsにはgenerateStaticParams関数が返すpaths配列の中のこのページのpostIdが入る
 * @returns JSXElement
 */
export default async function StaticDetailPage({
  // ここをparamsだけにするとpostIdは44行目のように取得することになる
  params: { postId },
}: {
  params: { postId: string };
}): Promise<JSX.Element> {
  // const { postId } = params;
  const post = await getDetail(postId);

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  if (post == null) {
    notFound();
  }

  if (post.category == null) {
    return <p></p>;
  }

  return (
    <div>
      <h1>記事詳細ページ</h1>
      <p>{postId}</p>
      <h2>{post.title}</h2>
      <h2>{time}</h2>
      <p>{post.category.name}</p>
      <div>{parse(post.content)}</div>
    </div>
  );
}
