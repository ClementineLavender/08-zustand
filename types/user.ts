export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username: string;
}