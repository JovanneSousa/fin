import AnalysisSection from "../Analysis";
import ContainerCategories from "../ContainerCategories";
import Header from "../Header";
import Seletor from "../Seletor";

const Main = () => {
  return (
    <div className="main">
      <Header />
      <div className="col container">
        <Seletor />
        <ContainerCategories />
        <AnalysisSection />
      </div>
    </div>
  );
};
export default Main;
