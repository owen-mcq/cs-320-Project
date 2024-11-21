import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // verify user creditials
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          username: credentials?.username,
        }).select("+password");

        if (!user) throw new Error("Wrong Username");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) throw new Error("Wrong Password");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // Add callbacks to customize token and session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  // Optional: add error handling
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
};
