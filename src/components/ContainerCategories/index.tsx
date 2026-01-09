import { tiposCard } from "../../Utils";
import CardCategories from "../CardCategories";

const ContainerCategories = () => {
  return (
    <div className="grid-card">
      <CardCategories type={tiposCard.saldoAtual} />
      <CardCategories type={tiposCard.receita} />
      <CardCategories type={tiposCard.despesa} />
      <CardCategories type={tiposCard.balanco} />
    </div>
  );
};

export default ContainerCategories;
