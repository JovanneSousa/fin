import Button from "../Button";
import FormReceita from "../FormReceita";

const New = () => {
  return (
    <div>
      <p>Nova Transação</p>

      <div className="type">
        <p>tipo</p>
        <Button children="Receita" type="button" />
        <Button children="Despesa" type="button" />
      </div>
      <FormReceita />
    </div>
  );
};

export default New