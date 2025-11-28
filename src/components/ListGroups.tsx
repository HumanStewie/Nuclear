import { useState } from "react";

function ListGroup() {
  let items = ["HN", "HCM", "Hai Phong"];
  const [itemIndex, setItemIndex] = useState(-1);

  return (
    <>
      <h1>Best Cites with no Bias</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              itemIndex === index ? "list-group-item active" : "list-group-item"
            }
            key={item}
            onClick={() => setItemIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
