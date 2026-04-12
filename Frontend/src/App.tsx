import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AdminAuthProvider } from "@/admin/context/AdminAuthContext";
import { requestFirebaseToken } from "@/lib/firebase";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageTransition } from "@/components/PageTransition";
import { StoreLayout } from "@/layouts/StoreLayout";

import { AdminLayout } from "@/admin/components/AdminLayout";
import { AdminProtectedRoute } from "@/admin/components/AdminProtectedRoute";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const SearchPage = lazy(() => import("@/pages/Search"));
const Cart = lazy(() => import("@/pages/Cart"));
const Orders = lazy(() => import("@/pages/Orders"));
const Settings = lazy(() => import("@/pages/Settings"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AdminLogin = lazy(() => import("@/admin/pages/AdminLogin"));
const Dashboard = lazy(() => import("@/admin/pages/Dashboard"));
const Products = lazy(() => import("@/admin/pages/Products"));
const AddProduct = lazy(() => import("@/admin/pages/AddProduct"));
const EditProduct = lazy(() => import("@/admin/pages/EditProduct"));
const AdminOrders = lazy(() => import("@/admin/pages/Orders"));
const Users = lazy(() => import("@/admin/pages/Users"));
const Categories = lazy(() => import("@/admin/pages/Categories"));
const AdminNotFound = lazy(() => import("@/admin/pages/AdminNotFound"));

const MenHome = lazy(() => import("@/modules/Men/MenHome"));
const Shirts = lazy(() => import("@/modules/Men/Subcategories").then((m) => ({ default: m.Shirts })));
const MenPants = lazy(() => import("@/modules/Men/Subcategories").then((m) => ({ default: m.MenPants })));
const MenFootwear = lazy(() => import("@/modules/Men/Subcategories").then((m) => ({ default: m.MenFootwear })));
const MenAccessories = lazy(() => import("@/modules/Men/Subcategories").then((m) => ({ default: m.MenAccessories })));
const MenBags = lazy(() => import("@/modules/Men/Subcategories").then((m) => ({ default: m.MenBags })));

const WomenHome = lazy(() => import("@/modules/Women/WomenHome"));
const Tops = lazy(() => import("@/modules/Women/Subcategories").then((m) => ({ default: m.Tops })));
const WomenPants = lazy(() => import("@/modules/Women/Subcategories").then((m) => ({ default: m.WomenPants })));
const Skirts = lazy(() => import("@/modules/Women/Subcategories").then((m) => ({ default: m.Skirts })));
const WomenFootwear = lazy(() => import("@/modules/Women/Subcategories").then((m) => ({ default: m.WomenFootwear })));
const WomenAccessories = lazy(() => import("@/modules/Women/Subcategories").then((m) => ({ default: m.WomenAccessories })));
const WomenBags = lazy(() => import("@/modules/Women/Subcategories").then((m) => ({ default: m.WomenBags })));

const KidsHome = lazy(() => import("@/modules/Kids/KidsHome"));
const Boys = lazy(() => import("@/modules/Kids/Subcategories").then((m) => ({ default: m.Boys })));
const Girls = lazy(() => import("@/modules/Kids/Subcategories").then((m) => ({ default: m.Girls })));
const KidsFootwear = lazy(() => import("@/modules/Kids/Subcategories").then((m) => ({ default: m.KidsFootwear })));
const KidsAccessories = lazy(() => import("@/modules/Kids/Subcategories").then((m) => ({ default: m.KidsAccessories })));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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

        <Route path="/signin" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Register /></PageTransition>} />

        <Route element={<StoreLayout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />

          <Route path="/men" element={<PageTransition><MenHome /></PageTransition>} />
          <Route path="/men/shirts" element={<PageTransition><Shirts /></PageTransition>} />
          <Route path="/men/pants" element={<PageTransition><MenPants /></PageTransition>} />
          <Route path="/men/footwear" element={<PageTransition><MenFootwear /></PageTransition>} />
          <Route path="/men/accessories" element={<PageTransition><MenAccessories /></PageTransition>} />
          <Route path="/men/bags" element={<PageTransition><MenBags /></PageTransition>} />

          <Route path="/women" element={<PageTransition><WomenHome /></PageTransition>} />
          <Route path="/women/tops" element={<PageTransition><Tops /></PageTransition>} />
          <Route path="/women/pants" element={<PageTransition><WomenPants /></PageTransition>} />
          <Route path="/women/skirts" element={<PageTransition><Skirts /></PageTransition>} />
          <Route path="/women/footwear" element={<PageTransition><WomenFootwear /></PageTransition>} />
          <Route path="/women/accessories" element={<PageTransition><WomenAccessories /></PageTransition>} />
          <Route path="/women/bags" element={<PageTransition><WomenBags /></PageTransition>} />

          <Route path="/kids" element={<PageTransition><KidsHome /></PageTransition>} />
          <Route path="/kids/boys" element={<PageTransition><Boys /></PageTransition>} />
          <Route path="/kids/girls" element={<PageTransition><Girls /></PageTransition>} />
          <Route path="/kids/footwear" element={<PageTransition><KidsFootwear /></PageTransition>} />
          <Route path="/kids/accessories" element={<PageTransition><KidsAccessories /></PageTransition>} />

          <Route path="/cart" element={<ProtectedRoute><PageTransition><Cart /></PageTransition></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><PageTransition><Checkout /></PageTransition></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><PageTransition><Orders /></PageTransition></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><PageTransition><Settings /></PageTransition></ProtectedRoute>} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>

        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/auth-landing" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  React.useEffect(() => {
    const setupFirebase = async () => {
      try {
        const token = await requestFirebaseToken();
        if (token && import.meta.env.DEV) console.log("FCM token ready");
      } catch {
        /* optional */
      }
    };
    setupFirebase();
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
