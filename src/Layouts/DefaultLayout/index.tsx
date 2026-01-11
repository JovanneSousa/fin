import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { getCategories } from "../../Store/reducers/categories";

export type Tabs = "dashboard" | "transacoes" | "categorias" | "planejamento";

const DefaultLayout = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const path = location.pathname;

  const activeTabMap: Record<string, Tabs> = {
    "/transacoes": "transacoes",
    "/dashboard": "dashboard",
    "/categorias": "categorias",
  };

  const activeTab =
    Object.entries(activeTabMap).find(([route]) =>
      path.startsWith(route)
    )?.[1] ?? "dashboard";

  return (
    <>
      <Sidebar activeTab={activeTab} />
      <div className="main" ref={mainRef}>
        <Header activeTabs={activeTab} scrollRef={mainRef} />
        <div className="col container">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default DefaultLayout;
