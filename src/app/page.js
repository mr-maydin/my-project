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
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	if (status === "loading") return <div>Yükleniyor...</div>;
	if (status === "unauthenticated") {
		router.push("/login");
		return null;
	}

	return (
		<div>
			<h1>Blog Sitesi</h1>
			<button
				onClick={() => signOut({ callbackUrl: "/login" })}
				style={{
					marginBottom: "24px",
					padding: "8px 16px",
					background: "#ef4444",
					color: "#fff",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Çıkış Yap
			</button>
			<div>
				{blogPosts.map((post) => (
					<div
						key={post.id}
						style={{
							marginBottom: "24px",
							borderBottom: "1px solid #ddd",
							paddingBottom: "16px",
						}}
					>
						<h2>{post.title}</h2>
						<p>{post.content}</p>
					</div>
				))}
			</div>
		</div>
	);
}
