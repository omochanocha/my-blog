import React from 'react';

import { ArticleList } from './components/ArticleList';
import { getList } from '../libs/microcms-ts';

const Home: React.FC = async () => {
  const { contents } = await getList({ limit: 3 });

  return <ArticleList contents={contents} />;
};

export default Home;
