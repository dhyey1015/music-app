import { prismaClient } from "@/app/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//     providers : [

//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
//           })
//     ],
//     secret: process.env.NEXTAUTH_SECRET ?? "secret",
//     callbacks: {
//         async signIn(params){
//             if (!params.user.email){
//                 return false;
//             }
//             try{
//                 await prismaClient.user.create({
//                     data:{
//                         email: params.user.email,
//                         provider: "Google"
//                     }
//                 });
//             } catch (e) {
//                 return false; //TODO: can do better
//             }
            
//             return true;
//         }
//     }
// };

const handler = NextAuth({
    providers : [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
          })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn({ user }) {
            if (!user.email) {
            return false;
            }

            try {
            const existingUser = await prismaClient.user.findUnique({
                where: { email: user.email },
            });

            if (!existingUser) {
                await prismaClient.user.create({
                data: {
                    email: user.email,
                    provider: "Google",
                },
                });
            }

            return true;
            } catch (e) {
            console.error("Error during signIn callback:", e);
            return false; // Optional: you can redirect to an error page
            }
        }
    }
});

export { handler as GET , handler as POST }