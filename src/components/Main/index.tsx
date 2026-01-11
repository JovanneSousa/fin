import AnalysisSection from "../Analysis";
import ContainerCategories from "../ContainerCategories";
import Seletor from "../Seletor";
import { MainSection } from "./styles";

const Main = () => {
  return (
    <MainSection>
      <div className="col container">
        <Seletor page="main"/>
        <ContainerCategories />
        <AnalysisSection />
      </div>
    </MainSection>
  );
};
export default Main;
