import parse from 'html-react-parser';

import { isElement, isText } from '@/libs/typeGuard';

type HeadingList = {
  id: string;
  text: string;
}[];

export function Toc({ rawHtml }: { rawHtml: string }): JSX.Element {
  const headingList = getHeadingList(rawHtml);

  if (headingList.length === 0) return <></>;

  return (
    <aside className="mt-14 self-start [grid-area:1/2/2/3] md:sticky md:top-20 md:mt-0">
      <p className="border-l-2 border-muted-foreground pl-2 text-sm">目次</p>
      <ul className="mt-3 grid gap-y-1">
        {headingList.map((heading, idx) => (
          <li key={heading.id || `heading-${idx}`}>
            <a
              href={`#${heading.id}`}
              className="w-full px-4 py-1 text-sm opacity-90 transition-colors duration-300 hover:bg-secondary hover:text-secondary-foreground"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function getHeadingList(rawHtml: string): HeadingList {
  const headingList: HeadingList = [];

  parse(rawHtml, {
    replace: (domNode) => {
      if (!isElement(domNode)) return;

      if (domNode.name === 'h2') {
        if (!isText(domNode.firstChild)) return;

        headingList.push({
          id: domNode.attribs['id'] ?? '',
          text: domNode.firstChild.data,
        });
      }
    },
  });

  return headingList;
}
