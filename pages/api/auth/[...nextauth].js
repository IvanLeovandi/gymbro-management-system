import NextAuth from "next-auth/next";
import { ConnectDB } from "@/database/db-util";
import Credentials from "next-auth/providers/credentials";

export const authNext = {
  secret: '12345678910',
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await ConnectDB();

        const usersCollection = client.db().collection("User");
        const user = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        // const isValid = await verifyPassword(
        //   credentials.password,
        //   user.password
        // );

        const isValid = (user.password === credentials.password);

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in");
        }

        client.close();
        return { user: user };
      },
    }),
  ],
};

export default NextAuth(authNext);