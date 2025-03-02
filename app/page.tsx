import React from 'react';

import { PER_PAGE } from '../const';
import { ArticleList } from './components/ArticleList';
import { getList } from '../libs/microcms-ts';
import { Pagenation } from './components/Pagenation';

type Props = {
  // searchParams: ReadonlyURLSearchParams;
  searchParams: {
    page?: number;
  };
};

const Home: React.FC<Props> = async ({ searchParams }) => {
  const { page } = searchParams;
  const pageNum = page != null ? page : 1;

  const { contents, totalCount } = await getList({
    offset: (pageNum - 1) * PER_PAGE,
    limit: PER_PAGE,
  });

  return (
    <div className="flex flex-col justify-center">
      <p className="text-xl font-bold">新着記事</p>
      <ArticleList contents={contents} />
      <Pagenation totalCount={totalCount} />
    </div>
  );
};

export default Home;
