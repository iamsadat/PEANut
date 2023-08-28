import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token?.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Set Up Account",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password" },
      },
      async authorize(credentials: any) {
        // Make sure to define the properties name, password, and domain
        const dbUser = await prisma.user.findFirst({
          where: {
            id: credentials.username,
          },
        });
        if (dbUser && credentials.id === dbUser.id) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
          };
        } else {
          return null; // Return null for unsuccessful authentication
        }
      },
    }),
  ],
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
