"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";

export default function Register() {
  const [error, setError] = useState();
  const router = useRouter();
  const ref = useRef(null);

  const handleSubmit = async (formData) => {
    const r = await register({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        ref={ref}
        action={handleSubmit}
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
        border border-solid border-black bg-white rounded"
      >
        {error && <div className="">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>

        <label className="w-full text-sm">Username</label>
        <input
          type="input"
          placeholder="Username"
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
          name="username"
        />

        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
            name="password"
          />
        </div>

        <button
          className="w-full border border-solid border-black py-1.5 mt-2.5 rounded
        transition duration-150 ease hover:bg-black hover:text-white"
        >
          Sign up
        </button>

        <Link
          href="/login"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Login
        </Link>
      </form>
    </section>
  );
}
