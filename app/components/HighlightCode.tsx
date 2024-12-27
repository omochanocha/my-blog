import hljs from 'highlight.js/lib/common';
import parse from 'html-react-parser';

import 'highlight.js/styles/github-dark-dimmed.min.css';

type Props = {
  hlc: {
    code: string;
    language: string;
    dataFileName: string | undefined;
  };
};

const HighlightCode: React.FC<Props> = ({ hlc: { code, language, dataFileName } }) => {
  // microCMSから取得したクラス名を、言語名に整形
  // const language = languageClass.replace('language-', '');
  const highlightCode = language
    ? hljs.highlight(code, { language, ignoreIllegals: true }).value
    : hljs.highlightAuto(code).value;
  // const highlightCode= hljs.highlight(code, { language, ignoreIllegals: true }).value;

  const rounded = dataFileName != null ? 'rounded-b-md rounded-se-md' : 'rounded-md';

  return (
    <div className="text-white">
      {dataFileName != null && (
        <p className="flex max-w-fit rounded-t-md bg-slate-800 px-2 py-1 text-sm leading-none">
          {dataFileName}
        </p>
      )}
      <pre className={`flex overflow-x-auto ${rounded} bg-blue-950 p-2`}>
        <code className={language}>{parse(highlightCode)}</code>
      </pre>
    </div>
  );
};

export default HighlightCode;
