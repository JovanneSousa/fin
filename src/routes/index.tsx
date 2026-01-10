import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
import DefaultLayout from "../Layouts/DefaultLayout";
import History from "../components/History";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const MainPage = lazy(() => import("../pages/MainPage"));

const Rotas = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DefaultLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<MainPage />}></Route>
            <Route path="/transacoes" element={<History />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Rotas;
