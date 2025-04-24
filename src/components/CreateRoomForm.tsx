
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingSpinner from './LoadingSpinner';
import GlassmorphicCard from './GlassmorphicCard';
import { createRoom } from '@/services/quizService';
import { toast } from 'sonner';

const CreateRoomForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(5);
  const [rounds, setRounds] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !topic.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await createRoom(name, topic, maxPlayers, rounds);
      
      // Store the admin details in localStorage
      localStorage.setItem('roomId', response.room_id);
      localStorage.setItem('adminId', response.admin_id);
      localStorage.setItem('userId', response.admin_id);
      localStorage.setItem('username', response.admin_username);
      localStorage.setItem('isAdmin', 'true');
      
      toast.success(`Room ${response.room_id} created successfully!`);
      navigate(`/room/${response.room_id}`);
    } catch (error) {
      console.error('Failed to create room:', error);
      toast.error('Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassmorphicCard className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-quiz-purple">Create Quiz Room</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Room Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter room name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="topic">Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Science, History, etc."
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxPlayers">Max Players</Label>
            <Input
              id="maxPlayers"
              type="number"
              min={2}
              max={20}
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rounds">Rounds</Label>
            <Input
              id="rounds"
              type="number"
              min={1}
              max={20}
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value))}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-purple hover:opacity-90"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : 'Create Room'}
        </Button>
      </form>
    </GlassmorphicCard>
  );
};

export default CreateRoomForm;
