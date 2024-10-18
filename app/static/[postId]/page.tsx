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
  const { contents } = await getList();

  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
}

export default async function StaticDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}): Promise<JSX.Element> {
  const post = await getDetail(postId);

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  if (post == null) {
    notFound();
  }

  return (
    <div>
      <p>{postId}</p>
      <h1>{post.title}</h1>
      <h2>{time}</h2>
      <div>{parse(post.content)}</div>
    </div>
  );
}
