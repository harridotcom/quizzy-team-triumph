
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassmorphicCard from './GlassmorphicCard';
import CopyButton from './CopyButton';
import LoadingSpinner from './LoadingSpinner';
import { Users } from 'lucide-react';

interface WaitingRoomProps {
  roomId: string;
  players: string[];
  isAdmin: boolean;
  onStartQuiz: () => void;
  loading: boolean;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({
  roomId,
  players,
  isAdmin,
  onStartQuiz,
  loading
}) => {
  return (
    <GlassmorphicCard className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2 text-center text-quiz-purple">Waiting Room</h2>
      
      <div className="flex justify-center items-center gap-2 mb-6">
        <div className="bg-white px-4 py-2 rounded-md font-mono text-lg font-bold border">
          {roomId}
        </div>
        <CopyButton text={roomId} />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Users size={18} className="text-quiz-purple" />
          <h3 className="font-semibold">Players ({players.length})</h3>
        </div>
        
        <div className="bg-white/70 rounded-md border p-2 max-h-48 overflow-y-auto">
          {players.map((player) => (
            <div 
              key={player} 
              className="py-2 px-3 border-b last:border-b-0 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>{player}</span>
              {player.includes("Admin") && (
                <span className="bg-purple-100 text-quiz-purple text-xs px-2 py-0.5 rounded ml-auto">
                  Host
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {isAdmin ? (
        <div className="text-center">
          <Button
            onClick={onStartQuiz}
            disabled={loading}
            className="w-full bg-gradient-purple hover:opacity-90"
          >
            {loading ? <LoadingSpinner /> : 'Start Quiz'}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Once you start, no new players can join
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-quiz-purple">
            <LoadingSpinner size={20} />
            <p>Waiting for host to start the quiz...</p>
          </div>
        </div>
      )}
    </GlassmorphicCard>
  );
};

export default WaitingRoom;
