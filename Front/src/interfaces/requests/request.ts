export interface Request<T> {
  status: number;
  message: string;
  data: T;
}
