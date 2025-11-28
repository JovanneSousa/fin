import { useDispatch } from "react-redux";
import { colors } from "../../globalStyles";
import {
  deleteTransactions,
  type Transacao,
} from "../../Store/reducers/transactions";
import Button from "../Button";
import { type AppDispatch } from "../../Store";
import { DeleteSection } from "./styles";

interface DeleteProps {
  item: Transacao | null;
  onClose: () => void;
}

const Delete: React.FC<DeleteProps> = ({ item, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DeleteSection>
      {item && (
        <>
          <p className="title-delete">Deseja excluir a transação: </p>
          <p className="desp-name">{item.titulo} ?</p>
          <div className="button-container">
            <Button
              type="button"
              onClick={onClose}
              bgColor={colors.lightGray}
              children="Cancelar"
              padding="small"
            />
            <Button
              bgColor={colors.vermelho}
              children="Excluir"
              padding="small"
              type="button"
              onClick={() => {
                dispatch(deleteTransactions(item.id!));
                onClose();
              }}
            />
          </div>
        </>
      )}
    </DeleteSection>
  );
};
export default Delete;
