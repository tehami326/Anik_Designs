import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import CircularGallery from "./components/CircularGallery";
import Products from "./components/Products";
import Footer from "./components/Footer";
import FooterCTA from "./components/FooterCTA";
import ProductPage from "./pages/ProductPage";
import HomeDecor from "./pages/HomeDecor";
import CushionCovers from "./pages/CushionCovers";
import Curtains from "./pages/Curtains";
import Quilts from "./pages/Quilts";
import WallHangings from "./pages/WallHangings";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AdminSettings from "./admin/AdminSettings";
import About from "./pages/About";
import SearchResults from "./pages/SearchResults";




const App = () => {
  return (
    <Router>
      <div className="font-playfair bg-white overflow-x-hidden">

        {/* Persistent Navbar */}
        <Navbar />

        <Routes>

          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Header />

                <section className="relative h-[600px] bg-black overflow-hidden">
                  <CircularGallery
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.02}
                  />
                </section>

                <Products />
                <FooterCTA />
              </>
            }
          />

          {/* CATEGORY PAGES */}
          <Route path="/homeDecor" element={<HomeDecor />} />
          <Route path="/cushionCovers" element={<CushionCovers />} />
          <Route path="/curtains" element={<Curtains />} />
          <Route path="/quilts" element={<Quilts />} />
          <Route path="/wallHangings" element={<WallHangings />} />
          <Route path="/about" element={<About />} />


          {/* CART */}
          <Route path="/cart" element={<Cart />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/search" element={<SearchResults />} />



          {/* 🔐 PROTECTED CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            }
          />





          {/* PRODUCT VIEW PAGE */}
          <Route path="/product/:id" element={<ProductPage />} />

        </Routes>

        <Footer />


      </div>
    </Router>
  );
};

export default App;
