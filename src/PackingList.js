import { useState } from "react";
import { Item } from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  function sortedItems(items) {
    switch (sortBy) {
      case "input":
        return items;
      case "description":
        return items
          .slice()
          .sort((a, b) => a.description.localeCompare(b.description));
      case "packed":
        return items.slice().sort((a, b) => a.packed - b.packed);
      default:
        return items;
    }
  }

  const sortedItemsList = sortedItems(items);

  return (
    <div className="list">
      <ul>
        {sortedItemsList.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
