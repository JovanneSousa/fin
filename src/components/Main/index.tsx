import { useDispatch } from "react-redux";
import AnalysisSection from "../Analysis";
import ContainerCategories from "../ContainerCategories";
import Header from "../Header";
import History from "../History";
import Seletor from "../Seletor";
import type { AppDispatch } from "../../Store";
import { useEffect } from "react";
import { getCategories } from "../../Store/reducers/categories";
import Sidebar from "../SideBar";
import { MainSection } from "./styles";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <MainSection>
      <Sidebar />
      <div className="main">
        <Header />
        <div className="col container">
          <Seletor />
          <ContainerCategories />
          <AnalysisSection />
          <History />
        </div>
      </div>
    </MainSection>
  );
};
export default Main;
