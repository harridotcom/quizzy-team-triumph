
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CreateRoomForm from '@/components/CreateRoomForm';

const CreateRoom: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <div className="container mx-auto p-4">
        <Link to="/" className="inline-flex items-center text-white hover:underline mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-8">Create Quiz Room</h1>
          <CreateRoomForm />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
