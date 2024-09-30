import { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "./styles/index.css";

const Modal = ({ children, title, content, open, onCancel }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Wait for fade-out animation to finish
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onCancel();
    }, 300); // Increased to match fade-out duration
  };

  // Only render modal if it's open or animating
  if (!open && !isAnimating) return null;

  return (
    <div
      className={`modalOverlay ${!open ? "fade-out" : ""}`}
      onClick={handleClose}
    >
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <span className="modalCloseButton" onClick={handleClose}>
          <IoIosCloseCircleOutline />
        </span>
        <h2 className="modalTitle">{title}</h2>
        <div className="modalText">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
