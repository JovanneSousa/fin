import {
  faArrowTrendDown,
  faArrowTrendUp,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../globalStyles";
import Button from "../Button";
import * as S from "./styles";
import useIsMobile from "../../Hooks/useIsMobile";
import useClickOutside from "../../Hooks/useClickOutside";
import { useRef, useState } from "react";
import { useFormNew } from "../../contexts/FormNew/useFormNew";
import type { ModalTypes } from "../../contexts/FormNew/FormNewContext";

interface ButtonNovoProps {
  isOpen: boolean;
}

const ButtonNovo = ({ isOpen }: ButtonNovoProps) => {
  const { abreModal } = useFormNew();
  const referencia = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const [isNewOpen, setIsNewOpen] = useState(false);

  useClickOutside([
    {
      ref: referencia,
      isOpen: isNewOpen,
      onClose: () => setIsNewOpen(false),
    },
  ]);

  const handleOpenModal = (type: ModalTypes) => {
    abreModal(type);
    setIsNewOpen(false);
  };

  return (
    <S.ButtonContainer>
      {!isMobile && isOpen ? (
        <Button
          onClick={() => setIsNewOpen(true)}
          padding="small"
          type="button"
          bgColor={colors.verde}
          icon="plus"
        >
          Novo
        </Button>
      ) : (
        <Button
          onClick={() => setIsNewOpen(true)}
          padding="small"
          type="button"
          bgColor={colors.verde}
          icon="plus"
        />
      )}
      <div
        ref={referencia}
        className={`menu-novo shadow ${isNewOpen ? "new-active" : ""}`}
      >
        <ul>
          <li onClick={() => handleOpenModal("despesa")}>
            <S.StyledIcon
              color={colors.vermelho}
              padding={"zero"}
              icon={faArrowTrendDown}
            />
            Despesa
          </li>
          <li onClick={() => handleOpenModal("receita")}>
            <S.StyledIcon
              color={colors.verde}
              padding={"zero"}
              icon={faArrowTrendUp}
            />
            Receita
          </li>
          <li onClick={() => handleOpenModal("categoria")}>
            <S.StyledIcon color={colors.azul} padding={"zero"} icon={faTags} />
            Categoria
          </li>
        </ul>
      </div>
    </S.ButtonContainer>
  );
};

export default ButtonNovo;
