import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="grid h-12 w-full shrink-0 border-b border-b-zinc-600">
      <div className="relative flex items-center justify-between px-4 md:justify-center md:px-8">
        <div className="left-10 grid md:absolute">
          <Link href="/" className="text-3xl font-bold">
            My Blog
          </Link>
        </div>
        <Link href="/" className="text-center text-xl font-bold">
          Articles
        </Link>
      </div>
    </header>
  );
};
