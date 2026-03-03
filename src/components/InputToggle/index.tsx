import { useState } from "react";
import { Input } from "./styles";

interface InputToggleProps {
  label: string;
  background: string;
}

const InputToggle = ({ label, background }: InputToggleProps) => {
  const [isDark, setIsDark] =
    useState(() => localStorage.getItem("theme")) ?? "light";

  const switchToLight = () => {
    setIsDark("light");
    localStorage.setItem("theme", "light");
    window.location.reload();
  };

  const switchToDark = () => {
    setIsDark("dark");
    localStorage.setItem("theme", "dark");
    window.location.reload();
  };

  return (
    <Input color={background}>
      {label && <span className="label">{label}</span>}
      <label className="switch" htmlFor="switch">
        <input 
          onChange={
            isDark == "dark" ? () => switchToLight() : () => switchToDark()
          }
          checked={isDark == "dark"}
          type="checkbox"
          id="switch"
        />
        <span  className="slider shadow"></span>
      </label>
    </Input>
  );
};

export default InputToggle;
