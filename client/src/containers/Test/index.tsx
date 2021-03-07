import { useState } from "react";
import Dialog from "../../components/Dialog";

const Test = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <div style={{ background: "yellow" }}>ha</div>
      <div style={{ background: "red" }}>ha</div>
      <div style={{ background: "blue" }}>ha</div>
      <div style={{ background: "green" }}>ha</div>
      <Dialog show={open} onConfirm={() => setOpen(false)} title="Dialog" confirmMessage="Back">
        <div>This is a dialog</div>
      </Dialog>
    </div>
  );
};

export default Test;
