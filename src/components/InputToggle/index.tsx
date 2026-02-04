import { Input } from "./styles";

interface InputToggleProps {
  label: string;
  background: string;
}

const InputToggle = ({ label, background }: InputToggleProps) => {
  return (
    <Input color={background}>
      {label && <span className="label">{label}</span>}
      <label className="switch" htmlFor="switch">
        <input type="checkbox" id="switch" />
        <span className="slider"></span>
      </label>
    </Input>
  );
};

export default InputToggle;
