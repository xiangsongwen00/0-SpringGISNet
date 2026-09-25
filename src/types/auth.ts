export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface AuthUser {
  user_uuid: string;
  username: string;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string | null;
  token_type: 'bearer';
  expires_in: number;
  user: AuthUser;
}

export interface ApiErrorBody {
  detail?: string | Array<{ msg: string }>;
}

export interface SecurityQuestion {
  id: string;
  prompt: string;
}

export interface SecurityAnswerInput {
  question_id: string;
  answer: string;
}

