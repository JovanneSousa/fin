import ContainerCategories from "../ContainerCategories";
import Header from "../Header";
import Seletor from "../Seletor";

const Main = () => {

  return(
    <>
    <Header />
    <div className="container col">
        <Seletor />
        <ContainerCategories />
    </div></>
  );
};
export default Main;
