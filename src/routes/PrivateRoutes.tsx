import { useSelector } from "react-redux";
import type { RootReducer } from "../Store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state: RootReducer) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
