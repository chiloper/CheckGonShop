import React from 'react';
import { PlatformType } from '../lib/types';
import { PlatformIcon } from './PlatformIcon';

interface PlatformBadgeProps {
  platform: PlatformType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  size = 'md',
  showLabel = true,
}) => {
  const configs = {
    shopee: {
      label: 'Shopee',
      badgeBg: 'bg-[#fff5f1] border-[#fcd5cb] text-[#ee4d2d]',
    },
    lazada: {
      label: 'Lazada',
      badgeBg: 'bg-[#f0f3ff] border-[#d2dbff] text-[#0f146d]',
    },
    tiktok: {
      label: 'TikTok Shop',
      badgeBg: 'bg-zinc-100 border-zinc-300 text-zinc-900',
    },
  };

  const config = configs[platform];

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-medium',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap flex-shrink-0 shadow-2xs border ${config.badgeBg} ${sizeClasses[size]}`}
    >
      <PlatformIcon platform={platform} className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
