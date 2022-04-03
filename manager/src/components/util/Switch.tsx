export default function Switch({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "2rem",
        height: "1rem",
        borderRadius: "1rem",
        backgroundColor: active ? "green" : "red",
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          transform: active ? "translateX(100%)" : "translateX(0%)",
          transition: "transform .2s",
          borderRadius: "100%",
          width: "1rem",
          height: "1rem",
          backgroundColor: "white",
        }}
      />
    </div>
  );
}
