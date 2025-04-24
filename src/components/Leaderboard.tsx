
import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';
import { Award } from 'lucide-react';

interface LeaderboardProps {
  leaderboard: [string, number][];
  title?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  leaderboard,
  title = "Leaderboard" 
}) => {
  return (
    <GlassmorphicCard className="w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-center text-quiz-purple">{title}</h2>
      
      <div className="space-y-2">
        {leaderboard.slice(0, 10).map(([username, score], index) => {
          let badgeClass = "flex items-center justify-center w-8 h-8 rounded-full";
          
          // Apply special styling for top 3 positions
          if (index === 0) {
            badgeClass += " bg-yellow-100 text-yellow-700";
          } else if (index === 1) {
            badgeClass += " bg-gray-100 text-gray-700";
          } else if (index === 2) {
            badgeClass += " bg-amber-100 text-amber-700";
          } else {
            badgeClass += " bg-purple-100 text-purple-700";
          }
          
          return (
            <div 
              key={username} 
              className="flex items-center justify-between p-3 rounded-lg border bg-white/50"
            >
              <div className="flex items-center gap-3">
                <div className={badgeClass}>
                  {index < 3 ? <Award size={16} /> : index + 1}
                </div>
                <span className="font-medium">{username}</span>
              </div>
              <span className="font-bold text-quiz-purple">{score}</span>
            </div>
          );
        })}
        
        {leaderboard.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No players yet
          </div>
        )}
      </div>
    </GlassmorphicCard>
  );
};

export default Leaderboard;
