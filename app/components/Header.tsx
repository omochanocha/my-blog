'use client';

import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';

import { ModeToggle } from './ModeToggle';

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`grid h-14 w-full shrink-0 border-b border-b-zinc-600 lg:h-16 ${isSticky ? 'sticky top-0 z-10 backdrop-blur-[6px]' : 'relative'}`}
    >
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-between gap-x-2 px-4 md:pl-4 md:pr-16">
        <div className="left-10 grid grow md:grow-0">
          <Link href="/" className="text-2xl font-bold  md:text-3xl">
            Blog
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
