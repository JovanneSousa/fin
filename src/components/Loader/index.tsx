import { OrbitProgress } from "react-loading-indicators";
import { colors } from "../../globalStyles";
import { ContainerLoader } from "./styles";

interface LoaderProps {
  legenda?: boolean;
}

const Loader = ({ legenda = true }: LoaderProps) => {
  return (
    <ContainerLoader>
      <OrbitProgress variant="track-disc" color={colors.rosa} size="medium" />
      {legenda && <p>Carregando...</p>}
    </ContainerLoader>
  );
};

export default Loader;
