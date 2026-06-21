import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/loginScreen";
import DashboardPage from "../pages/dashboardScreen";
import DetailPage from "../pages/detailScreen";

import ProtectedRoute from "./protectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detail/:year/:entryId"
        element={
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
