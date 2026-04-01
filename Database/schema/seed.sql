-- Lunar E-Commerce Seed Data for Supabase
-- Sample data for development and testing

-- Insert sample users (password is bcrypt hash of 'password123' and 'admin123456')
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@lunar.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.p5F1z5u3WqG7h3R5G1h8p5E6y7j8K', 'admin'),
('John Doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.p5F1z5u3WqG7h3R5G1h8p5E6y7j8K', 'user'),
('Jane Smith', 'jane@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.p5F1z5u3WqG7h3R5G1h8p5E6y7j8K', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert categories - Men
INSERT INTO categories (name, gender) VALUES
('Shirts', 'men'),
('Pants', 'men'),
('Footwear', 'men'),
('Accessories', 'men'),
('Bags', 'men')
ON CONFLICT (name, gender) DO NOTHING;

-- Insert categories - Women
INSERT INTO categories (name, gender) VALUES
('Tops', 'women'),
('Pants', 'women'),
('Skirts', 'women'),
('Footwear', 'women'),
('Accessories', 'women'),
('Bags', 'women')
ON CONFLICT (name, gender) DO NOTHING;

-- Insert categories - Kids
INSERT INTO categories (name, gender) VALUES
('Boys', 'kids'),
('Girls', 'kids'),
('Footwear', 'kids'),
('Accessories', 'kids')
ON CONFLICT (name, gender) DO NOTHING;

-- Insert sample products - Men
INSERT INTO products (name, brand, description, gender, category_id, price, stock, image_url) VALUES
('Classic Blue Shirt', 'Nike', 'Premium blue cotton shirt for everyday wear', 'men', 1, 49.99, 50, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'),
('Black Slim Fit Pants', 'Adidas', 'Comfortable black pants for work and casual', 'men', 2, 69.99, 30, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400'),
('Running Shoes Pro', 'Puma', 'High-performance running shoes', 'men', 3, 129.99, 25, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'),
('Leather Belt', 'Gucci', 'Premium leather belt with gold buckle', 'men', 4, 89.99, 40, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'),
('Backpack Traveler', 'North Face', 'Durable backpack for travel and everyday', 'men', 5, 99.99, 20, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400');

-- Insert sample products - Women
INSERT INTO products (name, brand, description, gender, category_id, price, stock, image_url) VALUES
('White Tank Top', 'Zara', 'Stylish white tank top for summer', 'women', 6, 39.99, 60, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400'),
('Denim Jeans', 'Levi', 'Classic blue denim jeans', 'women', 7, 79.99, 45, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400'),
('Floral Skirt', 'H&M', 'Beautiful floral midi skirt', 'women', 8, 49.99, 35, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aeae?w=400'),
('Heels Elegant', 'Valentino', 'Red elegant heels', 'women', 9, 159.99, 15, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400'),
('Gold Necklace', 'Tiffany', 'Elegant gold chain necklace', 'women', 10, 249.99, 10, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'),
('Handbag Designer', 'Louis Vuitton', 'Premium leather handbag', 'women', 11, 999.99, 5, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400');

-- Insert sample products - Kids
INSERT INTO products (name, brand, description, gender, category_id, price, stock, image_url) VALUES
('T-Shirt Cartoon', 'Disney', 'Fun cartoon t-shirt for boys', 'kids', 12, 24.99, 100, 'https://images.unsplash.com/photo-1621452773781-43f2e8006d2d?w=400'),
('Pink Dress', 'Baby Gap', 'Cute pink dress for girls', 'kids', 13, 34.99, 50, 'https://images.unsplash.com/photo-1519238263496-6543b3aa74a9?w=400'),
('Sneakers Kids', 'Skechers', 'Comfortable sneakers for kids', 'kids', 14, 54.99, 40, 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400'),
('Kids Cap', 'Adidas', 'Sports cap for kids', 'kids', 15, 19.99, 60, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400');

-- Insert sample orders
INSERT INTO orders (user_id, total_price, status) VALUES
(2, 129.98, 'pending'),
(2, 249.97, 'shipped'),
(3, 99.99, 'delivered');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 49.99),
(1, 4, 1, 79.99),
(2, 6, 1, 39.99),
(2, 8, 1, 209.98),
(3, 5, 1, 99.99);
