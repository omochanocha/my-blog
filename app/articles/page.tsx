import { FC } from 'react';

import { getList } from '@/libs/microcms-ts';

import { ArticleList } from '../components/ArticleList';

const Page: FC = async () => {
  const { contents } = await getList();
  return (
    <>
      <div>
        <ArticleList contents={contents} />
      </div>
    </>
  );
};

export default Page;
