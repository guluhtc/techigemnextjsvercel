export interface TokenInfo {
  isValid: boolean;
  expiresIn?: number;
  error?: string;
}

export async function verifyToken(userId: string): Promise<TokenInfo> {
  // Instagram auth has been removed, this is a stub function
  return {
    isValid: false,
    error: 'Instagram authentication has been removed'
  };
}

export async function refreshToken(userId: string): Promise<TokenInfo> {
  // Instagram auth has been removed, this is a stub function
  return {
    isValid: false,
    error: 'Instagram authentication has been removed'
  };
}