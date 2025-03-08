export interface JwtPayload {
  sub: number; // The user's unique ID
  email: string; // The user's email
  role: string; // The user's role (e.g., 'admin', 'user')
}
