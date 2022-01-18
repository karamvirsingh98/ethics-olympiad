interface InputProps {
  placeholder?: string,
  value?: string,
  defaultValue?: string,
  style?: React.CSSProperties
  onChange?: (value: string) => void
  onConfirm?: (value: string) => void
}

export default function Input({
  placeholder,
  value,
  defaultValue,
  style,
  onChange,
  onConfirm
}: InputProps) {
  return (
    <input
      style={style}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => onChange && onChange(e.currentTarget.value)}
      onBlur={(e) => onConfirm && onConfirm(e.currentTarget.value)}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
    />
  );
}