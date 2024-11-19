import { Inter } from "next/font/google";
import { TrophyIcon } from "@heroicons/react/24/outline";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["700"],
  display: "swap",
});

export default function WerkLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center space-x-2 leading-none text-white`}
    >
      <TrophyIcon className="h-10 w-10" />
      <p className="text-[44px]">Werk</p>
    </div>
  );
}
