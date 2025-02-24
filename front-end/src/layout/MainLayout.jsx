import React, { useEffect } from "react";
import Home from "../components/Home/Home";
import Products from "../components/Products/Products";
import ProductForm from "../singlepages/ProductForm";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import NotFound from "../singlepages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "../sharedLayout/SharedLayout";
import Hero from "../components/Hero/Hero";
// import ProductCard from "../components/ProductCard/ProductCard";
import RoomsInspiration from "../components/RoomsInspiration/RoomsInspiration";
import AboutSection from "../components/about/about";
import CheckOut from "../singlepages/checkOut";
import Register from "../singlepages/Register";
import Login from "../singlepages/Login";
import OrderShipped from "../singlepages/OrderShipped";
import { useDispatch } from "react-redux";
import { loadUser } from "../shop/userSlice";
export default function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <>
                  <Hero />
                  {/* <ProductCard /> */}
                  <RoomsInspiration />
                </>
              }
            />
            <Route path="shop" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/ordershipped" element={<OrderShipped />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
