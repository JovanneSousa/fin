import type React from "react";
import ReactDOM from "react-dom";
import { Overlay } from "./styles";
import { useRef } from "react";
import useClickOutside from "../../Hooks/useClickOutside";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const referencia = useRef<HTMLDivElement | null>(null);

  useClickOutside([
    {
      ref: referencia,
      isOpen: isOpen,
      onClose: onClose,
    },
  ]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose} className="overlay">
      <div
        className="modal"
        ref={referencia}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Overlay>,
    document.body,
  );
};

export default Modal;
