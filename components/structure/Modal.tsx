"use client";

import { ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    if (props.isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [props.isOpen, props.onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      props.onClose();
    }
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl animate-in fade-in zoom-in"
      >
        {props.title && (
          <h2 className="mb-4 text-lg font-semibold">{props.title}</h2>
        )}
        {props.children}
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={props.onClose}
          >
            Cancel
          </button>

          <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
