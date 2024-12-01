import React from 'react';

import { ArticleList } from './components/ArticleList';

const Home: React.FC = () => {
  return (
    <main className="grid items-center justify-items-center px-8">
      <ArticleList />
    </main>
  );
};

export default Home;
