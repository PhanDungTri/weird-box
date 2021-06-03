import { Howl } from "howler";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import SoundEffects from "url:../../assets/sounds/effects.mp3";
import Music from "url:../../assets/sounds/music.mp3";
import BoxOfCardSprites from "url:../../assets/sprites/box_of_cards.png";
import ContentFrameSprite from "url:../../assets/sprites/card_content_frame.png";
import IconSprites from "url:../../assets/sprites/icons.png";
import LoadingSpriteSheet from "url:../../assets/sprites/loading_animation.png";
import SpellAnimations from "url:../../assets/sprites/spell_animations.png";
import Logo from "url:../../assets/sprites/logo.png";
import { languageAtom, musicAtom, routeAtom, soundAtom } from "../../atoms";
import Loading from "../../components/Loading";
import Page from "../../components/Page";
import ProgressBar from "../../components/ProgressBar";
import { ROUTE } from "../../constants";
import socket from "../../services/socket";
import { centerizeStyle } from "../../styles";
import { LoadingProgress } from "./styles";

const Initiator = (): JSX.Element => {
  const [, setRoute] = useAtom(routeAtom);
  const [, setSound] = useAtom(soundAtom);
  const [, setMusic] = useAtom(musicAtom);
  const [language] = useAtom(languageAtom);
  const [message, setMessage] = useState(language.loadSprite);
  const [loadedAssetCounter, setLoadedAssetCounter] = useState(0);
  const spriteSources = useRef<string[]>([
    IconSprites,
    SpellAnimations,
    ContentFrameSprite,
    LoadingSpriteSheet,
    BoxOfCardSprites,
    Logo,
  ]);
  const total = useRef(spriteSources.current.length + 2);

  useEffect(() => {
    if (loadedAssetCounter < spriteSources.current.length) {
      const img = new Image();
      img.src = spriteSources.current[loadedAssetCounter];
      img.onload = () => setLoadedAssetCounter(loadedAssetCounter + 1);
    } else if (loadedAssetCounter === spriteSources.current.length) {
      setMessage(language.loadSfx);
      setSound(
        new Howl({
          src: [SoundEffects],
          sprite: {
            Accept: [0, 6000],
            Cancel: [7000, 6000],
            Defeat: [14000, 1500],
            DoorClose: [17000, 762.1541950113375],
            Eliminated: [19000, 835.9183673469381],
            Danger: [21000, 360.0226757369604],
            GameFound: [23000, 1058.8435374149653],
            Heal: [26000, 1450.657596371883],
            Info: [29000, 599.7278911564621],
            KnockDoor: [31000, 498.730158730158],
            Mirror: [33000, 1054.036281179137],
            MirrorBreak: [36000, 500],
            MirrorReflect: [38000, 835.1020408163237],
            Overcharged: [40000, 750],
            PlayCard: [42000, 501.0430839002282],
            Poison: [44000, 827.7324263038537],
            Pop: [46000, 417.9591836734673],
            Punch: [48000, 286.96145124716566],
            Safe: [50000, 1109.3424036281192],
            Shield: [53000, 1117.052154195008],
            ShieldBlock: [56000, 900.0907029478426],
            ShieldBreak: [58000, 603.5600907029491],
            Swoosh: [60000, 1109.3424036281192],
            TakeCard: [63000, 504.0362811791397],
            Victory: [65000, 2275.510204081627],
            Warning: [69000, 366.0997732426239],
          },
          volume: 0.75,
          onload: () => setLoadedAssetCounter(loadedAssetCounter + 1),
        })
      );
    } else if (loadedAssetCounter === total.current - 1) {
      setMessage(language.loadMusic);
      setMusic(
        new Howl({
          src: Music,
          autoplay: true,
          loop: true,
          volume: 0.1,
          onplay: () => setLoadedAssetCounter(loadedAssetCounter + 1),
        })
      );
    } else if (loadedAssetCounter === total.current) {
      setMessage(language.connectServer);
      socket.connect();
      socket.on("connect", () => setTimeout(() => setRoute(ROUTE.Hub), 1000));
    }
  }, [loadedAssetCounter]);

  return (
    <Page>
      <Loading css={centerizeStyle} scale={4} />
      <LoadingProgress>
        <p css={{ textAlign: "center", fontSize: "16px", fontWeight: "bold" }}>{message}</p>
        <ProgressBar
          css={{ centerizeStyle }}
          current={Math.floor((loadedAssetCounter * 100) / total.current)}
          suffix="%"
        />
      </LoadingProgress>
    </Page>
  );
};

export default Initiator;
