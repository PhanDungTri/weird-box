import { useAtom } from "jotai";
import { useEffect } from "react";
import { musicAtom, settingsAtom, soundAtom } from "../../atoms";
import useShowDialog from "../../hooks/useShowDialog";
import CenterizedGrid from "../CenterizedGrid";
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
      <Icon name="cog" onClick={dialogAction.reveal} css={{ cursor: "pointer", position: "relative" }} />
      <Dialog show={shouldDialogShow} title="settings" onYes={dialogAction.hide}>
        <CenterizedGrid>
          <AudioSettings>
            <div css={{ fontSize: "24px" }}>Audio</div>
            <Icon key="sound" name="sound" onClick={toggleSound} css={[!settings.sound && toggleStyle, optionStyle]} />
            <Icon key="music" name="music" onClick={toggleMusic} css={[!settings.music && toggleStyle, optionStyle]} />
          </AudioSettings>
        </CenterizedGrid>
      </Dialog>
    </>
  );
};

export default Settings;
