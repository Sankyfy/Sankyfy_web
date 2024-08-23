import React from "react";
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'


import { Login } from "../../Pages/Login/Login";
import { Shop } from "../../Pages/Shop/Shop";
import { Signup } from "../../Pages/Signup/Signup";
import { ErrorPage } from "../../Pages/Error/Error";
import { Home } from "../../Pages/Home/Home";
import { ContactUs } from "../../Pages/ContactUs/ContactUs";
import { AboutUs } from "../../Pages/AboutUS/AboutUs";
import { ShopView } from "../../Pages/Shop/ShopView";
import { ShopKeeperSignup } from "../../Pages/Signup/ShopKeeperSignup";
import { UnderVerifications } from "../../Pages/UnderVerifications";
import { Chat } from "../../Pages/Chat/Chat";
import ScrollToTop from "../ScrollTop/ScrollTop";
import { TermandServices } from "../../Pages/TermandServices/TermandServices";
import { PrivacyPolicy } from "../../Pages/TermandServices/PrivacyPolicy";
import { ForgotPass } from "../../Pages/ForgotPass/ForgotPass";

export const AllRoutes = () => {
//   const mobileView = useSelector((state) => state.mobileView);
  return (
    <BrowserRouter>
     <ScrollToTop />
    <Routes>
     
      {/* <Route
        path="/shop/:id"
        element={
          <>
            <ProductDetail /> <Footer />
          </>
        }
      ></Route> */}
       <Route
        path="/"
        element={
          <>
            <Home />
          </>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signup-shopkeeper" element={<ShopKeeperSignup/>}></Route>
      <Route path="/verify" element={<UnderVerifications/>}></Route>
      <Route path="/shops" element={<Shop/>}></Route>
      <Route path="/shop-view/:id" element={<ShopView/>}></Route>
      <Route path="/shop-view/chat/:id" element={<Chat/>}></Route>
      <Route path="/about-us" element={<AboutUs/>}></Route>
      <Route path="/term-and-condition" element={<TermandServices/>}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
      <Route path="/contact-us" element={<ContactUs/>}></Route>
      <Route path="/chat/:id" element={<Chat/>}></Route>
      <Route path="/forgotpass" element={<ForgotPass/>}></Route>
      {/* <Route
        path="/payment"
        element={
          <PrivateRoute>
            <OrderReview></OrderReview>
          </PrivateRoute>
        }
      ></Route> */}
      
      <Route
        path="*"
        element={
          <>
            <ErrorPage /> 
          </>
        }
      ></Route>
    </Routes>
    </BrowserRouter>
  );
};