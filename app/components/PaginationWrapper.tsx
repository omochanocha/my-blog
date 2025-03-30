import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { PER_PAGE } from '@/const';

type Props = {
  totalCount: number;
  currentPageNum: number;
};

export const PaginationWrapper: React.FC<Props> = ({ totalCount, currentPageNum }) => {
  const range = (start: number, end: number): number[] => {
    // return [...Array(end - start + 1)].map((_, i) => start + i);のようにスプレッド構文だとArray(end - start + 1)がany型になりエラーになる
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <PaginationItem key={index}>
            <PaginationLink href={`?page=${number}`} isActive={currentPageNum === number}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};
