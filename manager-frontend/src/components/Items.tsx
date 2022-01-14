import { Cases, Case, Events, Event } from "../state/types";

export default function Items({
  label,
  items,
  setCurrentID,
  onNewClick,
}: {
  label: string;
  items: Cases | Events;
  setCurrentID: (id: string) => void;
  onNewClick: () => void;
}) {
  return (
    <div className="items">
      {Object.keys(items).map((id) => (
        <Item item={items[id]} onClick={() => setCurrentID(id)} key={id} />
      ))}
      <button className="green" onClick={onNewClick}> New {label} </button>
    </div>
  );
}

function Item({ item, onClick }: { item: Event | Case; onClick: () => void }) {
  return (
    <button className="item" onClick={onClick}>
      {item._id}
    </button>
  );
}
