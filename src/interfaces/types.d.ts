export interface ResponsiveData<T> {
  status: number;
  message: string;
  data: T;
}

export interface AuthResponse extends ResponsiveData<User> {
  token: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  image: Image;
}

export interface Image {
  id: number;
  name: string;
}
