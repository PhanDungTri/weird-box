const en: Record<string, string> = {
  loadSprite: "Loading sprites",
  loadSfx: "Loading sound effects",
  loadMusic: "Loading music",
  connectServer: "Connecting to game server",
  errConnectTitle: "Connection error",
  reconnect: "Reconnect",
  reconnectMessage: "Reconnecting",
  failConnect: "Failed to contact with server",
  noEffectDescription: "No effect.",
  punchDescription: "Instantly inflict damage to all opponents.",
  poisonDescription: `Make all opponents to suffer damage in 3 turns. Can be stacked.`,
  healDescription: "Instantly recover HP and remove all debuffs.",
  shieldDescription:
    "Block an incoming spell that has strength equal or less than this. When a spell pierces through a Shield spell, **that spell strength will be reduced by 1**, and the next Shield spell will be activated, if available. Can be stacked.",
  mirrorDescription:
    "Block and recast an incoming spell that has strength equal or less than this to the caster. When a spell pierces through a Mirror spell, the next Mirror spell will be activated, if available. Can be stacked.",
  spellDictionary: "Spell Dictionary",
  about: "About",
  aboutDescription: `
  Code & Art:
  
  - Phan Dung Tri (Me)
    - Email: phandungtri99@gmail.com
  
  Music:
  
  - Harm-Jan "3xBlast" Wiechers
  
  Fonts:
  
  - Roberto Mocci
  - Peter Hull
  - Stefanie Koerner (pheist)
  
  Sound effects:
  
  - From Itch.io:
    - ObsydianX
    - edwardcufaude
    - kronbits
  - And many from freesound.org
  `,
  settingsTitle: "Settings",
  tutorialTitle: "Tutorial",
  language: "Language",
  audio: "Audio",
  confirmation: "Confirmation",
  kick: "Kick",
  yes: "Yes",
  no: "No",
  roomKickMessage: "This player can not join this room anymore!",
  roomCode: "Room code",
  roomCodePlaceholder: "Enter room code",
  join: "Join",
  leave: "Leave",
  leaveMessage: "Do you really want to leave?",
  findingOpponents: "Finding opponents",
  cancel: "Cancel",
  gameFound: "Game found",
  accept: "Accept",
  reject: "Reject",
  waitingPlayers: "Waiting for other players",
  gameFoundMessage: "A game is ready, join?",
  createRoom: "Create room",
  play: "Play",
  change: "Change",
  victory: "Victory",
  defeat: "Defeat",
  continue: "Continue",
  victoryMessage: "Congratulation! You've won!",
  defeatMessage: "Try better next time!",
  prepare: "Prepare",
  errGeneric: "Something wrong happened!",
  errNameLength: "Name length must be 2 - 24 characters!",
  errRoomInGame: "Game has started in this room!",
  errRoomFull: "Room is full!",
  errNoPermission: "You aren't permitted to join this room!",
  errRoomNotFound: "Room not found!",
  errNotEnoughPlayer: "Not enough players!",
  errNotReadyInRoom: "Someone isn't ready!",
  errNotInTurn: "Not your turn!",
  notiKick: "You got kicked!",
  notiNameChanged: "Name changed!",
  notiInTurn: "It's your turn!",
  notiFailMatch: "Someone hasn't accepted the game!",
  shieldBlockMessage: "is blocked by",
  mirrorReflectMessage: "is reflected by",
  shieldPiercedMessage: "is reduced 1 damage but can't be stop by",
  mirrorPiercedMessage: "can't be stop by",
  of: "of",
  bonk: "bonk!",
  nervous: "nervous",
  laugh: "laugh",
  angry: "angry",
  gameplayStarting: `Everyone in the game will start with **5 cards and 100 HP**. At the beginning of each turn, you will receive one more card.`,
  gameplayCard: `This is the **card**. Every turn, you **have to play one card** from your hand, or you will be eliminated when the timer runs out.\n
  When a card is played, a number on the top of that card, called **power**, will be charged to or consumed from the charger of the box, based on what symbol at the bottom that a card has, called **action**. **+** for charging and **-** for consuming.\n
  Example with the card above, it will add 3 points to the box.`,
  gameplayBox: `The box can hold **maximum 10 points**. If it's charged too many or consumed too many, it will be overcharged.\n
  When the box is overcharged, it loses all of its points and deal 10 damages to the player who caused this incident.`,
  gameplaySpell: `The icon in the middle of a card is its special ability, called **spell**. A spell is casted when the card is played and it will use current points of the box as its **strength**.\n
  Example the box has 5 points then when the above card is played, the Poison spell will have 5 strength and the box will charged to 8 points.\n
  Spell with 0 strength or spell of the overcharging card will have no effect.`,
};

export default en;
