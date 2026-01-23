import { useEffect, useRef } from "react";

interface PropsClickOutside {
  ref: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

const useClickOutside = (items: PropsClickOutside[]) => {
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;

      itemsRef.current.forEach(({ ref, isOpen, onClose }) => {
        if (isOpen && ref.current && !ref.current.contains(target)) {
          onClose();
        }
      });
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [items]);
};

export default useClickOutside;
