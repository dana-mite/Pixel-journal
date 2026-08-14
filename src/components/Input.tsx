// Define our props
interface InputProps {
  placeholder: string;
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

function Input({ placeholder, value, onChange, className }: InputProps) {
  return (
    <input 
      type="text" 
      className={className}
      placeholder={placeholder} 
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;