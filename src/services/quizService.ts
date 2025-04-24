
import { 
  CreateRoomResponse, 
  JoinRoomResponse, 
  RoomStatusResponse, 
  StartQuizResponse, 
  SubmitAnswerResponse 
} from '../types/quiz';

const API_URL = 'https://quizgame-shreekant-parmeshwar-tanmay.onrender.com';

export async function createRoom(name: string, topic: string, max_players: number, rounds: number): Promise<CreateRoomResponse> {
  const response = await fetch(`${API_URL}/create-room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, topic, max_players, rounds }),
  });

  if (!response.ok) {
    throw new Error('Failed to create room');
  }

  return response.json();
}

export async function joinRoom(roomId: string, username: string): Promise<JoinRoomResponse> {
  const response = await fetch(`${API_URL}/join-room/${roomId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error('Failed to join room');
  }

  return response.json();
}

export async function startQuiz(roomId: string, adminId: string): Promise<StartQuizResponse> {
  const response = await fetch(`${API_URL}/start-quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ room_id: roomId, admin_id: adminId }),
  });

  if (!response.ok) {
    throw new Error('Failed to start quiz');
  }

  return response.json();
}

export async function submitAnswer(
  roomId: string, 
  userId: string, 
  questionId: string, 
  answer: string
): Promise<SubmitAnswerResponse> {
  const response = await fetch(`${API_URL}/submit-answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room_id: roomId,
      user_id: userId,
      question_id: questionId,
      answer,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }

  return response.json();
}

export async function getRoomStatus(roomId: string): Promise<RoomStatusResponse> {
  const response = await fetch(`${API_URL}/room/${roomId}`);

  if (!response.ok) {
    throw new Error('Failed to get room status');
  }

  return response.json();
}
