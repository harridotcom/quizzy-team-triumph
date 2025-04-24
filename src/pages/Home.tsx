
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TeamBanner from '@/components/TeamBanner';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow gradient-bg flex flex-col items-center justify-center p-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Quizzy
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Test your knowledge with friends in fast-paced quiz battles!
          </p>
        </div>
        
        <div className="glassmorphism p-8 rounded-lg max-w-md w-full animate-scale-in">
          <div className="space-y-4">
            <Link to="/create">
              <Button className="w-full bg-white text-quiz-purple hover:bg-white/90 border-2 border-transparent hover:border-white text-lg h-12">
                Create a Quiz
              </Button>
            </Link>
            
            <Link to="/join">
              <Button variant="outline" className="w-full bg-transparent text-white border-2 border-white hover:bg-white/10 text-lg h-12">
                Join a Quiz
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 animate-fade-in">
          <TeamBanner />
        </div>
      </div>
    </div>
  );
};

export default Home;
