interface InputProps {
  id?: string,
  className?: string,
  placeholder?: string,
  type?: string,
  value?: string,
  defaultValue?: string,
  autofocus?: boolean,
  style?: React.CSSProperties
  onChange?: (value: string) => void
  onConfirm?: (value: string) => void
}

export default function Input({
  id,
  className,
  placeholder,
  type,
  value,
  defaultValue,
  autofocus,
  style,
  onChange,
  onConfirm
}: InputProps) {
  return (
    <input
      id={id}
      className={className}
      style={style}
      placeholder={placeholder}
      type={type}
      value={value}
      defaultValue={defaultValue}
      autoFocus={autofocus}
      onChange={(e) => onChange && onChange(e.currentTarget.value)}
      onBlur={(e) => onConfirm && onConfirm(e.currentTarget.value)}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
    />
  );
}