import React from "react";

interface QuestionCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

// This component mimics the pixel-art border and layout of your SVG using CSS
const QuestionCard: React.FC<QuestionCardProps> = ({ children, header, className }) => (
  <div
    className={`relative rounded-[4px] px-4 pt-6 pb-4 shadow-none border-4 border-black border-solid max-w-full w-full ${className}`}
    style={{
      boxShadow: "0 0 0 3px #000, 0 0 0 7px #fff, 0 0 0 11px #000", // pixel border effect
      borderRadius: "0.5rem",
      backgroundColor: '#fff',
    }}
  >
    {header && (
      <div className="absolute left-0 right-0 top-0 h-10 flex items-center justify-center bg-white border-b-4 border-black rounded-t-[4px]">
        <span className="font-bold text-black text-lg">{header}</span>
      </div>
    )}
    <div className="mt-10">{children}</div>
  </div>
);

export default QuestionCard;
