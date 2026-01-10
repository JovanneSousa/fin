import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { getCategories } from "../../Store/reducers/categories";

export type Tabs = "dashboard" | "transacoes" | "categorias" | "planejamento";

export type OutletContextType = {
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
};
const DefaultLayout = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState<Tabs>("dashboard");

  return (
    <>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="main" ref={mainRef}>
        <Header activeTabs={activeTab} scrollRef={mainRef} />
        <div className="col container">
          <Outlet context={{ setActiveTab }} />
        </div>
      </div>
    </>
  );
};
export default DefaultLayout;
