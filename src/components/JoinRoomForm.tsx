
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingSpinner from './LoadingSpinner';
import GlassmorphicCard from './GlassmorphicCard';
import { joinRoom } from '@/services/quizService';
import { toast } from 'sonner';

interface JoinRoomFormProps {
  initialRoomId?: string;
}

const JoinRoomForm: React.FC<JoinRoomFormProps> = ({ initialRoomId = '' }) => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(initialRoomId);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomId.trim() || !username.trim()) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setLoading(true);

    try {
      const response = await joinRoom(roomId, username);
      
      // Store user details in localStorage
      localStorage.setItem('roomId', roomId);
      localStorage.setItem('userId', response.user_id);
      localStorage.setItem('username', username);
      localStorage.setItem('isAdmin', response.is_admin.toString());
      
      toast.success(`Joined room successfully!`);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Failed to join room:', error);
      toast.error('Failed to join room. Please check the Room ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassmorphicCard className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-quiz-purple">Join Quiz Room</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Your Name</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
            autoComplete="off"
            className="uppercase"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="roomId">Room ID</Label>
          <Input
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            placeholder="Enter room code"
            required
            autoComplete="off"
            className="uppercase"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-purple hover:opacity-90"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : 'Join Room'}
        </Button>
      </form>
    </GlassmorphicCard>
  );
};

export default JoinRoomForm;
