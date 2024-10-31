import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Werk",
  description: "Workout generation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Link href="/"><h1 className="text-3xl font-bold text-center mb-8">Werk</h1></Link>
        {children}
      </body>
    </html>
  );
}
