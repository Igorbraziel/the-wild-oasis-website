import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return auth?.user ? true : false;
    },
    async signIn({ user, account, profile }) {
      try {
        const data = await getGuest(user.email);

        const currentGuest = data.guest;

        if (!currentGuest) {
          await createGuest({
            fullName: user.name,
            email: user.email,
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const data = await getGuest(session.user.email);
      const guest = data.guest
      session.user.guestId = guest.id
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
