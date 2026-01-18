import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context Providers
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AdminAuthProvider } from "@/admin/context/AdminAuthContext";

// Auth Pages
import AuthLanding from "@/pages/AuthLanding";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Customer Layout Components
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Customer Pages
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Settings from "@/pages/Settings";
import ProductDetails from "@/pages/ProductDetails";
import NotFound from "@/pages/NotFound";

// Customer Modules
import MenHome from "@/modules/Men/MenHome";
import { Shirts, MenPants, MenFootwear, MenAccessories, MenBags } from "@/modules/Men/Subcategories";
import WomenHome from "@/modules/Women/WomenHome";
import { Tops, WomenPants, Skirts, WomenFootwear, WomenAccessories, WomenBags } from "@/modules/Women/Subcategories";
import KidsHome from "@/modules/Kids/KidsHome";
import { Boys, Girls, KidsFootwear, KidsAccessories } from "@/modules/Kids/Subcategories";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Admin Components
import { AdminLayout } from "@/admin/components/AdminLayout";
import { AdminProtectedRoute } from "@/admin/components/AdminProtectedRoute";

// Admin Pages
import AdminLogin from "@/admin/pages/AdminLogin";
import Dashboard from "@/admin/pages/Dashboard";
import Products from "@/admin/pages/Products";
import AddProduct from "@/admin/pages/AddProduct";
import EditProduct from "@/admin/pages/EditProduct";
import AdminOrders from "@/admin/pages/Orders";
import Users from "@/admin/pages/Users";
import Categories from "@/admin/pages/Categories";
import AdminNotFound from "@/admin/pages/AdminNotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <CartProvider>
              <BrowserRouter>
              <Routes>
                {/* ========== AUTH ROUTES ========== */}
                <Route path="/" element={<AuthLanding />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                {/* ========== ADMIN ROUTES ========== */}
                <Route path="/admin/login" element={
                  <AdminAuthProvider>
                    <AdminLogin />
                  </AdminAuthProvider>
                } />
                <Route path="/admin" element={
                  <AdminAuthProvider>
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  </AdminAuthProvider>
                }>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="products/edit/:id" element={<EditProduct />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<Users />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="*" element={<AdminNotFound />} />
                </Route>

                {/* ========== CUSTOMER ROUTES (PROTECTED) ========== */}
                <Route path="/shop/*" element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/product/:id" element={<ProductDetails />} />

                          {/* Men */}
                          <Route path="/men" element={<MenHome />} />
                          <Route path="/men/shirts" element={<Shirts />} />
                          <Route path="/men/pants" element={<MenPants />} />
                          <Route path="/men/footwear" element={<MenFootwear />} />
                          <Route path="/men/accessories" element={<MenAccessories />} />
                          <Route path="/men/bags" element={<MenBags />} />

                          {/* Women */}
                          <Route path="/women" element={<WomenHome />} />
                          <Route path="/women/tops" element={<Tops />} />
                          <Route path="/women/pants" element={<WomenPants />} />
                          <Route path="/women/skirts" element={<Skirts />} />
                          <Route path="/women/footwear" element={<WomenFootwear />} />
                          <Route path="/women/accessories" element={<WomenAccessories />} />
                          <Route path="/women/bags" element={<WomenBags />} />

                          {/* Kids */}
                          <Route path="/kids" element={<KidsHome />} />
                          <Route path="/kids/boys" element={<Boys />} />
                          <Route path="/kids/girls" element={<Girls />} />
                          <Route path="/kids/footwear" element={<KidsFootwear />} />
                          <Route path="/kids/accessories" element={<KidsAccessories />} />

                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                } />

                {/* Redirect legacy routes */}
                <Route path="/login" element={<Navigate to="/signin" replace />} />
                <Route path="/register" element={<Navigate to="/signup" replace />} />

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </CurrencyProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
