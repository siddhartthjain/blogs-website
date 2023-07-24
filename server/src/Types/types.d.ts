

declare namespace Express {
  export interface Request {
    user: Record<string,any>|null;
  }
  export interface Response {
    user: Record<string,any>|null;
  }
}