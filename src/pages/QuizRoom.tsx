
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy } from 'lucide-react';
import WaitingRoom from '@/components/WaitingRoom';
import QuestionCard from '@/components/QuestionCard';
import ResultsCard from '@/components/ResultsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import CopyButton from '@/components/CopyButton';
import Leaderboard from '@/components/Leaderboard';
import { toast } from 'sonner';

import { 
  getRoomStatus, 
  joinRoom, 
  startQuiz, 
  submitAnswer
} from '@/services/quizService';

import { 
  JoinRoomResponse,
  QuizQuestion,
  RoomStatusResponse,
  SubmitAnswerResponse
} from '@/types/quiz';

type QuizState = 'loading' | 'waiting' | 'playing' | 'results';

const QuizRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [state, setState] = useState<QuizState>('loading');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Room data
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [leaderboard, setLeaderboard] = useState<[string, number][]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [topic, setTopic] = useState<string>('');
  
  // User data
  const [roomId, setRoomId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Polling status
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize from localStorage or redirect to home
  useEffect(() => {
    const storedRoomId = localStorage.getItem('roomId');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!id || !storedRoomId || !storedUserId || storedRoomId !== id) {
      // Invalid state, redirect to join page with room ID
      if (id) {
        navigate(`/join/${id}`);
      } else {
        navigate('/');
      }
      return;
    }
    
    setRoomId(storedRoomId);
    setUserId(storedUserId);
    setUsername(storedUsername || '');
    setIsAdmin(storedIsAdmin);
    
    // Load initial room data
    fetchRoomData();
  }, [id, navigate]);
  
  // Polling for room status when in waiting state
  useEffect(() => {
    if (state === 'waiting') {
      const interval = setInterval(checkRoomStatus, 5000);
      setPollInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (pollInterval) {
        clearInterval(pollInterval);
        setPollInterval(null);
      }
    }
  }, [state]);
  
  // Cleanup effect
  useEffect(() => {
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  const fetchRoomData = async () => {
    if (!id) return;
    
    setLoading(true);
    
    try {
      // Try to join room with stored username
      const username = localStorage.getItem('username') || '';
      const response = await joinRoom(id, username);
      
      // Update room and game state
      updateRoomDataFromResponse(response);
      
      // Determine initial state
      if (response.room_status.started) {
        setState('playing');
      } else {
        setState('waiting');
      }
    } catch (error) {
      console.error('Failed to load room data:', error);
      toast.error('Failed to load room data');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };
  
  const checkRoomStatus = async () => {
    if (!roomId) return;
    
    try {
      const status = await getRoomStatus(roomId);
      
      if (status.started && state === 'waiting') {
        // Quiz started, update state
        setCurrentQuestion(status.current_question);
        setTotalQuestions(status.total_questions);
        setLeaderboard(status.leaderboard);
        setPlayers(status.players);
        setState('playing');
        toast.success('Quiz started!');
      }
    } catch (error) {
      console.error('Failed to check room status:', error);
    }
  };
  
  const updateRoomDataFromResponse = (response: JoinRoomResponse) => {
    setQuestions(response.questions);
    setLeaderboard(response.leaderboard);
    setPlayers(response.players);
    setCurrentQuestion(response.room_status.current_question);
    setTotalQuestions(response.room_status.total_questions);
  };
  
  const handleStartQuiz = async () => {
    if (!roomId || !isAdmin) return;
    
    setActionLoading(true);
    
    try {
      const adminId = localStorage.getItem('adminId');
      
      if (!adminId) {
        toast.error('Admin ID not found. Please create a new room.');
        return;
      }
      
      await startQuiz(roomId, adminId);
      setState('playing');
      toast.success('Quiz started!');
    } catch (error) {
      console.error('Failed to start quiz:', error);
      toast.error('Failed to start the quiz');
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleSubmitAnswer = async (answer: string): Promise<SubmitAnswerResponse> => {
    if (!roomId || !userId || !questions[currentQuestion]) {
      throw new Error('Invalid state for submitting answer');
    }
    
    const questionId = questions[currentQuestion].question_id;
    
    try {
      const result = await submitAnswer(roomId, userId, questionId, answer);
      setLeaderboard(result.leaderboard);
      return result;
    } catch (error) {
      console.error('Failed to submit answer:', error);
      toast.error('Failed to submit answer');
      throw error;
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= totalQuestions) {
      // Quiz completed
      setState('results');
    } else {
      // Next question
      setCurrentQuestion(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center">
        <LoadingSpinner size={40} className="text-white" />
        <p className="text-white mt-4">Loading quiz room...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center text-white hover:underline">
            <ArrowLeft size={20} className="mr-2" />
            Exit Quiz
          </Link>
          
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-md backdrop-blur-sm">
            <span className="text-white font-mono">Room: {roomId}</span>
            <CopyButton text={roomId} className="h-7 px-2 py-0" />
          </div>
        </div>
        
        <div className="flex justify-center">
          {state === 'waiting' && (
            <WaitingRoom
              roomId={roomId}
              players={players}
              isAdmin={isAdmin}
              onStartQuiz={handleStartQuiz}
              loading={actionLoading}
            />
          )}
          
          {state === 'playing' && questions[currentQuestion] && (
            <div className="w-full flex flex-col md:flex-row gap-6 items-start justify-center">
              <QuestionCard
                question={questions[currentQuestion]}
                onSubmit={handleSubmitAnswer}
                onNext={handleNextQuestion}
                currentQuestionNumber={currentQuestion + 1}
                totalQuestions={totalQuestions}
                isLastQuestion={currentQuestion + 1 === totalQuestions}
              />
              
              <div className="w-full md:w-auto md:flex-shrink-0">
                <Leaderboard leaderboard={leaderboard} />
              </div>
            </div>
          )}
          
          {state === 'results' && (
            <ResultsCard leaderboard={leaderboard} username={username} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizRoom;
