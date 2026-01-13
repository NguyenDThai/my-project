import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const role = request.nextauth.token?.role;
    const pathname = request.nextUrl.pathname;

    // Chặn admin
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 👉 Tạo response để gắn CSP
    const response = NextResponse.next();

    // 👉 CHỈ bật CSP ở production
    if (process.env.NODE_ENV === "production") {
      response.headers.set(
        "Content-Security-Policy",
        `
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sandbox.vnpayment.vn;
          style-src 'self' 'unsafe-inline';
          img-src 'self' data:;
          connect-src 'self' https://*.ngrok-free.app https://sandbox.vnpayment.vn;
          frame-src https://sandbox.vnpayment.vn;
        `
          .replace(/\s{2,}/g, " ")
          .trim()
      );
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
