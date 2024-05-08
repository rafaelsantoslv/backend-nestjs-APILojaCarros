export interface JwtPayload {
    sub: number;
    username: string;
  }
  
  export interface DecodedToken {
    sub: number;
    username: string;
    iat: number;
    exp: number;
  }