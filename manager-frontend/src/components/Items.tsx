import { Cases, Case, Events, Event } from "../state/types";

export default function Items({
  items,
  setCurrentID,
}: {
  items: Cases | Events;
  setCurrentID: (id: string) => void;
}) {
  return (
    <div className="items">
      {Object.keys(items).map((id) => (
        <Item item={items[id]} onClick={() => setCurrentID(id)} key={id} />
      ))}
      <button className="add-item"> New Item </button>
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
