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
  poisonDescription: "Make all opponents to suffer damage in 3 turns.",
  healDescription: "Instantly recover hp.",
  shieldDescription: "Block an incoming spell that has strength equal or less than this.",
  mirrorDescription: "Block and recast an incoming spell that has strength equal or less than this to the caster.",
  cardTutorialHeader: "Card",
  chargerTutorialHeader: "Weird Box - Charger",
  conclusionTutorialHeader: "Conclusion",
  hpTutorialHeader: "Hit Point",
  overchargedTutorialHeader: "Weird Box - Overcharged",
  spellTutorialHeader: "Spell",
  spellDictionary: "Spell Dictionary",
  cardTutorial: `
  In each turn, the player **have to** play one card.
  
  There are 3 properties represented on the card:
  
  - On the top of the card is its **power**.
  - In the middle is the **spell** which is casted when the card is played.
  - And at the bottom is the **action**, the **power** will be added to the Weird Box if the **action** is "+" or it will be taken away from Weird Box if the **action** is "-".
  `,
  chargerTutorial: `
  When a card is played, the charger will change its value **based on that card power and action**.
  
  The charger has **maximum value is 10 and minimum value is 0**. If the charged value exceeds the limit, the box will be **overcharged**.
  `,
  conclusionTutorial: `
  Play a card in each turn.
  
  Don't  make the charger drop below 0 or raise above 10.
  
  Defeat all opponents by decreasing their hp to 0.
  
  GLHF.
  `,
  hpTutorial: `
  Every player has only one simple objective: **REDUCE ALL OPPONENTS HIT POINT TO ZERO**.
  
  Hit point can be changed when players take a spell or penalty.
  `,
  overchargedTutorial: `
  These are the things that will happen when the box is overcharged:
  
  - The charger will reset its value **back to 0**.
  - The player who makes this mistake will **pay a penalty**, which costs 10 HP.
  - Any spell of the card played in this turn has **no effect**.
  `,
  spellTutorial: `
  Beside changing the value of charger, some cards have one more special ability, called **spell**.
  
  There are many different spells with different effects, but they share the same following mechanic:
  
  - Spell has the **strength** attribute, which has value based on **the current value of the charger** *(not the power of the card)*.
  - Spell with **0 strength has no effect**.
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
};

export default en;
