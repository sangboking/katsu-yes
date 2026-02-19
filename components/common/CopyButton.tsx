'use client';

import { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // 1.5초 후 상태 초기화
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-xs text-blue-500 hover:underline"
      disabled={!textToCopy}
    >
      {isCopied ? '복사됨!' : '복사'}
    </button>
  );
};

export default CopyButton;
