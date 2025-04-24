
export interface QuizQuestion {
  question_id: string;
  text: string;
  options: string[];
}

export interface RoomStatus {
  started: boolean;
  current_question: number;
  total_questions: number;
  waiting_for_admin: boolean;
}

export interface CreateRoomResponse {
  message: string;
  room_id: string;
  admin_id: string;
  admin_username: string;
  topic: string;
  questions_count: number;
}

export interface JoinRoomResponse {
  message: string;
  user_id: string;
  is_admin: boolean;
  players: string[];
  questions: QuizQuestion[];
  room_status: RoomStatus;
  leaderboard: [string, number][];
}

export interface RoomStatusResponse {
  name: string;
  topic: string;
  players: string[];
  current_question: number;
  total_questions: number;
  scores: Record<string, number>;
  started: boolean;
  admin_id: string;
  waiting_for_admin: boolean;
  leaderboard: [string, number][];
}

export interface SubmitAnswerResponse {
  correct: boolean;
  correct_answer: string;
  points_earned: number;
  current_score: number;
  leaderboard: [string, number][];
}

export interface StartQuizResponse {
  message: string;
  started: boolean;
}
