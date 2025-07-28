import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { SignJWT } from "jose";

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
    async jwt({ token, user }) {
      if (user) {
        try {
          const data = await getGuest(user.email);
          const currentGuest = data.guest;

          if (!currentGuest) {
            const newGuest = await createGuest({
              fullName: user.name,
              email: user.email,
            });
            token.guestId = newGuest.id;
          } else {
            token.guestId = currentGuest.id;
          }
        } catch (error) {
          // If DB operations fail, the token won't have the guestId
          console.error("Error during sign-in DB operations:", error);
          return null; // Returning null will cause a sign-in error
        }
      }
      return token;
    },
    async session({ session, token }) {
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

      if (session?.user) {
        session.user.guestId = token.guestId;
      }

      const jwtString = await new SignJWT(token)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(secret);
      session.accessToken = jwtString;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
