# Lunar - E-Commerce Platform

A modern, full-featured e-commerce platform built with React, Vite, TypeScript, and Tailwind CSS. The project includes both customer-facing and admin dashboard interfaces.

## 🎨 Features

### Frontend Features
- **Product Catalog**: Browse products organized by categories (Men, Women, Kids)
- **Shopping Cart**: Add/remove products with persistent storage
- **User Authentication**: Register and login functionality
- **Order Management**: View order history and tracking
- **Admin Dashboard**: Complete admin interface for managing products, users, orders, and categories
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### Technology Stack
- **React 18.3** - UI framework
- **Vite 5.4** - Fast build tool
- **TypeScript** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **React Router 6.30** - Client-side routing
- **React Hook Form** - Form state management
- **React Query 5.83** - Data fetching and caching
- **Zod 3.25** - Schema validation

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── admin/               # Admin dashboard module
│   │   ├── components/      # Admin-specific components
│   │   ├── pages/           # Admin pages (Dashboard, Products, etc.)
│   │   ├── context/         # Admin authentication context
│   │   └── services/        # Admin API services
│   ├── components/          # Reusable UI components
│   │   └── ui/             # Shadcn/ui components
│   ├── context/            # Global state management
│   ├── hooks/              # Custom React hooks
│   ├── modules/            # Feature modules (Men, Women, Kids)
│   ├── pages/              # Main application pages
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v22.17.0 or higher)
- npm (v10.9.2 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Lunar.git
cd Lunar/Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080/`

## 📦 Available Scripts

In the `Frontend/` directory, you can run:

### Development
```bash
npm run dev       # Start development server
```

### Building
```bash
npm run build     # Build for production
npm run build:dev # Build in development mode
```

### Testing
```bash
npm run test       # Run tests once
npm run test:watch # Run tests in watch mode
```

### Linting
```bash
npm run lint      # Check code quality
```

### Preview
```bash
npm run preview   # Preview production build locally
```

## 🗂️ Key Modules

### Admin Dashboard
- **Dashboard**: Overview and analytics
- **Products**: Manage product catalog
- **Categories**: Manage product categories
- **Orders**: Track and manage orders
- **Users**: User management
- **Add/Edit Products**: Product creation and modification

### Customer Portal
- **Home**: Main landing page
- **Product List**: Browse all products
- **Category Pages**: Shop by category (Men, Women, Kids)
- **Product Details**: Detailed product information
- **Cart**: Shopping cart with checkout
- **Orders**: Order history and tracking
- **Authentication**: Register and login

## 🎨 Design System

The project uses **Shadcn/ui** for consistent, accessible components:
- Buttons, Cards, Inputs
- Forms, Dialogs, Modals
- Tables, Pagination
- Alerts, Toasts
- And many more...

All components are customizable through Tailwind CSS.

## 📝 Component Organization

- **UI Components**: Reusable, presentational components in `components/ui/`
- **Feature Components**: Business logic components in respective modules
- **Layout Components**: Application layout components
- **Admin Components**: Admin-specific components in `admin/components/`

## 🔐 Authentication

- User authentication context for customer portal
- Admin authentication context for admin dashboard
- Protected routes for secure access

## 🌐 API Integration

- Centralized API service layer in `services/api.ts`
- Admin API service in `admin/services/api.ts`
- Ready for backend integration

## 🛠️ Development

### Code Quality
- ESLint configuration for code consistency
- TypeScript for type safety
- React Refresh for hot module reloading

### Testing
- Vitest for unit testing
- React Testing Library for component testing

## 📱 Responsive Design

The application is fully responsive using Tailwind CSS breakpoints:
- Mobile-first approach
- Tablet-optimized layouts
- Full desktop experience

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The optimized build will be in the `dist/` folder, ready to deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by Austi

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Live Development Server**: http://localhost:8080/
**Network Access**: http://192.168.1.43:8080/
