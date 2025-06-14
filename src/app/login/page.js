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
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Giriş Yap</button>
      {error && <div>{error}</div>}
    </form>
  );
}