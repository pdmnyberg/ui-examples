import { CSSProperties, useState } from "react";

export type ActionItem = {
  label: string | React.ReactElement;
  action: () => void;
}

export type ActionItems = (
    ActionItem |
    {type: "separator"}
)[]

const dropdownOpenStyle: CSSProperties = {
  position: "absolute",
  inset: "0px 0px auto auto",
  margin: "0px",
  transform: "translate(0px, 40px)",
}

export function ActionDropDown({items, label}: {items: ActionItems, label: string | React.ReactElement}) {
  const [actionIsOpen, setActionIsOpen] = useState(false);
  return (
    <>
      <button className="btn btn-outline-secondary dropdown-toggle" onClick={() => setActionIsOpen(!actionIsOpen)} type="button" aria-expanded={actionIsOpen}>{label}</button>
      <ul className={`dropdown-menu ${actionIsOpen ? "show" : ""}`} style={actionIsOpen ? dropdownOpenStyle : {}} onClick={() => setActionIsOpen(false)}>
        {items.map((item, index) => (
          <li key={index}>{"type" in item ? <hr className="dropdown-divider" /> : <a className="dropdown-item" href="#">{item.label}</a>}</li>
        ))}
      </ul>
    </>
  )
}