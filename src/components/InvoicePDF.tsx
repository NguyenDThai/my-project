// components/InvoicePDF.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

type ProductDetail = {
  _id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}[];

type OrderDetailType = {
  _id: string;
  address: string;
  items: ProductDetail;
  name: string;
  phone: string;
  totalPrice: number;
  deliveryMethod: string;
  shippingFee: number;
  paymentStatus: string;
  createdAt: string;
};

interface InvoicePDFProps {
  orderDetail: OrderDetailType;
  isOpen: boolean;
  onClose: () => void;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({
  orderDetail,
  isOpen,
  onClose,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;

    try {
      // Tạo một bản sao của element để áp dụng CSS fix
      const element = invoiceRef.current;

      // Lưu lại CSS gốc
      const originalBackground = element.style.background;

      // Áp dụng CSS tương thích cho html2canvas
      element.style.background = "#ffffff";

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          // Fix CSS trong cloned document
          const clonedElement = clonedDoc.querySelector(
            ".invoice-content"
          ) as HTMLElement;
          if (clonedElement) {
            // Áp dụng CSS tương thích
            clonedElement.style.backgroundColor = "#ffffff";
            clonedElement.style.color = "#000000";

            // Thêm CSS override
            const style = document.createElement("style");
            style.textContent = `
            * {
              background-color: #ffffff !important;
              color: #000000 !important;
              border-color: #d1d5db !important;
            }
            .bg-gray-100, [class*="bg-"] {
              background-color: #f3f4f6 !important;
            }
            .text-orange-600 {
              color: #ea580c !important;
            }
            .border-gray-300 {
              border-color: #d1d5db !important;
            }
          `;
            clonedDoc.head.appendChild(style);
          }
        },
      });

      // Khôi phục CSS gốc
      element.style.background = originalBackground;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`HoaDon_${orderDetail._id}_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const printInvoice = () => {
    window.print();
  };

  if (!isOpen) return null;

  const subtotal =
    orderDetail.deliveryMethod === "pickup"
      ? orderDetail.totalPrice
      : orderDetail.totalPrice - orderDetail.shippingFee;

  const showShipping = orderDetail.deliveryMethod !== "pickup";

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">HÓA ĐƠN BÁN HÀNG</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Invoice Content */}
        <div ref={invoiceRef} className="p-6 overflow-y-auto flex-grow">
          <div
            className="invoice-content"
            style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                CỬA HÀNG BÁN THỨC ĂN NHANH FOOD DEV
              </h1>
              <p className="text-gray-600">
                Địa chỉ: Ninh Kiều, Thành Phố Cần Thơ
              </p>
              <p className="text-gray-600">
                Điện thoại: 0869240149 | Email: thainguyen4646@gmail.com
              </p>
            </div>

            {/* Invoice Info */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-2">THÔNG TIN KHÁCH HÀNG</h3>
                <p>
                  <span className="font-medium">Họ tên:</span>{" "}
                  {orderDetail.name}
                </p>
                <p>
                  <span className="font-medium">Điện thoại:</span>{" "}
                  {orderDetail.phone}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span>{" "}
                  {orderDetail.address}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">THÔNG TIN HÓA ĐƠN</h3>
                <p>
                  <span className="font-medium">Mã hóa đơn:</span>{" "}
                  {orderDetail._id}
                </p>
                <p>
                  <span className="font-medium">Ngày đặt:</span>{" "}
                  {formatDate(orderDetail.createdAt)}
                </p>
                <p>
                  <span className="font-medium">Phương thức vận chuyển:</span>{" "}
                  {orderDetail.deliveryMethod === "delivery"
                    ? "COD"
                    : "Đến nhận hàng"}
                </p>
                <p>
                  <span className="font-medium">Trạng thái thanh toán:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm ${
                      orderDetail.paymentStatus === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {orderDetail.paymentStatus === "completed"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </span>
                </p>
              </div>
            </div>

            {/* Products Table */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">CHI TIẾT ĐƠN HÀNG</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">
                      STT
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Sản phẩm
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Loại sản phẩm
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Đơn giá
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Số lượng
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.items.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={600}
                            height={600}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3">
                        <p>
                          {item.category === "drink"
                            ? "Thức uống"
                            : item.category === "dessert"
                            ? "Tráng miệng"
                            : item.category === "pizza"
                            ? "pizza"
                            : item.category === "chickenfried"
                            ? "Gà rán"
                            : item.category === "hamburger"
                            ? "Hamburger"
                            : "Khác"}
                        </p>
                      </td>
                      <td className="border border-gray-300 p-3">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-300 p-3 font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="ml-auto w-full md:w-1/2">
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">TỔNG CỘNG</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>

                  {showShipping && (
                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>{formatCurrency(orderDetail.shippingFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span>TỔNG THANH TOÁN:</span>
                    <span className="text-orange-600">
                      {formatCurrency(orderDetail.totalPrice)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">
                  * Cảm ơn quý khách đã mua hàng. Vui lòng kiểm tra kỹ hàng hóa
                  trước khi thanh toán.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-300 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-bold mb-2">NGƯỜI MUA HÀNG</p>
                  <p className="italic">(Ký và ghi rõ họ tên)</p>
                </div>
                <div>
                  <p className="font-bold mb-2">NGƯỜI GIAO HÀNG</p>
                  <p className="italic">(Ký và ghi rõ họ tên)</p>
                </div>
                <div>
                  <p className="font-bold mb-2">CỬA HÀNG</p>
                  <p className="italic">(Ký, đóng dấu và ghi rõ họ tên)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
          <button
            onClick={printInvoice}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            In hóa đơn
          </button>
          <button
            onClick={downloadPDF}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Tải PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePDF;
