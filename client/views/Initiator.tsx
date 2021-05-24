import SpeechlessSprite from "../assets/sprites/speechless.png";
import DropDownSprite from "../assets/sprites/dropdown.png";
import LoadingSpriteSheet from "../assets/sprites/loading_animation.png";
import HealSpellSprite from "../assets/sprites/heal.png";
import PoisonSpellSprite from "../assets/sprites/poison.png";
import PunchSpellSprite from "../assets/sprites/punch.png";
import ShieldSpellSprite from "../assets/sprites/shield.png";
import ChargeSprite from "../assets/sprites/charge.png";
import ConsumeSprite from "../assets/sprites/consume.png";
import MirrorSpellSprite from "../assets/sprites/mirror.png";
import ContentFrameSprite from "../assets/sprites/card_content_frame.png";
import IdleSprite from "../assets/sprites/box_of_cards.png";
import DealCardSprite from "../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../assets/sprites/box_of_cards_overcharged.png";
import DeckSprite from "../assets/sprites/deck.png";
import HealSpellAnimation from "../assets/sprites/heal_animation.png";
import MirrorAnimation from "../assets/sprites/mirror_animation.png";
import MirrorPierceAnimation from "../assets/sprites/mirror_pierce_animation.png";
import MirrorReflectAnimation from "../assets/sprites/mirror_reflect_animation.png";
import PoisonSpellAnimation from "../assets/sprites/poison_animation.png";
import PunchSpellAnimation from "../assets/sprites/punch_animation.png";
import ShieldSpellAnimation from "../assets/sprites/shield_animation.png";
import ShieldBlockAnimation from "../assets/sprites/shield_block_animation.png";
import ShieldPierceAnimation from "../assets/sprites/shield_pierce_animation.png";
import LeaveIcon from "../assets/sprites/leave.png";
import KeySprite from "../assets/sprites/key.png";
import PlayerAvatar from "../assets/sprites/white_gamepad.png";
import EliminateSound from "../assets/sounds/eliminate.mp3";
import DoorKnockSound from "../assets/sounds/door_knock.mp3";
import DoorCloseSound from "../assets/sounds/door_close.mp3";
import DefeatSound from "../assets/sounds/defeat.mp3";
import VictorySound from "../assets/sounds/victory.mp3";
import DealSound from "../assets/sounds/deal_pop.mp3";
import OverchargedSound from "../assets/sounds/overcharged.mp3";
import TakeSound from "../assets/sounds/take_card.mp3";
import PlayCardSound from "../assets/sounds/play_card.mp3";
import ChooseSound from "../assets/sounds/choose_card.mp3";
import PunchSound from "../assets/sounds/punch.mp3";
import PoisonSound from "../assets/sounds/poison.mp3";
import HealSound from "../assets/sounds/heal.mp3";
import WhooshSound from "../assets/sounds/whoosh.mp3";
import ShieldSound from "../assets/sounds/shield.mp3";
import ReflectSound from "../assets/sounds/mirror_reflect.mp3";
import BlockSound from "../assets/sounds/shield_block.mp3";
import ShieldBreakSound from "../assets/sounds/shield_break.mp3";
import MirrorSound from "../assets/sounds/mirror.mp3";
import MirrorCrackSound from "../assets/sounds/mirror_crack.mp3";
import AcceptSound from "../assets/sounds/accept_game.mp3";
import FoundGameSound from "../assets/sounds/found_game.mp3";
import RejectSound from "../assets/sounds/reject_game.mp3";
import SafeSound from "../assets/sounds/noti_safe.mp3";
import DangerSound from "../assets/sounds/noti_danger.mp3";
import WarningSound from "../assets/sounds/noti_warn.mp3";
import InfoSound from "../assets/sounds/noti_info.mp3";
import { useRef, useState } from "react";
import { css } from "@emotion/react";

const Initiator = (): JSX.Element => {
  const [loadedCounter, setLoadedCounter] = useState(0);
  const assets = useRef<string[]>([
    SpeechlessSprite,
    DropDownSprite,
    LoadingSpriteSheet,
    HealSpellSprite,
    PoisonSpellSprite,
    PunchSpellSprite,
    ShieldSpellSprite,
    ChargeSprite,
    ConsumeSprite,
    MirrorSpellSprite,
    ContentFrameSprite,
    IdleSprite,
    DealCardSprite,
    OverChargedSprite,
    DeckSprite,
    HealSpellAnimation,
    MirrorAnimation,
    MirrorPierceAnimation,
    MirrorReflectAnimation,
    PoisonSpellAnimation,
    PunchSpellAnimation,
    ShieldSpellAnimation,
    ShieldBlockAnimation,
    ShieldPierceAnimation,
    LeaveIcon,
    KeySprite,
    PlayerAvatar,
  ]);

  const onLoad = () => {
    if (loadedCounter !== assets.current.length) setLoadedCounter(loadedCounter + 1);
  };

  return (
    <div>
      <div>Loading {(loadedCounter * 100) / assets.current.length}%</div>
      <img
        src={assets.current[loadedCounter]}
        css={css`
          display: none;
        `}
        onLoad={onLoad}
      />
    </div>
  );
};

export default Initiator;
