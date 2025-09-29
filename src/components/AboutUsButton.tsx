import React from 'react';

interface AboutUsButtonProps {
  onClick: () => void;
  className?: string;
}

const AboutUsButton: React.FC<AboutUsButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{ background: 'transparent', border: 'none', padding: 0 }}
    >
      <svg width="280" height="48" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
        <rect x="6.5" width="187" height="48" rx="24" fill="#D0941C"/>
        <rect x="12.5" y="40" width="175" height="4" fill="#B37B0D"/>
        <rect x="8.5" y="36" width="4" height="4" fill="#B37B0D"/>
        <rect width="175" height="4" transform="matrix(1 0 0 -1 12.5 8)" fill="#E5C179"/>
        <rect width="4" height="4" transform="matrix(1 0 0 -1 8.5 12)" fill="#E5C179"/>
        <rect x="4.5" y="12" width="10" height="24" fill="#D0941C"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 187.5 40)" fill="#B37B0D"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 191.5 36)" fill="#B37B0D"/>
        <rect x="187.5" y="8" width="4" height="4" transform="rotate(180 187.5 8)" fill="#E5C179"/>
        <rect x="193.5" y="12" width="6" height="4" transform="rotate(180 193.5 12)" fill="#D0941C"/>
        <rect width="10" height="24" transform="matrix(-1 0 0 1 197.5 12)" fill="#D0941C"/>
        <rect x="12.5" width="175" height="4" fill="black"/>
        <rect x="12.5" y="44" width="175" height="4" fill="black"/>
        <rect x="8.5" y="40" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 191.5 40)" fill="black"/>
        <rect x="8.5" y="4" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 191.5 4)" fill="black"/>
        <rect x="4.5" y="36" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 195.5 36)" fill="black"/>
        <rect x="4.5" y="8" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 195.5 8)" fill="black"/>
        <rect x="0.5" y="12" width="4" height="24" fill="black"/>
        <rect width="4" height="24" transform="matrix(-1 0 0 1 199.5 12)" fill="black"/>
        <text
          x="100"
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontFamily="'Press Start 2P', 'Courier New', monospace"
        >
          ABOUT US
        </text>
      </svg>
    </button>
  );
};

export default AboutUsButton;