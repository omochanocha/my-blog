import parse, { Element, Text } from 'html-react-parser';

import HighlightCode from './HighlightCode';

// 型ガード関数
const isElement = (element: unknown) => element instanceof Element;
const isText = (text: unknown) => text instanceof Text;

export const ParseAndHighlight = (rawHtml: string): string | JSX.Element | JSX.Element[] => {
  return parse(rawHtml, {
    replace: (domNode) => {
      if (!(domNode instanceof Element)) {
        // コードブロックじゃない場合はそのまま
        return;
      }

      const dataFileName = domNode.attribs['data-filename'];

      if (!isElement(domNode.firstChild)) return;
      const codeElement = dataFileName != null ? domNode.firstChild.firstChild : domNode.firstChild;

      if (!isElement(codeElement)) return;
      if (!isText(codeElement.firstChild)) return;

      const code = codeElement.firstChild.data;

      if (codeElement.attribs['class'] == null) return;

      const language = codeElement.attribs['class'].replace('language-', '');

      return <HighlightCode hlc={{ code, language, dataFileName }} />;
    },
  });
};
