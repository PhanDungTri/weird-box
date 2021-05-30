import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { musicAtom, settingsAtom, soundAtom } from "../../atoms";
import useShowDialog from "../../hooks/useShowDialog";
import { centerizeContainerStyle, gridStyle } from "../../styles";
import Dialog from "../Dialog";
import Icon from "../Icon";
import { AudioSettings, optionStyle, toggleStyle } from "./styles";

const Settings = (): JSX.Element => {
  const [shouldDialogShow, dialogAction] = useShowDialog();
  const [sound] = useAtom(soundAtom);
  const [music] = useAtom(musicAtom);
  const [settings, setSettings] = useAtom(settingsAtom);

  const toggleSound = () => setSettings({ ...settings, sound: !settings.sound });
  const toggleMusic = () => setSettings({ ...settings, music: !settings.music });

  useEffect(() => {
    sound?.play("Accept");
    sound?.mute(!settings.sound);
    music?.mute(!settings.music);
  }, [settings]);

  return (
    <>
      <Icon
        name="cog"
        onClick={dialogAction.reveal}
        css={css`
          cursor: pointer;
          position: relative;
        `}
      />
      <Dialog show={shouldDialogShow} title="settings" onYes={dialogAction.hide}>
        <div css={[gridStyle, centerizeContainerStyle]}>
          <AudioSettings>
            <div style={{ fontSize: "24px" }}>Audio</div>
            <Icon key="sound" name="sound" onClick={toggleSound} css={[!settings.sound && toggleStyle, optionStyle]} />
            <Icon key="music" name="music" onClick={toggleMusic} css={[!settings.music && toggleStyle, optionStyle]} />
          </AudioSettings>
        </div>
      </Dialog>
    </>
  );
};

export default Settings;
