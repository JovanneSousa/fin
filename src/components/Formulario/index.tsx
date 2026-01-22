import { StyledForm } from "./styles";

export interface FormularioProps {
  size: "small" | "default";
  children: React.ReactNode;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  className?: string;
}

const Formulario = ({
  size,
  children,
  onSubmit,
  className,
}: FormularioProps) => {
  return (
    <StyledForm className={className} onSubmit={onSubmit} size={size}>
      {children}
    </StyledForm>
  );
};

export default Formulario;
