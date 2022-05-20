export default function Switch({
  active,
  onClick,
  disabled
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "2rem",
        height: "1rem",
        borderRadius: "1rem",
        backgroundColor: active ? "green" : "red",
        ...(disabled ? { cursor: "not-allowed", filter: "brightness(.5)"} : {})
      }}
      onClick={disabled ? undefined : onClick}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          transform: active ? "translateX(100%)" : "translateX(0%)",
          transition: "transform .2s ease",
          borderRadius: "100%",
          width: "1rem",
          height: "1rem",
          backgroundColor: "white",
        }}
      />
    </div>
  );
}
