
import type React from "react";
import ReactDOM from "react-dom";
import { Overlay } from "./styles";

interface ModalProps {
    isOpen: boolean,
    onClose?: () => void,
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose} className="overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Overlay>,
    document.body
  );
};

export default Modal;
