const vi: Record<string, string> = {
  loadSprite: "Đang tải hình ảnh",
  loadSfx: "Đang tải hiệu ứng âm thanh",
  loadMusic: "Đang tải nhạc nền",
  connectServer: "Đang kết nối đến máy chủ trò chơi",
  errConnectTitle: "Lỗi kết nối",
  reconnect: "Kết nối lại",
  reconnectMessage: "Đang kết nối lại",
  failConnect: "Không thể kết nối đến máy chủ",
  noEffectDescription: "Không có hiệu ứng.",
  punchDescription: "Lập tức gây sát thương lên toàn bộ đối thủ.",
  poisonDescription: "Gây sát thương cho toàn bộ đối thủ trong 3 lượt. Có cộng dồn.",
  healDescription: "Hồi HP ngay lập tức",
  shieldDescription:
    "Cản một phép từ đối thủ có sức mạnh bằng hoặc nhỏ hơn phép này. Nếu một phép vượt qua được phép Khiên, thì phép Khiên tiếp theo sẽ được kích hoạt, nếu có. Có cộng dồn",
  mirrorDescription:
    "Cản và phản đòn phép từ đối thủ có sức mạnh bằng hoặc nhỏ hơn phép này. Nếu một phép vượt qua được phép Gương, thì phép Gương tiếp theo sẽ được kích hoạt, nếu có. Có cộng dồn",
  cardTutorialHeader: "Thẻ bài",
  chargerTutorialHeader: "Hộp kỳ quái - Bộ sạc",
  conclusionTutorialHeader: "Tổng kết",
  hpTutorialHeader: "Hit Point",
  overchargedTutorialHeader: "Hộp kỳ quái - Quá tải",
  spellTutorialHeader: "Phép",
  spellDictionary: "Từ điển phép",
  cardTutorial: `
  Mỗi lượt, người chơi **bắt buộc phải** đánh một thẻ bài.
  
  Có 3 thuộc tính được thể hiện trên thẻ bài:
  
  - Trên đầu thẻ bài là chỉ số **năng lượng**.
  - Ở giữa là **phép**, phép này sẽ được thi triển khi thẻ bài được đánh ra.
  - Và ở cuối thẻ bài là **hành động**, chỉ số **năng lượng** sẽ được cộng vào hộp kỳ quái nếu **hành động** là "+" hoặc sẽ bị tiêu thụ nếu **hành động** là "-".
  `,
  chargerTutorial: `
  Khi một thẻ bài được đánh ra, giá trị của bộ sạc thẻ thay đổi **dựa trên năng lượng và hành động của thẻ bài đó**.
  
  Bộ sạc có **giá trị tối đa là 10 và giá trị tối thiểu là 0**. Nếu giá trị sạc vượt quá giới hạn, chiếc hộp sẽ bị **quá tải**.
  `,
  conclusionTutorial: `
  Đánh thẻ bài ở mỗi lượt.
  
  Đừng làm giá trị của bộ sạc thấp hơn 0 hay vượt quá 10.
  
  Tồn tại và đánh bại mọi đối thủ bằng cách sử dụng các phép.
  
  GLHF - Vui vẻ không quạu.
  `,
  hpTutorial: `
  Mỗi người chơi chỉ có một nhiệm vụ đơn giản: **GIẢM TOÀN BỘ HIT POINT CỦA ĐỐI THỦ XUỐNG CÒN 0**.
  
  Hit point có thể bị thay đổi khi người chơi dính phép hay bị phạt.
  `,
  overchargedTutorial: `
  Sau đây là một vài sự kiện sẽ xảy ra khi chiếc hộp bị quá tải:
  
  - Bộ sạc đặt lại giá trị **về còn 0**.
  - Người chơi gây ra sự cố này sẽ phải **bị phạt**, nhận 10 HP sát thương.
  - Phép của thẻ bài được đánh ra trong lượt này **sẽ không có hiệu ứng gì**.
  `,
  spellTutorial: `
  Ngoài việc thay đổi giá trị của bộ sạc, có vài thẻ bài còn có thêm một khả năng đặc biệt khác, gọi là **phép**.
  
  Có rất nhiều phép với các hiệu ứng khác nhau, nhưng chúng đầu có chung một cơ chế như sau:
  
  - Phép có chỉ số **sức mạnh**, giá trị của nó dựa trên **giá trị hiện tại của bộ sạc** *(không phải năng lượng của thẻ bài)*.
  - Phép với **sức mạnh bằng 0 sẽ không có bất kỳ hiệu ứng nào**.
  `,
  about: "Thông tin",
  aboutDescription: `
  Lập trình & Hình ảnh:
  
  - Phan Dũng Trí
    - Email: phandungtri99@gmail.com
  
  Nhạc nền:
  
  - Harm-Jan "3xBlast" Wiechers
  
  Phông chữ:
  
  - Roberto Mocci
  - Peter Hull
  - Stefanie Koerner (pheist)
  
  Hiệu ứng âm thanh:
  
  - Từ Itch.io:
    - ObsydianX
    - edwardcufaude
    - kronbits
  - Và rất nhiều từ freesound.org
  `,
  settingsTitle: "Cài đặt",
  tutorialTitle: "Hướng dẫn",
  language: "Ngôn ngữ",
  audio: "Âm thanh",
  confirmation: "Xác nhận",
  kick: "Đuổi",
  yes: "Có",
  no: "Không",
  roomKickMessage: "Người chơi này sẽ không bào giờ tham gia phòng này được nữa!",
  roomCode: "Mã phòng",
  roomCodePlaceholder: "Nhập mã phòng",
  join: "Tham gia",
  leave: "Rời đi",
  leaveMessage: "Bạn thật sự muốn rời đi chứ?",
  findingOpponents: "Đang tìm đối thủ",
  cancel: "Huỷ",
  gameFound: "Đã tìm được trận",
  accept: "Chấp nhận",
  reject: "Từ chối",
  waitingPlayers: "Đang chờ người chơi khác",
  gameFoundMessage: "Một trận đã sẵn sàng, tham gia chứ?",
  createRoom: "Tạo phòng",
  play: "Chơi",
  change: "Thay đổi",
  victory: "Chiến thắng",
  defeat: "Thất bại",
  continue: "Tiếp tục",
  victoryMessage: "Chúc mừng! Bạn thắng rồi!",
  defeatMessage: "Lần sau cố gắng hơn nha!",
  prepare: "Chuẩn bị",
  errGeneric: "Điều gì đó không đúng vừa xảy ra!",
  errRoomInGame: "Trận đấu đã bắt đầu trong phòng này!",
  errRoomFull: "Phòng đã đầy!",
  errNoPermission: "Bạn không được phép tham gia phòng này!",
  errRoomNotFound: "Không tìm thấy phòng!",
  errNotEnoughPlayer: "Không đủ người chơi!",
  errNotReadyInRoom: "Có ai đó chưa sẵn sàng!",
  errNotInTurn: "Chưa đến lượt của bạn!",
  notiKick: "Bạn vừa bị đuổi!",
  notiNameChanged: "Đã đổi tên!",
  notiInTurn: "Đến lượt bạn rồi!",
  notiFailMatch: "Ai đó đã không chấp nhận trận đấu!",
};

export default vi;
