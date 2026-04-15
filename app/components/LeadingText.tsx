const MAX_LENGTH = 200;

export const LeadingText: React.FC<{ content: string }> = ({ content }) => {
  const withoutPreCode = content.replace(/<(?:pre|code)[^>]*>[\s\S]*?<\/(?:pre|code)>/gi, '');
  // const textOnly = withoutPreCode.replace(/<[^>]+>/g, '');
  const textOnly = withoutPreCode
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

  const trimmedText = textOnly.trim();
  const leadingText =
    trimmedText.length > MAX_LENGTH ? trimmedText.slice(0, MAX_LENGTH) + '…' : trimmedText;
  return <p className="line-clamp-3">{leadingText}</p>;
};
