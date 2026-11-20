import Button from "../common/Button";

const ActionButton = ({ label, color, onClick, icon, disabled = false }) => {
  const variantMap = {
    blue: "primary",
    green: "success",
    red: "danger",
    yellow: "warning",
    gray: "secondary",
  };

  return (
    <Button
      type="button"
      variant={variantMap[color] || "primary"}
      onClick={onClick}
      disabled={disabled}
      className="w-full"
    >
      <span
        className="
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {icon && (
          <span
            aria-hidden="true"
            className="
              flex
              shrink-0
              items-center
              justify-center
            "
          >
            {icon}
          </span>
        )}

        <span>{label}</span>
      </span>
    </Button>
  );
};

export default ActionButton;
