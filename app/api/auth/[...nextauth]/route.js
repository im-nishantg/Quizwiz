import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import connect from '../../../../utils/db';
import User from '../../../../models/User';
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "Credentials",


      async authorize(credentials, req) {

        await connect();

        try {

          const user = await User.findOne({ email: credentials.email });
          if (user) {

            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

            if (isPasswordCorrect)
              return user;
            else
              throw new Error("Wrong Credentials!")
          }

          else {
            throw new Error("User not found");
          }

        }
        catch (e) {
          throw new Error(e);
        }

      }
    }),
    CredentialsProvider({
      name: "adminCrendentials",
      id: "adminCrendentials",


      async authorize(credentials) {

        await connect();
        try {

          const user = await User.findOne({ email: credentials.email });

          if (user) {
            if (user.isAdmin) {
              const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

              if (isPasswordCorrect) {
                return user
              }
              else
                throw new Error("Wrong Password!");
            }
            else
              throw new Error("This user is not an admin!")

          }
          else
            throw new Error("User not found!");

        } catch (e) {
          throw new Error(e);
        }
      }
    })

  ]
});

export { handler as GET, handler as POST };