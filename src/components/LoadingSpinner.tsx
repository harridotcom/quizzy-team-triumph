
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 24, 
  className = "text-quiz-purple"
}) => {
  return (
    <Loader 
      size={size} 
      className={`animate-spin ${className}`}
    />
  );
};

export default LoadingSpinner;
