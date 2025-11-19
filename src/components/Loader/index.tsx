import { OrbitProgress } from "react-loading-indicators";
import { colors } from "../../globalStyles";
import { ContainerLoader } from "./styles";

const Loader = () => {
  return (
    <ContainerLoader>
      <OrbitProgress variant="track-disc" color={colors.rosa} size="medium" />
      <p>Carregando...</p>
    </ContainerLoader>
  );
};

export default Loader;
