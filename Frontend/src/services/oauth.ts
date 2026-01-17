/**
 * OAuth Service
 * Handles Google and Apple OAuth authentication
 */

import { api } from './apiClient';

export interface GoogleAuthResponse {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface AppleAuthResponse {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface OAuthLoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
    profileImage?: string;
  };
}

/**
 * Handle Google OAuth login
 */
export const loginWithGoogle = async (
  googleAuthData: GoogleAuthResponse
): Promise<OAuthLoginResponse> => {
  return api.post<OAuthLoginResponse>('/auth/oauth/google/callback', {
    id: googleAuthData.id,
    email: googleAuthData.email,
    name: googleAuthData.name,
    picture: googleAuthData.picture,
  });
};

/**
 * Handle Apple OAuth login
 */
export const loginWithApple = async (
  appleAuthData: AppleAuthResponse
): Promise<OAuthLoginResponse> => {
  return api.post<OAuthLoginResponse>('/auth/oauth/apple/callback', {
    sub: appleAuthData.sub,
    email: appleAuthData.email,
    name: appleAuthData.name,
    picture: appleAuthData.picture,
  });
};

/**
 * Link social account to existing user
 */
export const linkSocialAccount = async (
  provider: 'google' | 'apple',
  id: string,
  picture?: string
): Promise<{ message: string }> => {
  return api.post<{ message: string }>('/auth/oauth/link-social', {
    provider,
    id,
    picture,
  });
};

/**
 * Initialize Google OAuth SDK
 */
export const initializeGoogleOAuth = (clientId: string) => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  window.onload = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
      });
    }
  };
};

/**
 * Initialize Apple OAuth SDK
 */
export const initializeAppleOAuth = () => {
  const script = document.createElement('script');
  script.src = 'https://appleid.cdn-apple.com/apid/v1/apple-id-sdk.js';
  script.async = true;
  document.head.appendChild(script);

  window.onload = () => {
    if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
        teamId: import.meta.env.VITE_APPLE_TEAM_ID,
        keyId: import.meta.env.VITE_APPLE_KEY_ID,
        redirectUri: `${import.meta.env.VITE_API_BASE_URL}/auth/oauth/apple/callback`,
        scope: 'name email',
        usePopup: true,
      });
    }
  };
};

/**
 * Handle Google OAuth response
 */
const handleGoogleResponse = async (response: any) => {
  try {
    // Decode JWT from Google
    const decoded = JSON.parse(atob(response.credential.split('.')[1]));

    const loginResponse = await loginWithGoogle({
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture || '',
    });

    return loginResponse;
  } catch (error) {
    console.error('Google OAuth error:', error);
    throw error;
  }
};

/**
 * Global window types for OAuth
 */
declare global {
  interface Window {
    google?: any;
    AppleID?: any;
    onload?: () => void;
  }
}
