import React, { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const RecipePage = lazy(() => import("../../pages/RecipePage/RecipePage"));
const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const RegisterPage = lazy(
  () => import("../../pages/RegisterPage/RegisterPage")
);

const SharedLayout = () => {
  return (
    <div>
      <Routes>
        <Route index element={<MainPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/recipes/:recipeId" element={<RecipePage />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
