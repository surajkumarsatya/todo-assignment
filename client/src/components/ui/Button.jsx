function Button({ children, className = "", type = "button", onClick, disabled = false, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
