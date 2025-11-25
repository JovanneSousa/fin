import { useDispatch } from "react-redux";
import AnalysisSection from "../Analysis";
import ContainerCategories from "../ContainerCategories";
import Header from "../Header";
import History from "../History";
import Seletor from "../Seletor";
import { type AppDispatch } from "../../Store";
import { useEffect } from "react";
import { getCategories } from "../../Store/reducers/categories";

const Main = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(getCategories());
  // }, [dispatch]);

  return (
    <div className="main">
      <Header />
      <div className="col container">
        <Seletor />
        <ContainerCategories />
        <AnalysisSection />
        <History />
      </div>
    </div>
  );
};
export default Main;
