import React from 'react';

interface FeaturesButtonProps {
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

const FeaturesButton: React.FC<FeaturesButtonProps> = ({ onClick, className = "", isActive = false }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{ background: 'transparent', border: 'none', padding: 0 }}
    >
      <svg width="260" height="48" viewBox="0 0 260 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[260px]">
        <rect x="6.5" width="247" height="48" rx="24" fill="#D0941C"/>
        <rect x="12.5" y="40" width="235" height="4" fill="#B37B0D"/>
        <rect x="8.5" y="36" width="4" height="4" fill="#B37B0D"/>
        <rect width="235" height="4" transform="matrix(1 0 0 -1 12.5 8)" fill="#E5C179"/>
        <rect width="4" height="4" transform="matrix(1 0 0 -1 8.5 12)" fill="#E5C179"/>
        <rect x="4.5" y="12" width="10" height="24" fill="#D0941C"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 247.5 40)" fill="#B37B0D"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 251.5 36)" fill="#B37B0D"/>
        <rect x="247.5" y="8" width="4" height="4" transform="rotate(180 247.5 8)" fill="#E5C179"/>
        <rect x="253.5" y="12" width="6" height="4" transform="rotate(180 253.5 12)" fill="#D0941C"/>
        <rect width="10" height="24" transform="matrix(-1 0 0 1 257.5 12)" fill="#D0941C"/>
        <rect x="12.5" width="235" height="4" fill="black"/>
        <rect x="12.5" y="44" width="235" height="4" fill="black"/>
        <rect x="8.5" y="40" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 251.5 40)" fill="black"/>
        <rect x="8.5" y="4" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 251.5 4)" fill="black"/>
        <rect x="4.5" y="36" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 255.5 36)" fill="black"/>
        <rect x="4.5" y="8" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 255.5 8)" fill="black"/>
        <rect x="0.5" y="12" width="4" height="24" fill="black"/>
        <rect width="4" height="24" transform="matrix(-1 0 0 1 259.5 12)" fill="black"/>
        <text
          x="130"
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontFamily="'Press Start 2P', 'Courier New', monospace"
        >
          KEY FEATURES
        </text>
      </svg>
    </button>
  );
};

export default FeaturesButton;