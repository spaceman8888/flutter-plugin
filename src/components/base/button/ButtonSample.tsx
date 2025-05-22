interface ButtonSampleProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  label?: string;
}

function ButtonSample({ onClick, className, variant = 'primary', label }: ButtonSampleProps) {
  const variantClass = {
    primary: 'bg-blue-500 text-white p-2 rounded',
    secondary: 'bg-gray-500 text-white p-2 rounded',
  };
  return (
    <button className={`${variantClass[variant]} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default ButtonSample;
