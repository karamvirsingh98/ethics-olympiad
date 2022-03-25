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
        backgroundColor: "white",
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          transform: "translateX(100%)",
          transition: "transform .2s",
          borderRadius: "100%",
          width: "1rem",
          height: "1rem",
          backgroundColor: "red",
        }}
      />
    </div>
  );
}
