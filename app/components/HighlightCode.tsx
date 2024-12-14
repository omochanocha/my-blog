import hljs from 'highlight.js/lib/common';
import parse from 'html-react-parser';

// import styles from './HighlightCode.modue.scss'; // 詳細は省略
import 'highlight.js/styles/lioshi.css';

type Props = {
  hlc: {
    code: string;
    languageClass: string;
    dataFileName: string;
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function HighlightCode({ hlc: { code, languageClass, dataFileName } }: Props) {
  // microCMSから取得したクラス名を、言語名に整形
  const language = languageClass.replace('language-', '');
  const highlightCode = hljs.highlight(code, {
    language: language,
    ignoreIllegals: true,
  }).value;

  return (
    <div>
      <div>{dataFileName}</div>
      <pre>
        <code className={languageClass}>{parse(highlightCode)}</code>
      </pre>
    </div>
  );
}
