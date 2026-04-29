import { Input } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import { toggleTheme } from "../../Store/reducers/theme";

interface InputToggleProps {
  label: string;
  background: string;
  isOpen?: boolean;
}

const InputToggle = ({
  label,
  background,
  isOpen = true,
}: InputToggleProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dark } = useSelector((state: RootReducer) => state.theme);

  return (
    <Input isOpen={isOpen} color={background}>
      {label && <span className="label">{label}</span>}
      <label className="switch" htmlFor="switch">
        <input
          onChange={() => dispatch(toggleTheme())}
          checked={dark}
          type="checkbox"
          id="switch"
        />
        <span className="slider shadow"></span>
      </label>
    </Input>
  );
};

export default InputToggle;
