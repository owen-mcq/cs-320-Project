import "./globals.css";
import SideNav from "@/components/ui/side-nav";

export const metadata = {
  title: "Werk",
  description: "Workout generation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
         
            {children}
      </body>
    </html>
  );
}
