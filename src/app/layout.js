import "./globals.css";
import SessionWrapper from "./SessionWrapper";

export const metadata = {
  title: "Blog App",
  description: "NextAuth ile örnek",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
