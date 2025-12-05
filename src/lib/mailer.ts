import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.STMP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendResetEmail = async (to: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const info = await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_USER}>`,
    to,
    subject: "Đặt lại mật khẩu",
    html: `<p>Bạn vừa yêu cầu đặt lại mật khẩu. Nhấn vào link dưới đây để đổi mật khẩu:</p>
           <a href="${resetLink}" target="_blank">${resetLink}</a>
           <p>Link sẽ hết hạn sau 1 giờ.</p>`,
  });

  console.log("Email sent: %s", info.messageId);
};
