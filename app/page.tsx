import React from 'react';

import { ArticleList } from './components/ArticleList';

const Home: React.FC = () => {
  return (
    <main className="mt-12 grid grow items-center justify-items-center px-8">
      <ArticleList />
    </main>
  );
};

export default Home;
