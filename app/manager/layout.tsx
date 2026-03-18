import { Navbar } from "@/components/navbar";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar
        base="/manager"
        links={[
          { label: "Home", href: "/manager" },
          { label: "Olympiads", href: "/manager/olympiads" },
          { label: "Cases", href: "/manager/cases" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </>
  );
}
