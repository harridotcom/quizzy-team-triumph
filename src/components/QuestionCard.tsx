
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassmorphicCard from './GlassmorphicCard';
import LoadingSpinner from './LoadingSpinner';
import { QuizQuestion, SubmitAnswerResponse } from '@/types/quiz';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  onSubmit: (answer: string) => Promise<SubmitAnswerResponse>;
  onNext: () => void;
  currentQuestionNumber: number;
  totalQuestions: number;
  isLastQuestion: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSubmit,
  onNext,
  currentQuestionNumber,
  totalQuestions,
  isLastQuestion
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitAnswerResponse | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (option: string) => {
    if (!answered) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer || loading || answered) return;
    
    setLoading(true);
    
    try {
      const result = await onSubmit(selectedAnswer);
      setResult(result);
      setAnswered(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassmorphicCard className="w-full max-w-2xl transition-all">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQuestionNumber} of {totalQuestions}
        </span>
        
        {answered && (
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${result?.correct ? 'bg-green-500' : 'bg-quiz-red'}`}>
            {result?.correct ? (
              <>
                <Check size={16} />
                <span>Correct</span>
              </>
            ) : (
              <>
                <X size={16} />
                <span>Incorrect</span>
              </>
            )}
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = answered && result?.correct_answer === option;
          const isWrong = answered && selectedAnswer === option && !result?.correct;
          
          let optionClass = "p-4 border rounded-md transition-all cursor-pointer hover:border-quiz-purple";
          
          if (answered) {
            if (isCorrect) {
              optionClass = "p-4 border rounded-md bg-green-100 border-green-500 text-green-700";
            } else if (isWrong) {
              optionClass = "p-4 border rounded-md bg-red-100 border-red-500 text-red-700";
            } else if (isSelected) {
              optionClass = "p-4 border rounded-md border-quiz-purple bg-purple-50";
            } else if (result?.correct_answer === option) {
              optionClass = "p-4 border rounded-md bg-green-50 border-green-300";
            }
          } else if (isSelected) {
            optionClass = "p-4 border rounded-md border-quiz-purple bg-purple-50";
          }
          
          return (
            <div
              key={option}
              className={optionClass}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end gap-3">
        {!answered ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedAnswer || loading}
            className="bg-gradient-purple hover:opacity-90"
          >
            {loading ? <LoadingSpinner /> : 'Submit Answer'}
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            className={cn(
              "bg-gradient-purple hover:opacity-90",
              isLastQuestion && "bg-green-500 hover:bg-green-600"
            )}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </div>
    </GlassmorphicCard>
  );
};

export default QuestionCard;
