import jwtDecode from "jwt-decode";

interface Token {
  exp: number;
}

/**
 * Check if a token is expired.
 * @param token The token string to check.
 * @returns True if the token is expired, false otherwise.
 */
export const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwtDecode<Token>(token);
  return decodedToken.exp < Date.now() / 1000;
};
