export default function Divider({ vertical }: { vertical: boolean }) {
  return (
    <div
      style={{
        border: "solid 1px",
        borderRadius: "100%",
        opacity: 0.25,
        width: vertical ? undefined : "100%",
        height: vertical ? "100%%" : undefined,
      }}
    />
  );
}
