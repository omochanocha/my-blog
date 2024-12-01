import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="grid h-12 w-full border-b border-b-zinc-600">
      <div className="relative grid items-center justify-center px-8">
        <h1 className="absolute left-10 grid">
          <Link href="/" className="text-3xl font-bold">
            My Blog
          </Link>
        </h1>
        <Link href="/" className="text-center text-xl font-bold">
          Articles
        </Link>
      </div>
    </header>
  );
};
