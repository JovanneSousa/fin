import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const MainPage = lazy(() => import("../pages/MainPage"));

const Rotas = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/home" element={<MainPage />} />
              </Routes>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Rotas;
