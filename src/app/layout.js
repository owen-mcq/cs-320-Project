import "./globals.css";
import { Provider } from "@/app/provider";

export const metadata = {
  title: "Werk",
  description: "Workout generation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
