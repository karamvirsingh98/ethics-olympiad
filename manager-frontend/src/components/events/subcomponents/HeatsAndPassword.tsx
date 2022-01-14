export default function HeatsAndPassword({
  onSetPassword,
  onSetHeats,
}: {
  onSetPassword?: (value: string) => void;
  onSetHeats?: (value: string) => void;
}) {
  return (
    <div className="heats-and-password">
      <Input
        label="Event Password: "
        defaultValue=""
        placeholder="enter password"
        onConfirm={onSetPassword}
      />
      <Input
        label="Number of Heats: "
        defaultValue="3"
        onConfirm={onSetHeats}
      />
    </div>
  );
}

function Input({
  label,
  defaultValue,
  placeholder,
  onChange,
  onConfirm,
}: {
  label: string;
  defaultValue: string;
  placeholder?: string;
  onChange?: (input: string) => void;
  onConfirm?: (value: string) => void;
}) {
  return (
    <div className="timer-input">
      <div>{label}</div>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={(e) =>
          onConfirm && e.key === "Enter" && onConfirm(e.currentTarget.value)
        }
      />
    </div>
  );
}