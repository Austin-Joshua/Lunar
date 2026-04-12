import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "YOUR_APP_ID",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export const requestFirebaseToken = async () => {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY ?? "YOUR_VAPID_KEY",
      });
      if (import.meta.env.DEV) console.log("FCM Token:", token);
      return token;
    }
  } catch (error) {
    console.error("Error requesting Firebase token:", error);
  }
  return null;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      if (import.meta.env.DEV) console.log("Foreground message:", payload);
      resolve(payload);
    });
  });

export { app, messaging };
