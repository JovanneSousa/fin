import {
  FontAwesomeIcon,
  FontAwesomeIcon as FontAwesomeIconSucess,
} from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon as FontAwesomeIconError } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ContainerFeedback, ProgressBar } from "./styles";
import { colors } from "../../globalStyles";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../Store";
import { useEffect, useState } from "react";
import {
  clearError as clearErrorCategories,
  clearSuccess as clearSucessCategories,
} from "../../Store/reducers/categories";
import {
  clearError as clearErrorTransactions,
  clearSuccess as clearSucessTransactions,
} from "../../Store/reducers/transactions";
import Button from "../Button";

type FeedbackProps = {
  success?: string;
  error?: string | null;
  info?: string;
  noButton?: boolean;
  type?: "form" | "default";
};

export const Feedback = ({
  info,
  error,
  success,
  noButton = false,
  type = "default",
}: FeedbackProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const duration = success ? 3000 : error ? 5000 : 10000;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (success || error) {
      const interval = 50;
      const step = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => Math.max(prev - step, 0));
      }, interval);

      return () => clearInterval(timer);
    }
  }, [success, error, duration]);

  useEffect(() => {
    if (progress === 0) {
      dispatch(clearErrorCategories());
      dispatch(clearSucessCategories());
      dispatch(clearErrorTransactions());
      dispatch(clearSucessTransactions());
    }
  }, [progress, dispatch]);

  return (
    <ContainerFeedback className={`${type == "form" && "feedback-container"}`}>
      {noButton === false ? (
        <Button
          children="X"
          bgColor={colors.lightGray}
          padding="small"
          type="button"
          onClick={() => {
            dispatch(clearErrorCategories());
            dispatch(clearSucessCategories());
            dispatch(clearErrorTransactions());
            dispatch(clearSucessTransactions());
          }}
        />
      ) : null}
      {success ? (
        <FontAwesomeIconSucess
          style={{ color: colors.verde }}
          size="6x"
          icon={faCircleCheck}
        />
      ) : info ? (
        <FontAwesomeIcon
          icon={faCompass}
          size="6x"
          style={{ color: colors.azul }}
        />
      ) : (
        <FontAwesomeIconError
          icon={faCircleXmark}
          style={{ color: colors.vermelho }}
          size="6x"
        />
      )}
      {success ? (
        <span className="success">{success}</span>
      ) : info ? (
        <span className="info">{info}</span>
      ) : (
        <span className="error">{error}</span>
      )}

      {(success || error) && !noButton ? (
        <ProgressBar progress={progress} type={success ? "success" : "error"} />
      ) : null}
    </ContainerFeedback>
  );
};
export default Feedback;
