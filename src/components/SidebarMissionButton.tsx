import React from 'react';

interface SidebarMissionButtonProps {
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

const SidebarMissionButton: React.FC<SidebarMissionButtonProps> = ({ onClick, className = "", isActive = false }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{ background: 'transparent', border: 'none', padding: 0 }}
    >
      <svg width="240" height="56" viewBox="0 0 240 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[240px]" style={{ opacity: isActive ? 1 : 0.7 }}>
        <rect x="6.5" width="227" height="56" rx="28" fill="#D0941C"/>
        <rect x="12.5" y="48" width="215" height="4" fill="#B37B0D"/>
        <rect x="8.5" y="44" width="4" height="4" fill="#B37B0D"/>
        <rect width="215" height="4" transform="matrix(1 0 0 -1 12.5 8)" fill="#E5C179"/>
        <rect width="4" height="4" transform="matrix(1 0 0 -1 8.5 12)" fill="#E5C179"/>
        <rect x="4.5" y="12" width="10" height="32" fill="#D0941C"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 227.5 48)" fill="#B37B0D"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 231.5 44)" fill="#B37B0D"/>
        <rect x="227.5" y="8" width="4" height="4" transform="rotate(180 227.5 8)" fill="#E5C179"/>
        <rect x="233.5" y="12" width="6" height="4" transform="rotate(180 233.5 12)" fill="#D0941C"/>
        <rect width="10" height="32" transform="matrix(-1 0 0 1 237.5 12)" fill="#D0941C"/>
        <rect x="12.5" width="215" height="4" fill="black"/>
        <rect x="12.5" y="52" width="215" height="4" fill="black"/>
        <rect x="8.5" y="48" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 231.5 48)" fill="black"/>
        <rect x="8.5" y="4" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 231.5 4)" fill="black"/>
        <rect x="4.5" y="44" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 235.5 44)" fill="black"/>
        <rect x="4.5" y="8" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 235.5 8)" fill="black"/>
        <rect x="0.5" y="12" width="4" height="32" fill="black"/>
        <rect width="4" height="32" transform="matrix(-1 0 0 1 239.5 12)" fill="black"/>
        <text
          x="120"
          y="34"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontFamily="'Press Start 2P', 'Courier New', monospace"
        >
          OUR MISSION
        </text>
      </svg>
    </button>
  );
};

export default SidebarMissionButton;