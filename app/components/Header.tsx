import Link from 'next/link';

import { ModeToggle } from './ModeToggle';

export const Header: React.FC = () => {
  return (
    <header className="grid h-12 w-full shrink-0 border-b border-b-zinc-600">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 md:px-0">
        <div className="left-10 grid">
          <Link href="/" className="text-3xl font-bold">
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
