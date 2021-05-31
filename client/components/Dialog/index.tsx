import { useAtom } from "jotai";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { StyleVariation } from "../../../shared/@types";
import { soundAtom } from "../../atoms";
import { COLOR } from "../../constants";
import { shadeColor } from "../../utils";
import Button from "../Button";
import { DialogContent, DialogFooter, DialogHeader, StyledDialog } from "./styles";

type DialogProps = {
  variation?: StyleVariation;
  title?: string;
  children?: ReactNode;
  show?: boolean;
  onYes?: () => void;
  yesMessage?: string;
  noFooter?: boolean;
};

function Dialog({
  show = false,
  variation = "Normal",
  title,
  children,
  noFooter,
  yesMessage = "OK",
  onYes,
  noMessage,
  onNo,
}: DialogProps & { noMessage?: string; onNo?: () => void }): JSX.Element {
  const [sound] = useAtom(soundAtom);

  const onAccept = () => {
    sound?.play("Accept");
    if (onYes) onYes();
  };

  const onCancel = () => {
    sound?.play("Cancel");
    if (onNo) onNo();
  };

  return createPortal(
    <StyledDialog show={show}>
      <DialogContent css={{ borderColor: shadeColor(COLOR[variation], 70) }}>
        {title && <DialogHeader variation={variation}>{title}</DialogHeader>}
        {children}
        {!noFooter && (
          <DialogFooter>
            <Button variation="Safe" onClick={onAccept}>
              {yesMessage}
            </Button>
            {noMessage && (
              <Button variation="Danger" onClick={onCancel}>
                {noMessage}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </StyledDialog>,
    document.getElementById("dialog") as HTMLDivElement
  );
}

export default Dialog;
