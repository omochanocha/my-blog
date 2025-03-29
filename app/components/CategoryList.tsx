import Link from 'next/link';

import { Category } from '@/types/blog';

export const CategoryList: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <ul className="flex items-center gap-x-4">
      {categories.map((category) => {
        return (
          <li key={category.id}>
            <Link
              href={`/categories/${category.id}`}
              className="rounded border border-slate-600 px-2 py-1 text-sm hover:bg-accent"
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
