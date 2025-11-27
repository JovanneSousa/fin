import { useState } from "react";
import { colors } from "../../globalStyles";
import Button from "../Button";
import FormDespesa from "../FormDespesa";
import { NewSection } from "./styles";
import FormReceita from "../FormReceita";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../Store";
import Loader from "../Loader";
import Feedback from "../Feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const New = () => {
  const [isReceita, setIsReceitaActive] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);
  const Form = isReceita ? FormReceita : FormDespesa;
  const { loadingPost, errorPost, successPost } = useSelector(
    (state: RootReducer) => state.transactions
  );

  return (
    <NewSection>
      <div className="padding">
        <div className="flex">
          <p className="new-title">Nova Transação</p>
          <Button
            bgColor={colors.transparent}
            padding="small"
            type="button"
            onClick={() => setIsInputActive(!isInputActive)}
            children={<FontAwesomeIcon icon={faChevronDown} />}
          />
        </div>
        <div className={`content ${isInputActive ? "is-active" : ""}`}>
          <div className="type">
            <p>Tipo</p>
            <div className="button-wrapper">
              <Button
                bgColor={isReceita ? colors.verde : colors.lightGray}
                padding="small"
                children="Receita"
                type="button"
                onClick={() => setIsReceitaActive(true)}
              />
              <Button
                bgColor={!isReceita ? colors.vermelho : colors.lightGray}
                padding="small"
                children="Despesa"
                type="button"
                onClick={() => setIsReceitaActive(false)}
              />
            </div>
          </div>
          {loadingPost ? (
            <Loader />
          ) : errorPost ? (
            <Feedback error={errorPost} />
          ) : successPost ? (
            <Feedback success={successPost} />
          ) : (
            <Form />
          )}
        </div>
      </div>
    </NewSection>
  );
};

export default New;
