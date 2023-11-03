const Button = ({ children, onClick, className }) => {
  return (
    <button className={`rounded-lg ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
