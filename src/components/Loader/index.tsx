import { OrbitProgress } from "react-loading-indicators";
import { colors } from "../../globalStyles";
import { ContainerLoader } from "./styles";

interface LoaderProps {
  legenda?: boolean;
  type?: "form" | "default";
}

const Loader = ({ legenda = true, type = "default" }: LoaderProps) => {
  return (
    <ContainerLoader className={`${type == "form" && "feedback-container"}`}>
      <OrbitProgress variant="track-disc" color={colors.rosa} size="medium" />
      {legenda && <p>Carregando...</p>}
    </ContainerLoader>
  );
};

export default Loader;
