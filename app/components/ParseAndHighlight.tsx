import parse, { domToReact, Element, Text } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

import HighlightCode from './HighlightCode';

// 型ガード関数
const isElement = (element: unknown) => element instanceof Element;
const isText = (text: unknown) => text instanceof Text;

export const ParseAndHighlight = (rawHtml: string): string | JSX.Element | JSX.Element[] => {
  return parse(rawHtml, {
    replace: (domNode) => {
      // コードブロックじゃない場合はそのまま
      if (!isElement(domNode)) return;

      // aタグの処理
      if (domNode.name === 'a') {
        if (domNode.attribs['href'] == null) return;
        // httpが含まれる場合は触らない
        if (domNode.attribs['href']?.includes('http')) {
          return;
        }
        // それ以外はLinkタグに置き換える。
        const children = domNode.children.filter(
          // childrenの型をElement | Textとする
          (node): node is Element | Text => isElement(node) || isText(node),
        );
        return <Link href={domNode.attribs['href']}>{domToReact(children)}</Link>;
      }

      // 画像の処理
      if (domNode.name === 'img') {
        const atr = domNode.attribs;
        return (
          <Image
            src={atr['src']!}
            alt={atr['alt'] ?? ''}
            width={Number(atr['width'])}
            height={Number(atr['height'])}
          ></Image>
        );
      }

      // コードブロックの処理
      const dataFileName = domNode.attribs['data-filename'];
      if (!isElement(domNode.firstChild)) return;
      const codeElement = dataFileName != null ? domNode.firstChild.firstChild : domNode.firstChild;
      if (!isElement(codeElement)) return;
      if (!isText(codeElement.firstChild)) return;

      if (codeElement.attribs['class'] != null) {
        const code = codeElement.firstChild.data;

        if (codeElement.attribs['class'] == null) return;

        const language = codeElement.attribs['class'].replace('language-', '');

        return <HighlightCode hlc={{ code, language, dataFileName }} />;
      }

      return;
    },
  });
};
