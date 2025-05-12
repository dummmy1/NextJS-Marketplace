import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Vercel-specific configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  // Required for Vercel deployment
  theme: {
    colorScheme: "auto",
  },
  // Enable debug logs in Vercel deployments
  debug: process.env.NODE_ENV === "development",
  // Use Vercel's recommended session strategy
  session: {
    strategy: "jwt",
  },
  // Important for serverless environments
  useSecureCookies: process.env.NODE_ENV === "production",
};

const handler = NextAuth(authOptions);

// Vercel requires explicit route exports
export { handler as GET, handler as POST };