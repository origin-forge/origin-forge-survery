import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled = false, className = "", isLoading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      style={{ background: 'transparent', border: 'none', padding: 0 }}
    >
      <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[180px]" style={{ opacity: disabled ? 0.5 : 1 }}>
        <rect x="6.5" width="167" height="48" rx="24" fill="#D0941C"/>
        <rect x="12.5" y="40" width="155" height="4" fill="#B37B0D"/>
        <rect x="8.5" y="36" width="4" height="4" fill="#B37B0D"/>
        <rect width="155" height="4" transform="matrix(1 0 0 -1 12.5 8)" fill="#E5C179"/>
        <rect width="4" height="4" transform="matrix(1 0 0 -1 8.5 12)" fill="#E5C179"/>
        <rect x="4.5" y="12" width="10" height="24" fill="#D0941C"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 167.5 40)" fill="#B37B0D"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 171.5 36)" fill="#B37B0D"/>
        <rect x="167.5" y="8" width="4" height="4" transform="rotate(180 167.5 8)" fill="#E5C179"/>
        <rect x="173.5" y="12" width="6" height="4" transform="rotate(180 173.5 12)" fill="#D0941C"/>
        <rect width="10" height="24" transform="matrix(-1 0 0 1 177.5 12)" fill="#D0941C"/>
        <rect x="12.5" width="155" height="4" fill="black"/>
        <rect x="12.5" y="44" width="155" height="4" fill="black"/>
        <rect x="8.5" y="40" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 171.5 40)" fill="black"/>
        <rect x="8.5" y="4" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 171.5 4)" fill="black"/>
        <rect x="4.5" y="36" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 175.5 36)" fill="black"/>
        <rect x="4.5" y="8" width="4" height="4" fill="black"/>
        <rect width="4" height="4" transform="matrix(-1 0 0 1 175.5 8)" fill="black"/>
        <rect x="0.5" y="12" width="4" height="24" fill="black"/>
        <rect width="4" height="24" transform="matrix(-1 0 0 1 179.5 12)" fill="black"/>
        <text
          x="90"
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize="15"
          fontFamily="'Press Start 2P', 'Courier New', monospace"
        >
          {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
        </text>
      </svg>
    </button>
  );
};

export default SubmitButton;