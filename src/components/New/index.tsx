import { colors } from "../../globalStyles";
import Button from "../Button";
import FormReceita from "../FormReceita";
import { NewSection } from "./styles";

const New = () => {
  return (
    <NewSection>
      <div className="padding">
        <p className="new-title">Nova Transação</p>

        <div>
          <div className="type">
            <p>tipo</p>
            <div className="button-wrapper">
              <Button
                bgColor={colors.lightGray}
                padding="small"
                children="Receita"
                type="button"
              />
              <Button
                bgColor={colors.lightGray}
                padding="small"
                children="Despesa"
                type="button"
              />
            </div>
          </div>
          <FormReceita />
        </div>
      </div>
    </NewSection>
  );
};

export default New;
