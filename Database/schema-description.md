# Lunar Project: Firestore Schema Description

This document defines the Firestore collection structure for the migrated Lunar project.

> **Legacy reference:** SQL artifacts from an earlier stack (if present) live under `Database/schema/` (`schema.sql`, `seed.sql`) for historical comparison only. The running system uses Firestore as described below.

## Collections

### 1. `users`
Represents the user accounts and profiles.
- **Document ID**: Unique user ID (string).
- **Fields**:
  - `name`: string
  - `email`: string (unique indexed)
  - `password`: string (hashed)
  - `role`: string ("user" or "admin")
  - `oauth_provider`: string (optional)
  - `oauth_id`: string (optional)
  - `profile_image`: string (optional)
  - `created_at`: timestamp
  - `updated_at`: timestamp

### 2. `products`
The product catalog.
- **Document ID**: Unique product ID (string).
- **Fields**:
  - `name`: string
  - `brand`: string
  - `description`: string
  - `gender`: string ("men", "women", "kids")
  - `category_id`: string (reference to category document)
  - `category_name`: string (denormalized for performance)
  - `price`: number (float)
  - `stock`: number (int)
  - `image_url`: string
  - `created_at`: timestamp
  - `updated_at`: timestamp

### 3. `categories`
Product categories organized by gender.
- **Document ID**: Unique category ID (string).
- **Fields**:
  - `name`: string
  - `gender`: string
  - `created_at`: timestamp

### 4. `orders`
Customer orders and status.
- **Document ID**: Unique order ID (string).
- **Fields**:
  - `user_id`: string
  - `user_name`: string
  - `user_email`: string
  - `total_price`: number
  - `status`: string ("pending", "processing", "shipped", "delivered", "cancelled")
  - `items`: array (objects)
    - `product_id`: string
    - `name`: string
    - `brand`: string
    - `image`: string
    - `quantity`: number
    - `price`: number
  - `created_at`: timestamp
  - `updated_at`: timestamp

### 5. `refresh_tokens`
Storage for JWT refresh tokens.
- **Document ID**: Token string or random ID.
- **Fields**:
  - `user_id`: string
  - `token`: string
  - `expires_at`: timestamp
  - `is_revoked`: boolean
  - `revoked_at`: timestamp (optional)
  - `created_at`: timestamp

## Relationships & Denormalization
- **Categories**: Category names are denormalized into product documents to reduce join-like queries.
- **Order Items**: Product details at the time of purchase are snapshotted into the order items array.
- **User Context**: Basic user details (name, email) are stored in orders to avoid redundant user lookups for admin views.
