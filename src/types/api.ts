export interface SignInData {
  email: string;
  password: string;
}

export type SignInRequest = SignInData;

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
}

export interface CreateHabitData {
  name: string;
  description?: string;
  category: string;
  color: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface SignUpResponse {
  message: string;
} 