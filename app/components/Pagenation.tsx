import { FC } from 'react';

import Link from 'next/link';

import { PER_PAGE } from '../../const';

type Props = {
  totalCount: number;
};

export const Pagenation: FC<Props> = ({ totalCount }) => {
  const range = (start: number, end: number): number[] => {
    // return [...Array(end - start + 1)].map((_, i) => start + i);のようにスプレッド構文だとArray(end - start + 1)がany型になりエラーになる
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  return (
    <ul>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`?page=${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
