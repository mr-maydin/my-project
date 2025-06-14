import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === "admin" &&
          credentials.password === "123456"
        ) {
          return { id: 1, name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // Hatalı girişte tekrar login sayfasına yönlendir
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };