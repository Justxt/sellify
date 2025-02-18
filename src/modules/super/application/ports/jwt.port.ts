export interface IJwtPort {
  sign(payload: any): string;
  verify(token: string): any;
}
