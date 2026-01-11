import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
import DefaultLayout from "../Layouts/DefaultLayout";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const TransacaoPage = lazy(() => import("../pages/TransacaoPage"));
const CategoriaPage = lazy(() => import("../pages/CategoriaPage"));

const Rotas = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DefaultLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<MainPage />}></Route>
            <Route path="/transacoes" element={<TransacaoPage />} />
            <Route path="/categorias" element={<CategoriaPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Rotas;
