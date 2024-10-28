import "./globals.css";

export const metadata = {
  title: "Werk",
  description: "Workout generation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
