import { Navbar } from "@/components/navbar";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Navbar base="/events" links={[]} />
      <div className="container mx-auto px-4 py-8 flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
}
