import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Loading component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

// Context Providers
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AdminAuthProvider } from "@/admin/context/AdminAuthContext";
import { requestFirebaseToken, onMessageListener } from "@/lib/firebase";

// Customer Layout Components
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageTransition } from "@/components/PageTransition";

// Admin Components
import { AdminLayout } from "@/admin/components/AdminLayout";
import { AdminProtectedRoute } from "@/admin/components/AdminProtectedRoute";

// Lazy Pages
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const DashboardHome = lazy(() => import("@/pages/Home")); // Use Home as the public landing
const SearchPage = lazy(() => import("@/pages/Search"));
const Cart = lazy(() => import("@/pages/Cart"));
const Orders = lazy(() => import("@/pages/Orders"));
const Settings = lazy(() => import("@/pages/Settings"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Admin Lazy
const AdminLogin = lazy(() => import("@/admin/pages/AdminLogin"));
const Dashboard = lazy(() => import("@/admin/pages/Dashboard"));
const Products = lazy(() => import("@/admin/pages/Products"));
const AddProduct = lazy(() => import("@/admin/pages/AddProduct"));
const EditProduct = lazy(() => import("@/admin/pages/EditProduct"));
const AdminOrders = lazy(() => import("@/admin/pages/Orders"));
const Users = lazy(() => import("@/admin/pages/Users"));
const Categories = lazy(() => import("@/admin/pages/Categories"));
const AdminNotFound = lazy(() => import("@/admin/pages/AdminNotFound"));

// Men
const MenHome = lazy(() => import("@/modules/Men/MenHome"));
const Shirts = lazy(() => import("@/modules/Men/Subcategories").then(m => ({ default: m.Shirts })));
const MenPants = lazy(() => import("@/modules/Men/Subcategories").then(m => ({ default: m.MenPants })));
const MenFootwear = lazy(() => import("@/modules/Men/Subcategories").then(m => ({ default: m.MenFootwear })));
const MenAccessories = lazy(() => import("@/modules/Men/Subcategories").then(m => ({ default: m.MenAccessories })));
const MenBags = lazy(() => import("@/modules/Men/Subcategories").then(m => ({ default: m.MenBags })));

// Women
const WomenHome = lazy(() => import("@/modules/Women/WomenHome"));
const Tops = lazy(() => import("@/modules/Women/Subcategories").then(m => ({ default: m.Tops })));
const WomenPants = lazy(() => import("@/modules/Women/Subcategories").then(m => ({ default: m.WomenPants })));
const Skirts = lazy(() => import("@/modules/Women/Subcategories").then(m => ({ default: m.Skirts })));
const WomenFootwear = lazy(() => import("@/modules/Women/Subcategories").then(m => ({ default: m.WomenFootwear })));
const WomenAccessories = lazy(() => import("@/modules/Women/Subcategories").then(m => ({ default: m.WomenAccessories })));
const WomenBags = lazy(() => import("@/modules/Women/Subcategories").then(m => ({ default: m.WomenBags })));

// Kids
const KidsHome = lazy(() => import("@/modules/Kids/KidsHome"));
const Boys = lazy(() => import("@/modules/Kids/Subcategories").then(m => ({ default: m.Boys })));
const Girls = lazy(() => import("@/modules/Kids/Subcategories").then(m => ({ default: m.Girls })));
const KidsFootwear = lazy(() => import("@/modules/Kids/Subcategories").then(m => ({ default: m.KidsFootwear })));
const KidsAccessories = lazy(() => import("@/modules/Kids/Subcategories").then(m => ({ default: m.KidsAccessories })));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <PageTransition><Home /></PageTransition>
            </main>
            <Footer />
          </div>
        } path="/" />

        <Route path="/signin" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Register /></PageTransition>} />

        {/* ========== ADMIN ROUTES ========== */}
        <Route path="/admin/login" element={
          <AdminAuthProvider>
            <PageTransition><AdminLogin /></PageTransition>
          </AdminAuthProvider>
        } />
        <Route path="/admin" element={
          <AdminAuthProvider>
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          </AdminAuthProvider>
        }>
          <Route path="dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="products/add" element={<PageTransition><AddProduct /></PageTransition>} />
          <Route path="products/edit/:id" element={<PageTransition><EditProduct /></PageTransition>} />
          <Route path="orders" element={<PageTransition><AdminOrders /></PageTransition>} />
          <Route path="users" element={<PageTransition><Users /></PageTransition>} />
          <Route path="categories" element={<PageTransition><Categories /></PageTransition>} />
          <Route path="*" element={<AdminNotFound />} />
        </Route>

        {/* ========== PROTECTED SHOP DASHBOARD ========== */}
        <Route path="/shop/*" element={
          <ProtectedRoute>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pb-16 md:pb-0">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
                    <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                    <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
                    <Route path="/orders" element={<PageTransition><Orders /></PageTransition>} />
                    <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
                    <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />

                    {/* Men */}
                    <Route path="/men" element={<PageTransition><MenHome /></PageTransition>} />
                    <Route path="/men/shirts" element={<PageTransition><Shirts /></PageTransition>} />
                    <Route path="/men/pants" element={<PageTransition><MenPants /></PageTransition>} />
                    <Route path="/men/footwear" element={<PageTransition><MenFootwear /></PageTransition>} />
                    <Route path="/men/accessories" element={<PageTransition><MenAccessories /></PageTransition>} />
                    <Route path="/men/bags" element={<PageTransition><MenBags /></PageTransition>} />

                    {/* Women */}
                    <Route path="/women" element={<PageTransition><WomenHome /></PageTransition>} />
                    <Route path="/women/tops" element={<PageTransition><Tops /></PageTransition>} />
                    <Route path="/women/pants" element={<PageTransition><WomenPants /></PageTransition>} />
                    <Route path="/women/skirts" element={<PageTransition><Skirts /></PageTransition>} />
                    <Route path="/women/footwear" element={<PageTransition><WomenFootwear /></PageTransition>} />
                    <Route path="/women/accessories" element={<PageTransition><WomenAccessories /></PageTransition>} />
                    <Route path="/women/bags" element={<PageTransition><WomenBags /></PageTransition>} />

                    {/* Kids */}
                    <Route path="/kids" element={<PageTransition><KidsHome /></PageTransition>} />
                    <Route path="/kids/boys" element={<PageTransition><Boys /></PageTransition>} />
                    <Route path="/kids/girls" element={<PageTransition><Girls /></PageTransition>} />
                    <Route path="/kids/footwear" element={<PageTransition><KidsFootwear /></PageTransition>} />
                    <Route path="/kids/accessories" element={<PageTransition><KidsAccessories /></PageTransition>} />

                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                  </Routes>
                </AnimatePresence>
              </main>
              <BottomNav />
              <Footer />
            </div>
          </ProtectedRoute>
        } />

        {/* Redirect legacy */}
        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/auth-landing" element={<Navigate to="/" replace />} />
        
        {/* Global Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  React.useEffect(() => {
    // Request permission on mount
    const setupFirebase = async () => {
      const token = await requestFirebaseToken();
      if (token) {
        // Send token to backend or store in user context
        console.log('FCM Token successfully retrieved');
      }
    };
    
    setupFirebase();
    
    onMessageListener().then((payload: any) => {
      console.log('Foreground notification received:', payload);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <CartProvider>
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <AnimatedRoutes />
                </Suspense>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </CurrencyProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
