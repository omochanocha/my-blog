import { getList } from '@/libs/microcms-ts';

import { ArticleList } from '../components/ArticleList';

const Page: React.FC = async () => {
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
