
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      'glassmorphism p-6 md:p-8 rounded-2xl animate-scale-in card-hover shadow-xl',
      className
    )}>
      {children}
    </div>
  );
};

export default GlassmorphicCard;
