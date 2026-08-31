import React from 'react';
import Badge from './Badge';

export const SectionTitle = ({
  badge,
  title,
  subtitle,
  center = false,
  className = '',
}) => {
  return (
    <div className={`space-y-3 mb-10 sm:mb-14 ${center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div>
          <Badge variant="cyan" size="md">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
