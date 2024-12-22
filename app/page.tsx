import React from 'react';

import { ArticleList } from './components/ArticleList';
import { getList } from '../libs/microcms-ts';

const Home: React.FC = async () => {
  const { contents } = await getList({ limit: 3 });

  return (
    <div className="flex flex-col justify-center">
      <p className="text-xl font-bold">新着記事</p>
      <ArticleList contents={contents} />
    </div>
  );
};

export default Home;
