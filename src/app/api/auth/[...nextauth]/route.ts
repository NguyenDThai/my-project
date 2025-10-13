import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const hanler = NextAuth(authOptions);

export { hanler as GET, hanler as POST };
