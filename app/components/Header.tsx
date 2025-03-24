import Link from 'next/link';

import { ModeToggle } from './ModeToggle';

export const Header: React.FC = () => {
  return (
    <header className="grid h-12 w-full shrink-0 border-b border-b-zinc-600">
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-between gap-x-2 px-4 md:px-0">
        <div className="left-10 grid grow md:grow-0">
          <Link href="/" className="text-2xl font-bold  md:text-3xl">
            My Blog
          </Link>
        </div>
        <Link href="/articles/" className="text-center text-xl font-bold">
          Articles
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};
