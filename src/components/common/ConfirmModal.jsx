import { useEffect, useId, useRef } from "react";

import { Trash2 } from "lucide-react";

import Button from "./Button";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}) => {
  const cancelButtonRef = useRef(null);

  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);

      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50

        px-4
        py-6

        backdrop-blur-sm

        animate-fadeIn
      "
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="
          w-full
          max-w-md

          rounded-2xl

          border
          border-gray-200
          dark:border-slate-800

          bg-white
          dark:bg-slate-900

          p-5
          sm:p-6

          shadow-2xl

          animate-pop
        "
      >
        {/* Icon */}

        <div className="mb-5 flex justify-center">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center

              rounded-full

              bg-red-100
              dark:bg-red-900/30
            "
          >
            <Trash2
              size={30}
              aria-hidden="true"
              className="
                text-red-600
                dark:text-red-400
              "
            />
          </div>
        </div>

        {/* Title */}

        <h2
          id={titleId}
          className="
            text-center

            text-2xl
            font-bold

            text-gray-800
            dark:text-white
          "
        >
          {title}
        </h2>

        {/* Message */}

        <p
          id={descriptionId}
          className="
            mt-3

            text-center
            leading-6

            text-gray-500
            dark:text-slate-400
          "
        >
          {message}
        </p>

        {/* Actions */}

        <div
          className="
            mt-8

            flex
            flex-col-reverse
            gap-3

            sm:flex-row
          "
        >
          <Button
            ref={cancelButtonRef}
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            {cancelLabel}
          </Button>

          <Button variant="danger" onClick={handleConfirm} className="flex-1">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
