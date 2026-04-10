# Firebase configuration (service account)

Place your **Firebase service account private key JSON** here for local and server use.

## Setup

1. In [Firebase Console](https://console.firebase.google.com/) → Project settings → Service accounts → **Generate new private key**.
2. Save the file as `service-account.json` in this directory.

   **Do not commit this file.** It is ignored via `.gitignore` patterns for `*service-account*.json` / `firebase*.json`.

3. Point the backend at the file using `FIREBASE_SERVICE_ACCOUNT` in the repo-root `.env`, for example:

   ```text
   FIREBASE_SERVICE_ACCOUNT=../Database/firebase-config/service-account.json
   ```

   When you run the API from `Backend/`, use a path relative to that working directory (as above).

Alternatively, set `GOOGLE_APPLICATION_CREDENTIALS` to the absolute path of the same JSON file; the Admin SDK will pick it up when no `FIREBASE_SERVICE_ACCOUNT` is set (depending on your deployment).

## Requirements

- Firestore enabled on the project.
- (Optional) Firebase Cloud Messaging if you use push notifications from the backend.
