/// <reference types="vite/client" />

interface GoogleAccountsId {
  initialize: (config: any) => void;
  renderButton: (element: HTMLElement | null, options: any) => void;
  prompt: (callback?: (notification: any) => void) => void;
  cancel: () => void;
  oneTap: (config: any) => void;
}

interface GoogleAccounts {
  id: GoogleAccountsId;
}

declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts;
    };
    AppleID?: {
      auth: {
        init: (config: any) => void;
        signIn: () => Promise<any>;
      };
    };
  }
}

export {};
