import hljs from 'highlight.js/lib/common';
import parse from 'html-react-parser';

import 'highlight.js/styles/github-dark-dimmed.min.css';

type Props = {
  hlc: {
    code: string;
    languageClass: string;
    dataFileName: string;
  };
};

export default function HighlightCode({
  hlc: { code, languageClass, dataFileName },
}: Props): JSX.Element {
  // microCMSから取得したクラス名を、言語名に整形
  const language = languageClass.replace('language-', '');
  const highlightCode = hljs.highlight(code, {
    language: language,
    ignoreIllegals: true,
  }).value;

  return (
    <div className="text-white">
      <p className="inline-flex rounded-t-md bg-slate-800 px-2 py-1 text-sm leading-none">
        {dataFileName}
      </p>
      <pre className="flex overflow-x-auto rounded-b-md rounded-se-md bg-blue-950 p-2">
        <code className={languageClass}>{parse(highlightCode)}</code>
      </pre>
    </div>
  );
}
