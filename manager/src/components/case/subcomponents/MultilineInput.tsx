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
      onKeyDown={({ key, currentTarget }) => {
        if (key === "Enter") {
          onChange(currentTarget.value + "\n")
        }
      }}
      style={{ whiteSpace: "pre-line" }}
      value={value}
    />
  );
}
