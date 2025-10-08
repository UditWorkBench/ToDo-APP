import { ReactNode, useState } from "react";

type AccordionProps = {
  title: string;
  count: number;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({ title, count, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <h5>{title}</h5>
        {typeof count === "number" && <>{"("}<span className="badge">{count}</span>{")"}</>}
        {!open ? (<span className="accordion-caret">{">"}</span>) : (<span className="accordion-caret">{"<"}</span>) }
      </div>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}
