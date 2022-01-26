export default function TextArea({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
}
