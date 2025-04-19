export interface VerificationResult {
  isValid: boolean;
  token?: string;
  error?: string;
}

export async function verifyToken(userId: string, token: string): Promise<VerificationResult> {
  // Instagram auth has been removed, this is a stub function
  return {
    isValid: false,
    error: 'Instagram authentication has been removed'
  };
}

export async function createToken(userId: string, token: string): Promise<VerificationResult> {
  // Instagram auth has been removed, this is a stub function
  return {
    isValid: false,
    error: 'Instagram authentication has been removed'
  };
}