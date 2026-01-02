import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FaceBookProvider from "next-auth/providers/facebook";
import { connectDB } from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔹 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔹 GitHub Login
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    FaceBookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    // 🔹 Login bằng email/password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Thiếu email hoặc mật khẩu");

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        if (!user.isActive) throw new Error("Tài khoản của bạn đã bị khóa");

        if (!user) throw new Error("Không tìm thấy người dùng");

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) throw new Error("Sai mật khẩu");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          isActive: user.isActive,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      // Neu chua co thi tao moi user
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image || "",
          phone: user.phone || "",
          address: user.address || "",
          role: "user",
          provider: account?.provider || "credentials",
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      if (token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id =
          typeof token.id === "string" ? token.id : String(token.id);
        session.user.role =
          typeof token.role === "string" ? token.role : undefined;
        session.user.email = token.email;
        session.user.name = session.user.name;
        session.user.image = session.user.image;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
