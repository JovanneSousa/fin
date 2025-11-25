import { FontAwesomeIcon as FontAwesomeIconSucess } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon as FontAwesomeIconError } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ContainerFeedback, ProgressBar } from "./styles";
import { colors } from "../../globalStyles";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../Store";
import React, { useEffect, useState } from "react";
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
  error?: string;
  noButton?: boolean;
};

export const Feedback: React.FC<FeedbackProps> = ({
  error,
  success,
  noButton = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const duration = success ? 3000 : 5000;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (success || error) {
      const interval = 50;
      const step = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);

            dispatch(clearErrorCategories());
            dispatch(clearSucessCategories());
            dispatch(clearErrorTransactions());
            dispatch(clearSucessTransactions());
            return 0;
          }
          return prev - step;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [success, error, duration, dispatch]);

  return (
    <ContainerFeedback>
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
      ) : (
        <FontAwesomeIconError
          icon={faCircleXmark}
          style={{ color: colors.vermelho }}
          size="6x"
        />
      )}
      {success ? (
        <span className="success">{success}</span>
      ) : (
        <span className="error">{error}</span>
      )}

      {(success || error) && (
        <ProgressBar progress={progress} type={success ? "success" : "error"} />
      )}
    </ContainerFeedback>
  );
};
export default Feedback;
