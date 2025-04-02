import { PER_PAGE } from '../const';
import { ArticleList } from './components/ArticleList';
import { getList } from '../libs/microcms-ts';
import { PaginationWrapper } from './components/PaginationWrapper';

type Props = {
  // searchParams: ReadonlyURLSearchParams;
  searchParams: {
    page?: number;
  };
};

const Home: React.FC<Props> = async ({ searchParams }) => {
  const { page } = searchParams;
  const currentPageNum = page != null ? Number(page) : 1;

  const { contents, totalCount } = await getList({
    offset: (currentPageNum - 1) * PER_PAGE,
    limit: PER_PAGE,
  });

  // const { contents: contents_categories } = await getListCategories();

  return (
    <div className="flex flex-col justify-center">
      <p className="text-2xl font-bold">新着記事</p>
      <ArticleList contents={contents} />
      <PaginationWrapper totalCount={totalCount} currentPageNum={currentPageNum} />
      {/* <p className="text-2xl font-bold">カテゴリー</p>
      {contents_categories.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))} */}
    </div>
  );
};

export default Home;
