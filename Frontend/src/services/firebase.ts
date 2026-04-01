import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

// Standard architected configuration
const firebaseConfig = {
  apiKey: "YOUR_KEY", // Replace with actual
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

/**
 * Native-App Push Notification Handler
 * Requests permission and retrieves the unique user token for real-time delivery.
 */
export const requestPermission = async () => {
  if (!messaging) return;
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY" // Replace with actual
      });
      console.log("Real-time Push Token:", token);
      return token;
    }
  } catch (error) {
    console.error("Error securing push permission:", error);
  }
  return null;
};

// Foreground message listener
if (messaging) {
  onMessage(messaging, (payload) => {
    console.log("Real-time Messaging (Foreground):", payload);
  });
}
