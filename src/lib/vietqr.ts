// utils/vietqr.ts
export function generateVietQR(amount: number, description: string) {
  const BANK_BIN = "970422"; // Ví dụ: 970422 là MBBank. Thay bằng mã BIN ngân hàng bạn.
  const ACCOUNT_NO = "123456789"; // Số tài khoản của bạn

  // Định dạng chuỗi Napas (EMVCo)
  const consumerInfo = `0010A00000072701280006${BANK_BIN}0114${ACCOUNT_NO}0208QRIBFTTA`;

  // Các trường dữ liệu chuẩn
  const f00 = "000201"; // Phiên bản dữ liệu
  const f01 = "010212"; // QR động
  const f38 = `38${consumerInfo.length}${consumerInfo}`;
  const f53 = "5303704"; // Mã tiền tệ (VND)
  const f54 = `54${amount.toString().length}${amount}`;
  const f58 = "5802VN"; // Quốc gia
  const f62 = `62${(description.length + 4)
    .toString()
    .padStart(2, "0")}08${description.length
    .toString()
    .padStart(2, "0")}${description}`;

  const data = f00 + f01 + f38 + f53 + f54 + f58 + f62 + "6304";

  // Hàm tính toán Checksum (CRC16) - Bạn có thể dùng thư viện crc hoặc hàm đơn giản
  // Để đơn giản nhất, bạn nên dùng API VietQR.io để lấy chuỗi này ở Server như dưới đây
  return data;
}
