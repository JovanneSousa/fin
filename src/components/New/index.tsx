import { useState } from "react";
import { colors } from "../../globalStyles";
import Button from "../Button";
import FormDespesa from "../FormDespesa";
import { NewSection } from "./styles";
import FormReceita from "../FormReceita";

const New = () => {
  const [isReceita, setIsReceitaActive] = useState(true);
  const Form = isReceita ? FormReceita : FormDespesa;

  return (
    <NewSection>
      <div className="padding">
        <p className="new-title">Nova Transação</p>

        <div>
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
          <Form />
        </div>
      </div>
    </NewSection>
  );
};

export default New;
