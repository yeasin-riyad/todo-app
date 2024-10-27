import { createUserCollection } from "@/database/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"; 

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {  },
        password: { },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        
        // Access database
        const users = await createUserCollection();
        const currentUser = await users.findOne({ email });

        // Check if user exists and verify password (assuming password is hashed)
        if (!currentUser || !(await compare(password, currentUser.password))) {
          throw new Error("Invalid email or password");
        }

        // Remove sensitive data before returning
        // const { password: _, ...userWithoutPassword } = currentUser;
        return currentUser;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, id: token.id, email: token.email };
      return session;
    },
  },    
  pages: {
    signIn: '/login',
  }
});

export { handler as GET, handler as POST };
