"use client";

import NavLinks from "@/components/ui/nav-links";
import WerkLogo from "@/components/ui/werk-logo";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex items-end justify-start rounded-md bg-black p-4 md:h-24">
        <div className="w-32 text-white md:w-40">
          <WerkLogo />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button
            // prevent form submission
            type="button"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
