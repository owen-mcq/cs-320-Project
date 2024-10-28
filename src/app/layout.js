import "./globals.css";

export const metadata = {
  title: "Werk",
  description: "Workout generation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="/"><h1 className="text-3xl font-bold text-center mb-8">Werk</h1></a>
        {children}
      </body>
    </html>
  );
}
