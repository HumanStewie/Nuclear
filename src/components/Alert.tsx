interface Props {
  children: string;
  onClose: () => void;
}

function Alert({ children, onClose }: Props) {
  return (
    <div
      className="alert alert-primary alert-dismissible fade show"
      role="alert"
    >
      <strong>Holy guacamole!</strong> {children}
      <button
        type="button"
        className="btn-close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      >
      </button>
    </div>
  );
}

export default Alert;
