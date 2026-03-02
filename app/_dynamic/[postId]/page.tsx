import parse from 'html-react-parser';
import { notFound } from 'next/navigation';

import { getDetail, getList } from '../../../libs/microcms';

// キャッシュを利用しない
export const revalidate = 0;

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
      <h1>記事詳細ページ</h1>
      <h2>{post.title}</h2>
      <h2>{time}</h2>
      <div>{parse(post.content)}</div>
    </div>
  );
}
