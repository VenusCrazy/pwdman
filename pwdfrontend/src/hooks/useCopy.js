import { useEffect, useState } from "react";

function useCopy(copyText, timeout = 1200) {
  const [copyToken, setCopyToken] = useState(0);
  const [prevToken, setPrevToken] = useState(0);
  const [copied, setCopied] = useState(false);

  if (copyToken > 0 && copyToken !== prevToken) {
    setPrevToken(copyToken);
    setCopied(true);
  }

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), timeout);
    return () => clearTimeout(timer);
  }, [copied, timeout, prevToken]);

  const triggerCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopyToken((n) => n + 1);
  };

  return { copied, triggerCopy, copyToken };
}

export default useCopy;