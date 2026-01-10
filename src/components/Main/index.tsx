import AnalysisSection from "../Analysis";
import ContainerCategories from "../ContainerCategories";
import History from "../History";
import Seletor from "../Seletor";
import { MainSection } from "./styles";

const Main = () => {
  return (
    <MainSection>
      <div className="col container">
        <Seletor />
        <ContainerCategories />
        <AnalysisSection />
        <History />
      </div>
    </MainSection>
  );
};
export default Main;
