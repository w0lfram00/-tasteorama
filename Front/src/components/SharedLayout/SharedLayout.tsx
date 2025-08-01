import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const RecipePage = lazy(() => import("../../pages/RecipePage/RecipePage"));
const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const RegisterPage = lazy(
  () => import("../../pages/RegisterPage/RegisterPage")
);

const SharedLayout = () => {
  return (
    <body>
      <Routes>
        <Route index element={<MainPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </body>
  );
};

export default SharedLayout;
