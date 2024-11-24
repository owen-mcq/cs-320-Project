import mongoose from "mongoose";
import User from "@/models/User";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: "x0NCOOymWv+aFes8G00rGFbQEP3wSselAN7qjWdtNBw=",
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
        await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
        const user = await User.findOne({
          username: credentials?.username,
        }).select("+password");

        if (!user) throw new Error("Wrong Username");
        await mongoose.disconnect();

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
