
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <div className="glassmorphism p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-quiz-purple">404</h1>
        <p className="text-xl mb-8">Oops! Page not found</p>
        
        <Link to="/">
          <Button className="bg-gradient-purple hover:opacity-90">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
