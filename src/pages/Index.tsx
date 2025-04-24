
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size={40} />
    </div>
  );
};

export default Index;
