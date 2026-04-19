import parse from 'html-react-parser';

import { isElement, isText } from '@/libs/typeGuard';

type HeadingList = {
  id: string;
  text: string;
}[];

export function Toc({ rawHtml }: { rawHtml: string }): JSX.Element {
  const headingList = getHeadingList(rawHtml);
  console.log(headingList);

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

/**
 * h2が`<h2><em>斜体<strong>太字</strong></em></h2>`のように子要素を持っていたとしても、子要素のテキストのみを再帰的に抽出して一つの文字列になるようにする関数
 */
function extractText(node: unknown): string {
  if (isText(node)) return node.data;
  if (isElement(node)) return node.children.map(extractText).join('');
  return '';
}

export function getHeadingList(rawHtml: string): HeadingList {
  const headingList: HeadingList = [];

  parse(rawHtml, {
    replace: (domNode) => {
      if (!isElement(domNode)) return;

      if (domNode.name === 'h2') {
        // console.log(domNode.children.map(extractText).join(''));
        headingList.push({
          id: domNode.attribs['id'] ?? '',
          text: domNode.children.map(extractText).join(''),
        });
      }
    },
  });

  return headingList;
}
