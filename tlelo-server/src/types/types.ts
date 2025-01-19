export interface ReturnBody<T> {
  status: number;
  message: string;
  data: T;
}

export interface ReturnUserBody<T> extends ReturnBody<T> {
  token: string;
}
