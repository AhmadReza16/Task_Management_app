import { useEffect, useId } from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  ariaLabel = "Dialog",
  labelledBy,
  describedBy,
  maxWidth = "max-w-md",
}) => {
  const fallbackLabelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
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

  const resolvedLabelledBy =
    labelledBy || (ariaLabel ? fallbackLabelId : undefined);

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

        overflow-y-auto

        bg-black/50

        p-4

        backdrop-blur-sm

        animate-fadeIn
      "
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={resolvedLabelledBy}
        aria-describedby={describedBy}
        className={`
          w-full
          ${maxWidth}

          min-h-0
          max-h-[calc(100vh-2rem)]

          overflow-y-auto

          rounded-2xl

          border
          border-gray-200
          dark:border-slate-800

          bg-white
          dark:bg-slate-900

          shadow-2xl

          animate-pop
        `}
      >
        {!labelledBy && ariaLabel && (
          <span id={fallbackLabelId} className="sr-only">
            {ariaLabel}
          </span>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
