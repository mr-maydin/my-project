"use client";
export const dynamic = "force-dynamic";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const blogPosts = [
	{
		id: 1,
		title: "İlk Blog Yazısı",
		content: "Bu, örnek bir blog yazısıdır.",
	},
	{
		id: 2,
		title: "İkinci Yazı",
		content: "İkinci yazının içeriği burada.",
	},
];

export default function Home() {
  return <div>Merhaba, ana sayfa!</div>;
}
