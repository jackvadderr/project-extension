import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

import db from "@/lib/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { schema } from "@/lib/schema";
import { verifyPassword } from '@/utils/crypto-utils';

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = schema.parse(credentials);

        const user = await db.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user || !user.password) {
          throw new Error("Credenciais inválidas.");
        }

        const isValid = await verifyPassword(user.password, password);
        if (!isValid) {
          throw new Error("Credenciais inválidas.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
