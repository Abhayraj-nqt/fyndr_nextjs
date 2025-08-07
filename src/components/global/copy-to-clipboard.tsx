"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
  text: string;
};

const CopyToClipboard = ({ children, text, className = "" }: Props) => {
  const handleClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div onClick={handleClipboard} className={`${className}`}>
      {children}
    </div>
  );
};

export default CopyToClipboard;
