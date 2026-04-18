import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyDa_8rLSHZl-B2vyz0lyUVDE9amJAgz5X8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "lunar-db-10d04.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "lunar-db-10d04",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "lunar-db-10d04.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "154420566703",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:154420566703:web:c74c5b0471eaf15120925a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-7RNHBSHJGZ",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) =>
      isSupported().then((ok) => {
        if (ok) getAnalytics(app);
      }),
    )
    .catch(() => {
      /* analytics optional */
    });
}

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
