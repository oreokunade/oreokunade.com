import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Light mode logo */}
      <img
        src="/Group 9.png"
        alt="Oreoluwa Okunade"
        className="h-full w-auto block dark:hidden object-contain"
      />
      {/* Dark mode logo */}
      <img
        src="/Group 8.png"
        alt="Oreoluwa Okunade"
        className="h-full w-auto hidden dark:block object-contain"
      />
    </div>
  );
};

export default Logo;