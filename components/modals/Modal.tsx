"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../shared/Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModel, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
    flex justify-center 
    inset-0 z-50 overflow-x-hidden
    overflow-y-auto items-center
    outline-none fixed
    focus:outline-none
    bg-neutral-800/60 
    "
    >
      <div className="w-full relative md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto max-sm:px-6 h-auto">
        {/* content */}
        <div
          className={`translate duration-300 h-full
        ${showModel ? "opacity-100" : "opacity-0"}
        ${showModel ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-center p-4 rounded-t justify-center relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* body */}
            <div className="relative px-6 py-4 flex-auto">{body}</div>
            {/* footer */}
            <div className="flex flex-col gap-2 px-6 pb-4 ">
              <div className="flex flex-row items-center gap-2 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={secondaryAction}
                    outline
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={onSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
