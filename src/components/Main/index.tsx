import ContainerCategories from "../ContainerCategories";
import Dashboards from "../Dashboards";
import { MainSection } from "./styles";

const Main = () => {
  return (
    <MainSection>
      {/* <Seletor page="main"/> */}
      <ContainerCategories />
      <Dashboards />
    </MainSection>
  );
};
export default Main;
