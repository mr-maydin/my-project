"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      setError("Kullanıcı adı veya şifre hatalı!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-800 rounded-xl shadow-md p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-2">
          Giriş Yap
        </h2>
        <input
          className="bg-gray-900 text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-gray-900 text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold shadow transition"
        >
          Giriş Yap
        </button>
        {error && <div className="text-center text-red-400">{error}</div>}
      </form>
    </div>
  );
}