
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CreateRoomForm from '@/components/CreateRoomForm';
import TeamBanner from '@/components/TeamBanner';

const CreateRoom: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <div className="container mx-auto p-4 flex-1">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="flex flex-col items-center justify-center flex-1 -mt-16">
          <div className="w-full max-w-md space-y-8 animate-float">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Create Quiz Room
              </h1>
              <p className="text-muted-foreground">
                Set up your room and invite friends to join!
              </p>
            </div>
            <CreateRoomForm />
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <TeamBanner />
      </div>
    </div>
  );
};

export default CreateRoom;
