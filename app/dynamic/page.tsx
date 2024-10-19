import Link from 'next/link';

import { getList } from '../../libs/microcms';

// キャッシュを利用しない
export const revalidate = 0;

export default async function StaticPage(): Promise<JSX.Element> {
  const { contents } = await getList();

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  if (contents == null || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div>
      <h1>記事一覧ページ</h1>
      <h2>{time}</h2>
      <ul>
        {contents.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/dynamic/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
