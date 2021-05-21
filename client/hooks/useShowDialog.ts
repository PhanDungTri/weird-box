import { useState } from "react";

type ShowDialogHook = [
  boolean,
  {
    hide: () => void;
    reveal: () => void;
  }
];

const useShowDialog = (): ShowDialogHook => {
  const [shouldShow, show] = useState(false);

  const hide = () => show(false);
  const reveal = () => show(true);

  return [shouldShow, { reveal, hide }];
};

export default useShowDialog;
