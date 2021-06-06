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
  healDescription: "Hồi HP ngay lập tức và huỷ toàn bộ các hiệu ứng bất lợi.",
  shieldDescription:
    "Cản một phép từ đối thủ có sức mạnh bằng hoặc nhỏ hơn phép này. Nếu một phép vượt qua được phép Khiên, **phép đó sẽ bị giảm 1 sức mạnh** và phép Khiên tiếp theo sẽ được kích hoạt, nếu có. Có cộng dồn",
  mirrorDescription:
    "Cản và phản đòn phép từ đối thủ có sức mạnh bằng hoặc nhỏ hơn phép này. Nếu một phép vượt qua được phép Gương, thì phép Gương tiếp theo sẽ được kích hoạt, nếu có. Có cộng dồn",
  spellDictionary: "Từ điển phép",
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
  errNameLength: "Độ dài tên phải từ 2 - 24 ký tự!",
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
  shieldBlockMessage: "bị cản bởi",
  mirrorReflectMessage: "bị phản đòn bởi",
  shieldPiercedMessage: "bị giảm 1 sát thương nhưng không thể bị cản bởi",
  mirrorPiercedMessage: "không thể bị cản bởi",
  of: "của",
  bonk: "bonk!",
  nervous: "Lắng lo",
  laugh: "Cười",
  angry: "Tứk",
  gameplayStarting: `Mỗi người chơi trong trận đấu sẽ bắt đầu với **5 thẻ bài và 100 HP**. Ở đầu mỗi lượt chơi, bạn sẽ nhận thêm một thẻ nữa.`,
  gameplayCard: `Đây là **thẻ bài**. Mỗi lượt, bạn **bắt buộc phải đánh ra một thẻ** từ trên tay, hoặc bạn sẽ bị loại khi hết thời gian.\n
  Khi một thẻ bài được đánh ra, con số nằm ở phía trên cùng của thẻ bài, gọi là **năng lượng**, sẽ được sạc vào hoặc tiêu thụ từ bộ sạc của chiếc hộp, dựa vào ký hiệu ở phía dưới cùng của thẻ bài, gọi là **hành động**. **+** là sạc và **-** là tiêu thụ.\n
  Ví dụ với thẻ bài bên trên, nó sẽ sạc 3 điểm vào chiếc hộp.`,
  gameplayBox: `Chiếc hộp tích được **tối đa 10 điểm**. Nếu nó bị sạc quá nhiều hay tiêu thụ quá nhiều, nó sẽ bị quá tải.\n
  Khi chiếc hộp bị quá tải, nó mất toàn bộ số điểm và gây 10 sát thương lên người chơi gây ra sự cố này.`,
  gameplaySpell: `Biểu tượng ở giữa thẻ bài là khả năng đặc biệt của nó, gọi là **phép**. Một phép được thi triển khi thẻ bài được đánh ra và nó sẽ sử dụng số điểm hiện tại của chiếc hộp làm **sức mạnh**.\n
  Ví dụ chiếc hộp có 5 điểm thì khi thẻ bài bên trên được đánh ra, phép Độc sẽ có sức mạnh là 5 và chiếc hộp được sạc lên 8 điểm.\n
  Phép với sức mạnh bằng 0 hay phép của thẻ bài gây ra quá tải sẽ không có hiệu ứng gì hết.`,
};

export default vi;
