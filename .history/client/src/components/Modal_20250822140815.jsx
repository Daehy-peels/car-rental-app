// src/components/Modal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors z-10"
        >
          <FaTimes size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
