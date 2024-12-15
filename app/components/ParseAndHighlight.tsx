import parse, { Element, Text } from 'html-react-parser';

import HighlightCode from './HighlightCode';

// 型ガード関数
const isElement = (element: unknown) => element instanceof Element;
const isText = (text: unknown) => text instanceof Text;

export default function ParseAndHighlight(rawHtml: string): string | JSX.Element | JSX.Element[] {
  return parse(rawHtml, {
    replace: (domNode) => {
      // コードブロックであるか
      if (
        domNode instanceof Element &&
        domNode.name === 'div' &&
        'data-filename' in domNode.attribs
      ) {
        // 型を絞り込んでいく
        if (!isElement(domNode.firstChild)) return;
        if (!isElement(domNode.firstChild.firstChild)) return;

        const codeElement = domNode.firstChild.firstChild;

        if (!isText(codeElement.firstChild)) return;

        // code本文, 言語名, ファイル名を抽出してハイライトする。
        const code = codeElement.firstChild.data;
        const languageClass = codeElement.attribs['class'] ?? '';
        const dataFileName = domNode.attribs['data-filename'];

        return <HighlightCode hlc={{ code, languageClass, dataFileName }} />;
      }
      // コードブロックじゃなければそのまま返す
      return;
    },
  });
}
