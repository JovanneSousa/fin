import AnalysisSection from "../Analysis";
import ContainerCategories from "../ContainerCategories";
import Header from "../Header";
import History from "../History";
import Seletor from "../Seletor";

const Main = () => {
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
