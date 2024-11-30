import React from 'react';

import { ArticleList } from './components/ArticleList';

const Home: React.FC = () => {
  return (
    <div className="grid min-h-screen items-center justify-items-center px-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col">
        <h1>ホーム</h1>
        <ArticleList />
      </main>
    </div>
  );
};

export default Home;
