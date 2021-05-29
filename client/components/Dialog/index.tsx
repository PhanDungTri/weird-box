import { useAtom } from "jotai";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { soundAtom } from "../../atoms";
import { COLOR } from "../../constants";
import { shadeColor } from "../../utils";
import Button from "../Button";
import { dialogContentStyle, dialogFooterStyle, dialogHeaderStyle, dialogStyle, showDialogStyle } from "./styles";

type DialogProps = {
  color?: string;
  title?: string;
  children?: ReactNode;
  show?: boolean;
  onYes?: () => void;
  yesMessage?: string;
  noFooter?: boolean;
};

type NoCancelButtonDialogProps = DialogProps & { noMessage?: string };
type WithCancelButtonDialogProps = DialogProps & { noMessage: string; onNo?: () => void };

function Dialog(props: NoCancelButtonDialogProps): JSX.Element;
function Dialog(props: WithCancelButtonDialogProps): JSX.Element;
function Dialog({
  show,
  color = COLOR.Coal,
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
    <div css={[dialogStyle, show && showDialogStyle]}>
      <div css={dialogContentStyle(shadeColor(color, 70))}>
        {title && <div css={dialogHeaderStyle(color)}>{title}</div>}
        {children}
        {!noFooter && (
          <div css={dialogFooterStyle}>
            <Button variation="Safe" onClick={onAccept}>
              {yesMessage}
            </Button>
            {noMessage && (
              <Button variation="Danger" onClick={onCancel}>
                {noMessage}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.getElementById("dialog") as HTMLDivElement
  );
}

export default Dialog;
