import React from 'react';
import { PlatformType } from '../lib/types';

interface PlatformIconProps {
  platform: PlatformType | 'all' | string;
  className?: string;
  size?: number;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  className = 'w-4 h-4',
  size,
}) => {
  const sizeStyle = size ? { width: size, height: size } : undefined;

  switch (platform) {
    case 'shopee':
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${className} flex-shrink-0`}
          style={sizeStyle}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#ee4d2d" />
          <path
            d="M7 9.2h10l-1 9.8a1.5 1.5 0 01-1.5 1.4h-5a1.5 1.5 0 01-1.5-1.4L7 9.2z"
            fill="#ffffff"
          />
          <path
            d="M9.5 9V6.8a2.5 2.5 0 015 0V9"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13.2 13.2c-.3-.2-.7-.3-1.1-.3-.6 0-.9.2-.9.5s.2.5.7.6l.5.2c1 .3 1.5.8 1.5 1.6 0 1-.8 1.8-2 1.8-.8 0-1.4-.2-1.8-.5l.4-.9c.4.3.8.5 1.4.5.6 0 1-.3 1-.7 0-.3-.3-.5-.8-.7l-.4-.1c-.9-.3-1.4-.8-1.4-1.6 0-1 .8-1.7 1.9-1.7.7 0 1.2.2 1.6.4l-.5.9z"
            fill="#ee4d2d"
          />
        </svg>
      );

    case 'lazada':
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${className} flex-shrink-0`}
          style={sizeStyle}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#0f146d" />
          <path
            d="M12 7.2c-1.8-2.2-4.8-1.8-6.2.2-1.6 2.2-.9 5.2 1.3 7.4L12 19l4.9-4.2c2.2-2.2 2.9-5.2 1.3-7.4-1.4-2-4.4-2.4-6.2-.2z"
            fill="#f51279"
          />
          <path
            d="M12 9.5c-1.2-1.5-3.3-1.2-4.2.1-1.1 1.5-.6 3.5.9 5L12 17.5l3.3-2.9c1.5-1.5 2-3.5.9-5-.9-1.3-3-1.6-4.2-.1z"
            fill="#ff5500"
          />
          <path
            d="M12 11.5L9.5 14 12 16.5 14.5 14 12 11.5z"
            fill="#ffffff"
          />
        </svg>
      );

    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${className} flex-shrink-0`}
          style={sizeStyle}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#000000" />
          <path
            d="M14.5 5.5c.6 1.4 1.8 2.3 3.3 2.5v2.2c-1.3 0-2.4-.4-3.3-1.1v5.2c0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7c.4 0 .8 0 1.2.1v2.4c-.4-.1-.8-.2-1.2-.2-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V5.5h2.6z"
            fill="#25f4ee"
            transform="translate(-0.8, -0.6)"
          />
          <path
            d="M14.5 5.5c.6 1.4 1.8 2.3 3.3 2.5v2.2c-1.3 0-2.4-.4-3.3-1.1v5.2c0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7c.4 0 .8 0 1.2.1v2.4c-.4-.1-.8-.2-1.2-.2-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V5.5h2.6z"
            fill="#fe2c55"
            transform="translate(0.8, 0.6)"
          />
          <path
            d="M14.5 5.5c.6 1.4 1.8 2.3 3.3 2.5v2.2c-1.3 0-2.4-.4-3.3-1.1v5.2c0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7c.4 0 .8 0 1.2.1v2.4c-.4-.1-.8-.2-1.2-.2-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V5.5h2.6z"
            fill="#ffffff"
          />
        </svg>
      );

    default:
      return null;
  }
};
