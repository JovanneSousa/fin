import { StyledForm } from "./styles";

export interface FormularioProps {
  size: "small" | "default";
  children: React.ReactNode;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const Formulario = ({ size, children, onSubmit }: FormularioProps) => {
  return <StyledForm onSubmit={onSubmit} size={size}>{children}</StyledForm>;
};

export default Formulario;
