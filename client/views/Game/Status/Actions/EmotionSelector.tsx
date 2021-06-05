import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME, EMOTION } from "../../../../../shared/constants";
import { languageAtom } from "../../../../atoms";
import Button from "../../../../components/Button";
import DropDown from "../../../../components/Dropdown";
import Icon from "../../../../components/Icon";
import socket from "../../../../services/socket";
import { iconButtonStyle } from "./styles";

const EmotionSelector = (): JSX.Element => {
  const [language] = useAtom(languageAtom);

  return (
    <DropDown
      css={css`
        left: -75%;
      `}
      onTop
      header={<Icon name="smiley" css={iconButtonStyle} />}
    >
      {Object.values(EMOTION).map((emo) => (
        <Button
          key={emo}
          css={css`
            text-transform: capitalize;
          `}
          onClick={() => socket.emit(CLIENT_EVENT_NAME.ExpressEmotion, emo)}
        >
          {language[emo]}
        </Button>
      ))}
    </DropDown>
  );
};

export default EmotionSelector;
