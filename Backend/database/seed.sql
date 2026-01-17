/**
 * Lunar E-Commerce Database Seed Data
 * Sample data for development and testing
 */

USE lunar_db;

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@lunar.com', '$2a$10$YJvUcK5qVk5kXrxqPqPpKu8VqK8xL5l8K8xL5l8K8xL5l8K8xL5l8', 'admin'),
('John Doe', 'john@example.com', '$2a$10$YJvUcK5qVk5kXrxqPqPpKu8VqK8xL5l8K8xL5l8K8xL5l8K8xL5l8', 'user'),
('Jane Smith', 'jane@example.com', '$2a$10$YJvUcK5qVk5kXrxqPqPpKu8VqK8xL5l8K8xL5l8K8xL5l8K8xL5l8', 'user');

-- Insert categories - Men
INSERT INTO categories (name, gender) VALUES
('Shirts', 'men'),
('Pants', 'men'),
('Footwear', 'men'),
('Accessories', 'men'),
('Bags', 'men');

-- Insert categories - Women
INSERT INTO categories (name, gender) VALUES
('Tops', 'women'),
('Pants', 'women'),
('Skirts', 'women'),
('Footwear', 'women'),
('Accessories', 'women'),
('Bags', 'women');

-- Insert categories - Kids
INSERT INTO categories (name, gender) VALUES
('Boys', 'kids'),
('Girls', 'kids'),
('Footwear', 'kids'),
('Accessories', 'kids');

-- Insert sample products - Men
INSERT INTO products (name, brand, description, gender, category_id, price, stock, image_url) VALUES
('Classic Blue Shirt', 'Nike', 'Premium blue cotton shirt for everyday wear', 'men', 1, 49.99, 50, 'https://via.placeholder.com/300'),
('Black Slim Fit Pants', 'Adidas', 'Comfortable black pants for work and casual', 'men', 2, 69.99, 30, 'https://via.placeholder.com/300'),
('Running Shoes Pro', 'Puma', 'High-performance running shoes', 'men', 3, 129.99, 25, 'https://via.placeholder.com/300'),
('Leather Belt', 'Gucci', 'Premium leather belt with gold buckle', 'men', 4, 89.99, 40, 'https://via.placeholder.com/300'),
('Backpack Traveler', 'North Face', 'Durable backpack for travel and everyday', 'men', 5, 99.99, 20, 'https://via.placeholder.com/300');

-- Insert sample products - Women
INSERT INTO products (name, brand, description, gender, category_id, price, stock, image_url) VALUES
('White Tank Top', 'Zara', 'Stylish white tank top for summer', 'women', 6, 39.99, 60, 'https://via.placeholder.com/300'),
('Denim Jeans', 'Levi', 'Classic blue denim jeans', 'women', 7, 79.99, 45, 'https://via.placeholder.com/300'),
('Floral Skirt', 'H&M', 'Beautiful floral midi skirt', 'women', 8, 49.99, 35, 'https://via.placeholder.com/300'),
('Heels Elegant', 'Valentino', 'Red elegant heels', 'women', 9, 159.99, 15, 'https://via.placeholder.com/300'),
('Gold Necklace', 'Tiffany', 'Elegant gold chain necklace', 'women', 10, 249.99, 10, 'https://via.placeholder.com/300'),
('Handbag Designer', 'Louis Vuitton', 'Premium leather handbag', 'women', 11, 999.99, 5, 'https://via.placeholder.com/300');

-- Insert sample products - Kids
INSERT INTO products (name, brand, description, gender, category_id, price, stock, image_url) VALUES
('T-Shirt Cartoon', 'Disney', 'Fun cartoon t-shirt for boys', 'kids', 12, 24.99, 100, 'https://via.placeholder.com/300'),
('Pink Dress', 'Baby Gap', 'Cute pink dress for girls', 'kids', 13, 34.99, 50, 'https://via.placeholder.com/300'),
('Sneakers Kids', 'Skechers', 'Comfortable sneakers for kids', 'kids', 14, 54.99, 40, 'https://via.placeholder.com/300'),
('Kids Cap', 'Adidas', 'Sports cap for kids', 'kids', 15, 19.99, 60, 'https://via.placeholder.com/300');

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
