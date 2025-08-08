import React, { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const RecipePage = lazy(() => import("../../pages/RecipePage/RecipePage"));
const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const RegisterPage = lazy(
  () => import("../../pages/RegisterPage/RegisterPage")
);
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));

const SharedLayout = () => {
  return (
    <div className="main">
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recipes/:recipeId" element={<RecipePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
