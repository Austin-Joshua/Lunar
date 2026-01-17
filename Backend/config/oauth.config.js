/**
 * OAuth Configuration
 * Handles Google and Apple OAuth setup
 */

require('dotenv').config();

const oauthConfig = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
    scope: ['profile', 'email'],
  },
  apple: {
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    bundleID: process.env.APPLE_BUNDLE_ID,
    keyPath: process.env.APPLE_KEY_PATH,
    callbackURL: process.env.APPLE_CALLBACK_URL || 'http://localhost:5000/api/auth/apple/callback',
    scope: ['name', 'email'],
  },
};

// Validate OAuth configuration
const validateOAuthConfig = () => {
  const errors = [];

  if (!oauthConfig.google.clientID) {
    errors.push('GOOGLE_CLIENT_ID is not configured');
  }
  if (!oauthConfig.google.clientSecret) {
    errors.push('GOOGLE_CLIENT_SECRET is not configured');
  }

  if (errors.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  OAuth configuration warnings:');
    errors.forEach(error => console.warn(`  - ${error}`));
  }
};

validateOAuthConfig();

module.exports = oauthConfig;
