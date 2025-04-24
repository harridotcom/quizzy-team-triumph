
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassmorphicCard from './GlassmorphicCard';
import Leaderboard from './Leaderboard';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import TeamBanner from './TeamBanner';

interface ResultsCardProps {
  leaderboard: [string, number][];
  username: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ leaderboard, username }) => {
  const navigate = useNavigate();
  
  // Find user's position in the leaderboard
  const userRank = leaderboard.findIndex(([name]) => name === username) + 1;
  const userScore = leaderboard.find(([name]) => name === username)?.[1] || 0;
  
  // Find the top player
  const winner = leaderboard[0];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-scale-in">
      <GlassmorphicCard className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-quiz-purple">Quiz Complete!</h2>
        
        {winner && (
          <div className="mb-6">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
              <Award size={20} />
              <span className="font-bold">{winner[0]}</span> 
              <span>wins with {winner[1]} points!</span>
            </div>
          </div>
        )}
        
        <div className="bg-white/60 rounded-lg p-4 mb-4">
          <p className="text-muted-foreground">Your result</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-bold bg-purple-100 text-quiz-purple rounded-md px-3 py-1">
              Rank #{userRank}
            </span>
            <span className="text-lg">with</span>
            <span className="text-lg font-bold bg-purple-100 text-quiz-purple rounded-md px-3 py-1">
              {userScore} points
            </span>
          </div>
        </div>
        
        <div className="flex gap-3 justify-center mt-6">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
          >
            Back to Home
          </Button>
          <Button 
            onClick={() => navigate('/join')}
            className="bg-gradient-purple hover:opacity-90"
          >
            Join Another Quiz
          </Button>
        </div>
      </GlassmorphicCard>
      
      <Leaderboard leaderboard={leaderboard} title="Final Results" />
      
      <div className="mt-8">
        <TeamBanner />
      </div>
    </div>
  );
};

export default ResultsCard;
