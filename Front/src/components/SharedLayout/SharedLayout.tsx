import React, { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import OwnedRecipesPanel from "../OwnedRecipesPanel/OwnedRecipesPanel";
import SavedRecipesPanel from "../SavedRecipesPanel/SavedRecipesPanel";
import CreateRecipePage from "../../pages/CreateRecipePage/CreateRecipePage";

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
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/add-recipe"
          element={
            <PrivateRoute>
              <CreateRecipePage />
            </PrivateRoute>
          }
        />
        <Route path="/recipes/:recipeId" element={<RecipePage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        >
          <Route path="own" element={<OwnedRecipesPanel />} />
          <Route path="saved" element={<SavedRecipesPanel />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
