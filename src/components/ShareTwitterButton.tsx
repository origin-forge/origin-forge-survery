import React from 'react';

interface ShareTwitterButtonProps {
  onClick: () => void;
  className?: string;
}

const ShareTwitterButton: React.FC<ShareTwitterButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{ background: 'transparent', border: 'none', padding: 0 }}
    >
      <svg width="250" height="48" viewBox="0 0 250 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[250px]">
        <rect x="6.5" width="237" height="48" rx="24" fill="#D0941C"/>
        <rect x="12.5" y="40" width="225" height="4" fill="#B37B0D"/>
        <rect x="8.5" y="36" width="4" height="4" fill="#B37B0D"/>
        <rect width="225" height="4" transform="matrix(1 0 0 -1 12.5 8)" fill="#E5C179"/>
        <rect width="4" height="4" transform="matrix(1 0 0 -1 8.5 12)" fill="#E5C179"/>
        <rect x="4.5" y="12" width="10" height="24" fill="#D0941C"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 237.5 40)" fill="#B37B0D"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 241.5 36)" fill="#B37B0D"/>
        <rect x="237.5" y="8" width="4" height="4" transform="rotate(180 237.5 8)" fill="#E5C179"/>
        <rect x="243.5" y="12" width="6" height="4" transform="rotate(180 243.5 12)" fill="#D0941C"/>
        <rect width="10" height="24" transform="matrix(-1 0 0 1 247.5 12)" fill="#D0941C"/>
        <rect x="12.5" width="225" height="4" fill="black"/>
        <rect x="12.5" y="44" width="225" height="4" fill="black"/>
        <rect x="8.5" y="40" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 241.5 40)" fill="black"/>
        <rect x="8.5" y="4" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 241.5 4)" fill="black"/>
        <rect x="4.5" y="36" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 245.5 36)" fill="black"/>
        <rect x="4.5" y="8" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 245.5 8)" fill="black"/>
        <rect x="0.5" y="12" width="4" height="24" fill="black"/>
        <rect width="4" height="24" transform="matrix(-1 0 0 1 249.5 12)" fill="black"/>
        <text
          x="125"
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontFamily="'Press Start 2P', 'Courier New', monospace"
        >
          SHARE ON X!
        </text>
      </svg>
    </button>
  );
};

export default ShareTwitterButton;